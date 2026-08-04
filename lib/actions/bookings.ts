'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../auth';
import { createBooking, getBookingById, getRoomById, hasConfirmedOverlap, setBookingStatus } from '../db';

export type BookingFormState = {
  error?: string;
  success?: boolean;
};

// Public — a guest submitting the booking request form. Re-validates
// everything server-side; the calendar's disabled dates are a UX nicety,
// not the source of truth.
export async function submitBooking(
  _prevState: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const roomId = Number(formData.get('room_id'));
  const guestName = String(formData.get('guest_name') ?? '').trim();
  const guestEmail = String(formData.get('guest_email') ?? '').trim();
  const guestPhone = String(formData.get('guest_phone') ?? '').trim();
  const checkIn = String(formData.get('check_in') ?? '');
  const checkOut = String(formData.get('check_out') ?? '');
  const guestsCount = Number(formData.get('guests_count') ?? 1);
  const message = String(formData.get('message') ?? '').trim();

  if (!roomId || !getRoomById(roomId)) {
    return { error: 'Please choose a room.' };
  }
  if (!guestName || !guestEmail || !guestPhone) {
    return { error: 'Please fill in your name, email and phone number.' };
  }
  if (!checkIn || !checkOut || checkIn >= checkOut) {
    return { error: 'Please choose a valid check-in and check-out date.' };
  }
  if (!Number.isFinite(guestsCount) || guestsCount < 1) {
    return { error: 'Please enter the number of guests.' };
  }
  if (hasConfirmedOverlap(roomId, checkIn, checkOut)) {
    return { error: 'Those dates are already booked for this room. Please choose different dates.' };
  }

  createBooking({
    room_id: roomId,
    guest_name: guestName,
    guest_email: guestEmail,
    guest_phone: guestPhone,
    check_in: checkIn,
    check_out: checkOut,
    guests_count: guestsCount,
    message,
  });

  revalidatePath('/admin/bookings');
  return { success: true };
}

// Admin only — verified independently of the UI that calls it.
export async function confirmBooking(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const booking = getBookingById(id);
  if (!booking) throw new Error('Booking not found.');

  // Two pending requests can overlap (nothing blocks that at request time),
  // so re-check capacity here too — otherwise confirming both would
  // double-book a room past how many physical units it has.
  if (hasConfirmedOverlap(booking.room_id, booking.check_in, booking.check_out)) {
    throw new Error(
      'This room is already fully booked for those dates — decline this request or free up a date first.'
    );
  }

  setBookingStatus(id, 'confirmed');
  revalidatePath('/admin/bookings');
  revalidatePath('/rooms');
}

export async function declineBooking(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(formData.get('id'));
  setBookingStatus(id, 'declined');
  revalidatePath('/admin/bookings');
}
