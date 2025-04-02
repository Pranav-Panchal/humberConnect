"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HomePage from "../components/HomePage";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session loading

    if (status === "unauthenticated") {
      router.push("/auth/login"); // Redirect to login if unauthenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading message while session is being checked
  }

  return <HomePage />; // Display homepage if authenticated
}
