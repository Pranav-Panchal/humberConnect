'use client';
import "bootstrap/dist/css/bootstrap.min.css";
import './globals.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation"; // ✅ Correct way to get pathname in App Router

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Correct way to check current route
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // ✅ Check if user is authenticated (JWT token exists)
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // ✅ Prevent infinite redirect loops by checking pathname
      if (pathname !== "/auth/login" && pathname !== "/auth/signup") {
        router.replace("/auth/login");
      }
    }
  }, [pathname]); // ✅ Dependencies ensure the effect re-runs on route change

  return (
    <SessionProvider>
      <html lang="en">
        <body>
          {isAuthenticated === null ? (
            <p>Loading...</p>
          ) : (
            children
          )}
        </body>
      </html>
    </SessionProvider>
  );
}
