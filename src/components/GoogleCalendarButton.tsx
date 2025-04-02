"use client";
import { format } from "date-fns";

interface Props {
  title: string;
  startDateTime: Date;
  location?: string;
  description?: string;
}

const GoogleCalendarButton = ({ title, startDateTime, location, description }: Props) => {
  const start = format(startDateTime, "yyyyMMdd'T'HHmmss");
  const end = format(new Date(startDateTime.getTime() + 60 * 60 * 1000), "yyyyMMdd'T'HHmmss"); // +1hr

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${start}/${end}&details=${encodeURIComponent(
    description || ""
  )}&location=${encodeURIComponent(location || "")}`;

  return (
    <a
      href={calendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline-primary btn-sm"
    >
      📅 Add to Google Calendar
    </a>
  );
};

export default GoogleCalendarButton;
