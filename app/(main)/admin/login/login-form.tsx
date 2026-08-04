'use client';

import { useActionState } from 'react';
import { login, type LoginResult } from '@/lib/actions/auth';

const initialState: LoginResult = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-forest-900">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5"
        />
      </div>
      {state.error && <p className="text-sm font-medium text-red-700">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-forest-800 px-6 py-3 font-semibold text-yellow-100 transition hover:bg-forest-700 disabled:opacity-50"
      >
        {pending ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  );
}
