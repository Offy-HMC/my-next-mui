import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const LOGIN_PATH = `/login`;

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const session = await auth();

    // console.info(
    //   `middleware_request_received_${new Date().toISOString()}:`,
    //   `${request.method.toUpperCase()} - ${request.url}`
    // );
    // for public path it will return to the page
    // if (isPublicPathname(pathname)) {
    //   return NextResponse.next();
    // }

    if (pathname !== LOGIN_PATH && (!session || !isValidSession(session))) {
      const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
      // console.error(
      //   `middleware_response_sent_error_${new Date().toISOString()}:`,
      //   `${response.status}, body: ${response.body}`
      // );
      return response;
    }

    // console.info(`this session is ${session}`);

    // for check role permission
    // if (!isAuthorized(pathname, session)) {
    //   return NextResponse.redirect(new URL(getRedirectUrl(req), req.url));
    // }

    const response = NextResponse.next();
    // console.info(
    //   `middleware_response_sent_${new Date().toISOString()}:`,
    //   `${response.status}, body: ${response.body}`
    // );

    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }
}

export const config = {
  // matcher: [],
  matcher: ["/((?!api|_next/static|_next/image|asset|favicon.ico).*)"],
};

function isValidSession(session: { expires: string }) {
  if (new Date(session.expires) < new Date()) {
    return false;
  }
  return true;
}

// function isPublicPathname(pathname: string) {
//   return PUBLIC_PATHS.includes(pathname);
// }

// function isAuthorized(pathname: string, session: any) {
// Check if the user has the required role for the current page
// if (pathname === "/admin" && session.role !== "admin") {
//   return false;
// }

// if (pathname === "/moderator" && session.role !== "moderator") {
//   return false;
// }
// return true;
// }
