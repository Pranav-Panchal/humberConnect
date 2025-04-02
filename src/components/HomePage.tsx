"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer
import FeaturesSection from "../components/FeaturesSection";
import CallToActionSection from "../components/CallToAction";
import InstagramEvents from "../components/InstagramEvents";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Only perform redirection logic after session is fully loaded
  useEffect(() => {
    if (status === "loading") {
      return; // Wait for the session to load
    }

    if (status === "unauthenticated") {
      router.push("/auth/login"); // Redirect to login if unauthenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading state while session is being checked
  }

  return (
    <div>
      <Navbar /> {/* Use Navbar component */}
      {/* Hero Section */}
      <header className="pt-5 mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Your Campus, Your Events –All in{" "}
                <span className="text-warning">one</span> place
              </h1>
              <p className="fs-5 text-muted">One App, Everything You Need!</p>
              <form className="d-flex">
                <input
                  className="form-control me-2 shadow-lg"
                  type="search"
                  placeholder="Search"
                />
                <button className="btn btn-primary shadow-lg white">🔍</button>
              </form>
            </div>
            <div className="col-md-6 text-center">
              <Image
                src="/img/illustrations/meeting.svg"
                alt="Meeting"
                width={500}
                height={350}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="display-4 fw-bold">
            Tools for teams that work <span className="text-primary text-warning ">together.</span>
          </h2>
          <div className="row mt-4">
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <FeaturesSection /> {/* Insert FeaturesSection here */}
      <CallToActionSection /> {/* Insert CallToActionSection here */}

      <Footer /> {/* Use Footer component */}
    </div>
  );
}
