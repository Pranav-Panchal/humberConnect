import EventList from "@/components/EventList";
import Footer from "@/components/Footer";
import InstagramEvents from "@/components/InstagramEvents";
import Navbar from "@/components/Navbar";

export default function EventsPage() {
  return (
    <>
      {/* ✅ Header */}
      <Navbar />


        {/* ✅ Instagram Events Section */}
        <EventList />
      

      {/* ✅ Footer */}
      <Footer />
    </>
  );
}
