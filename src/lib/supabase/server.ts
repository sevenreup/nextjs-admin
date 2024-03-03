import { Database } from "@/lib/database.types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export const createAuthenticatedClient = async () => {
  const supabase = createClient(cookies());

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const redirectUrl = headers().get("x-redirect-url");

    if (redirectUrl != null) {
      const url = encodeURIComponent(redirectUrl);
      redirect("/login?redirect=" + url);
    }
    redirect("/login");
  }

  return supabase;
};

export const createUnauthenticatedClient = () => {
  return createClient(cookies());
}
