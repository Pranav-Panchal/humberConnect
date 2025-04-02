'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from './Navbar';
import Footer from './Footer';

interface SavedEvent {
  userId: string;
  eventId: string;
  status: 'going' | 'not going';
  eventDate?: string | null;
}

export default function SavedEventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<SavedEvent[]>([]);

  useEffect(() => {
    const fetchSaved = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/saved-events?userId=${session.user.id}`);
      const data = await res.json();
      const goingEvents = data.savedEvents?.filter(
        (event: SavedEvent) => event.status === 'going'
      );
      setEvents(goingEvents || []);
    };
    fetchSaved();
  }, [session]);

  const isSoon = (dateString?: string | null): boolean => {
    if (!dateString) return false;
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-5 mb-5 saved">
        <h2 className="text-3xl font-bold text-center mb-6 text-dark">
          🎉 Saved Events
        </h2>

        {events.length === 0 ? (
          <div className="text-center text-secondary mt-20">
            <p className="text-xl mb-3">No events marked as going.</p>
            <div className="text-6xl">🗓️</div>
          </div>
        ) : (
          <ul className="space-y-4 saved-list">
            {events.map((e) => (
              <li
                key={e.eventId}
                className="border p-4 rounded-lg shadow bg-white hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-dark">Event ID: {e.eventId}</p>
                    <p className="text-muted">
                      Status: <strong>{e.status}</strong>
                    </p>
                  </div>
                  {isSoon(e.eventDate) && (
                    <span className="ml-4 px-2 py-1 text-sm bg-warning text-dark rounded">
                      🔥 Happening Soon!
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <div className='saved-footer'>
      <Footer/>
      </div>  
      
    </div>
  );
}
