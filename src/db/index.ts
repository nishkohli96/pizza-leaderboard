/**
 * Code Reference -
 * https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?queryGroups=language&language=ts
 */

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { ENV_VARS } from '@/constants';

export async function createClient() {
  const cookieStore = await cookies()

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    ENV_VARS.supabase.url,
    ENV_VARS.supabase.anonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: any; value: any; options: any }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}