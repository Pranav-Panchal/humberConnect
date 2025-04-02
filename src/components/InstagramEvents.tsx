"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import GoogleCalendarButton from "./GoogleCalendarButton";

interface Event {
  id: string;
  image: string | null;
  video: string | null;
  caption: string;
  isVideo: boolean;
  eventDate?: string | null;
  eventTime?: string | null;
  location?: string | null;
  postDate: string;
}

export default function InstagramEvents() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [expandedCaptions, setExpandedCaptions] = useState<Record<string, boolean>>({});
  const [selectedCampus, setSelectedCampus] = useState<string>("All");
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/instagram");
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 15); // Now showing last 15 days
        

        const processed = response.data
          .map((event: Event, idx: number) => ({
            ...event,
            id: event.id || `event-${idx}`,
            eventDate: extractEventDate(event.caption),
            eventTime: extractEventTime(event.caption),
            location: extractEventLocation(event.caption),
          }))
          .filter((event: Event) => {
            const postDate = new Date(event.postDate);
            return postDate >= sevenDaysAgo && (event.eventDate || event.eventTime || event.location);
          });

        setEvents(processed);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchSaved = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/saved-events?userId=${session.user.id}`);
      const data = await res.json();
      const ids = data.savedEvents.filter((e: any) => e.status === "going").map((e: any) => e.eventId);
      setSavedEventIds(ids);
    };

    fetchEvents();
    fetchSaved();
  }, [session]);

  const extractEventTime = (caption: string): string | null => {
    const match = caption.match(/\b\d{1,2}\s?(AM|PM)\b/i);
    return match ? match[0].toUpperCase() : null;
  };

  const extractEventDate = (caption: string): string | null => {
    const match = caption.match(
      /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?) \d{1,2}(st|nd|rd|th)?(,? \d{4})?)/
    );
    return match ? match[0] : null;
  };

  const extractEventLocation = (caption: string): string | null => {
    const locations = [];
    if (caption.toLowerCase().includes("north campus")) locations.push("North Campus");
    if (caption.toLowerCase().includes("lakeshore campus")) locations.push("Lakeshore Campus");
    if (caption.toLowerCase().includes("igs campus")) locations.push("IGS Campus");
    return locations.length > 0 ? locations.join(", ") : null;
  };

  const toggleRSVP = async (eventId: string) => {
    if (!session?.user?.id) {
      alert("You must be logged in to RSVP.");
      return;
    }

    const isGoing = savedEventIds.includes(eventId);
    const newStatus = isGoing ? "not going" : "going";

    try {
      const res = await fetch("/api/saved-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, eventId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update RSVP");
      setSavedEventIds((prev) => (isGoing ? prev.filter((id) => id !== eventId) : [...prev, eventId]));
    } catch (error) {
      console.error("RSVP Error:", error);
    }
  };

  const toggleCaption = (id: string) => {
    setExpandedCaptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (eventId: string) => {
    const link = `${window.location.origin}/event/${eventId}`;
    navigator.clipboard.writeText(link).then(() => alert("🔗 RSVP link copied!"));
  };

  const handleWhatsAppShare = (eventId: string) => {
    const link = `${window.location.origin}/event/${eventId}`;
    const text = `🎉 Join me for an awesome event! RSVP here: ${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const parseDateTime = (dateStr?: string, timeStr?: string): Date | null => {
    if (!dateStr || !timeStr) return null;
    const combined = `${dateStr} ${timeStr}`;
    const parsed = new Date(combined);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const filteredEvents = events.filter((event) => {
    if (selectedCampus === "All") return true;
    return event.location?.toLowerCase().includes(selectedCampus.toLowerCase());
  });

  return (
    <div className="container mt-4">
      <div className="mb-3 d-flex align-items-center gap-2">
        <label className="fw-semibold">Filter by Campus:</label>
        <select
          className="form-select form-select-sm w-auto"
          value={selectedCampus}
          onChange={(e) => setSelectedCampus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="North Campus">North Campus</option>
          <option value="Lakeshore Campus">Lakeshore Campus</option>
          <option value="IGS Campus">IGS Campus</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center pt-5 mt-5">⌛ Loading events...</div>
      ) : (
        <div className="row justify-content-center insta">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const isGoing = savedEventIds.includes(event.id);
              const isExpanded = expandedCaptions[event.id];
              const shortCaption = event.caption.slice(0, 140);
              const startDateTime = parseDateTime(event.eventDate || "", event.eventTime || "");

              return (
              <div key={event.id} className="col-md-4 col-sm-6 mb-4 d-flex">
                <div className="card event-card shadow-sm border-0 rounded-4 w-100 h-100 d-flex flex-column">
                  <div className="position-relative">
                    {event.isVideo && event.video ? (
                      <video
                        src={event.video}
                        controls
                        className="card-img-top rounded-top-4 event-media"
                      />
                    ) : (
                      <Image
                        src={event.image || "/default-placeholder.jpg"}
                        width={400}
                        height={400}
                        className="card-img-top rounded-top-4 event-media"
                        alt="Event"
                        priority
                      />
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <div className="flex-grow-1">
                      <p className="card-text fw-semibold">
                        {isExpanded ? event.caption : shortCaption}
                        {event.caption.length > 140 && (
                          <button
                            className="btn btn-link btn-sm text-primary ps-2"
                            onClick={() => toggleCaption(event.id)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}
                      </p>
                      <p className="mb-1 text-primary fw-bold">
                        📅 <strong>Date:</strong> {event.eventDate || "Date not specified"}
                      </p>
                      <p className="mb-1 text-primary fw-bold">
                        ⏰ <strong>Time:</strong> {event.eventTime || "Time not specified"}
                      </p>
                      <p className="mb-1 text-danger fw-bold">
                        📍 <strong>Location:</strong> {event.location || "Location not specified"}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mt-3 align-items-center">
                      <button
                        className={`btn btn-sm ${isGoing ? "btn-danger" : "btn-success"}`}
                        onClick={() => toggleRSVP(event.id)}
                      >
                        {isGoing ? "❌ Not Going" : "✅ Going"}
                      </button>
                      {isGoing && (
                        <div className="d-flex flex-column gap-2">
                          <GoogleCalendarButton
                            title="Instagram Event"
                            startDateTime={startDateTime || new Date()}
                            location={event.location || ""}
                            description={event.caption}
                          />
                          <div className="d-flex gap-2">
                            <button onClick={() => handleWhatsAppShare(event.id)} className="btn btn-outline-success btn-sm">
                              📤 WhatsApp
                            </button>
                            <button onClick={() => handleCopy(event.id)} className="btn btn-outline-secondary btn-sm">
                              📋 Copy Link
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              );
            })
          ) : (
            <p className="text-center">No events found.</p>
          )}
        </div>
      )}
    </div>
  );
}
