import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin-only routes
    if (
      path.startsWith("/admin") ||
      path.startsWith("/panel/admin") ||
      path.startsWith("/(admin)")
    ) {
      if (token?.role !== Role.ADMIN) {
        return NextResponse.redirect(new URL("/panel", req.url));
      }
    }

    // Staff or Admin routes
    if (
      path.startsWith("/panel/randevular") ||
      path.startsWith("/panel/odemeler") ||
      path.startsWith("/panel/raporlar") ||
      path.startsWith("/randevular")
    ) {
      if (token?.role !== Role.STAFF && token?.role !== Role.ADMIN) {
        return NextResponse.redirect(new URL("/panel", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Public routes - no auth required
        if (
          path.startsWith("/auth") ||
          path.startsWith("/api/auth") ||
          path.startsWith("/api/appointments") ||
          path === "/" ||
          path.startsWith("/randevu") ||
          path.startsWith("/takip") ||
          path.startsWith("/galeri") ||
          path.startsWith("/degerlendirme")
        ) {
          return true;
        }

        // Protected routes - require auth
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/giris",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
