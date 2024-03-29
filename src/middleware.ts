import { createClient } from "@/lib/supabase/middleware";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const { supabase, response } = createClient(request);

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const session = await supabase.auth.getSession();
    const url = request.nextUrl;
    if (url.pathname.startsWith("/admin") && session.data.session == null) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    response.headers.set("x-redirect-url", request.url);
    return response;
  } catch (e) {
    console.log(e);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-redirect-url", request.url);
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}
