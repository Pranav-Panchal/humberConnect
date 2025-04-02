"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true);
      setUserName(session?.user?.name || null);
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  }, [status, session]);

  const handleLogout = async () => {
    localStorage.removeItem("savedEvents");
    await signOut({ callbackUrl: "/auth/login" });
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar navbar-expand-md fixed-top py-3 shadow bg-white">
      <div className="container">
        <Link href="/">
          <img src="/img/HClogo.svg" alt="Brand Logo" className="brand-logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navcol-1"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                href="/"
                className="nav-link fw-bold"
                style={{ color: isActive("/") ? "#0f1039" : undefined }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/events"
                className="nav-link fw-bold"
                style={{ color: isActive("/events") ? "#0f1039" : undefined }}
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/saved-events"
                className="nav-link fw-bold"
                style={{ color: isActive("/saved-events") ? "#0f1039" : undefined }}
              >
                Saved Events
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            {isLoggedIn ? (
              <div className="d-flex align-items-center">
                <span className="me-2">Hello, {userName}</span>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link className="btn btn-primary me-2" href="/auth/signup">
                  Sign up
                </Link>
                <Link className="btn btn-primary" href="/auth/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
