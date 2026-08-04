import { redirect } from 'next/navigation';
import Image from 'next/image';
import { isAdminAuthenticated } from '@/lib/auth';
import LoginForm from './login-form';

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-900 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-paper p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/roosty-photos/web-logo-main.jpg.png"
            alt="Roosty's Homes"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
          <h1 className="mt-4 font-display text-xl font-semibold text-forest-900">Admin Sign In</h1>
          <p className="mt-1 text-sm text-ink-soft">Roosty&apos;s Homes management</p>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
