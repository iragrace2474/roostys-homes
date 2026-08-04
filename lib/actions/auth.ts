'use server';

import { redirect } from 'next/navigation';
import { checkPassword, createAdminSession, clearAdminSession } from '../auth';

export type LoginResult = { error?: string };

export async function login(_prevState: LoginResult, formData: FormData): Promise<LoginResult> {
  const password = String(formData.get('password') ?? '');

  if (!process.env.ADMIN_PASSWORD) {
    return { error: 'ADMIN_PASSWORD is not configured on the server.' };
  }
  if (!checkPassword(password)) {
    return { error: 'Incorrect password.' };
  }

  await createAdminSession();
  redirect('/admin');
}

export async function logout(): Promise<void> {
  await clearAdminSession();
  redirect('/admin/login');
}
