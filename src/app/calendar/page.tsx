import { fetchAllCalendarEvents } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import CalendarAccordion from "./CalendarAccordion";

export default async function CalendarPage() {
  const events = await fetchAllCalendarEvents();

  return (
    <div>
      <Marquee pageName="calendar" />
      <div className="px-4 md:px-8 py-16">
        <main>
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Calendar</h1>
          {events.length === 0 ? (
            <p>No events scheduled.</p>
          ) : (
            <CalendarAccordion events={events} />
          )}
        </main>
      </div>
    </div>
  );
}
