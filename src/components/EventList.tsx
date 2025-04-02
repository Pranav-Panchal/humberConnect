"use client";

import InstagramEvents from "./InstagramEvents";


export default function EventList() {

  return (
    <div className="mt-5 insta">
      <h1 className="fw-bold text-primary mb-4 text-center">📅 Upcoming Events</h1>
      <p className="text-muted text-center">Stay updated with the latest events at Humber College!</p>
      <InstagramEvents/>
    </div>
  );
}
