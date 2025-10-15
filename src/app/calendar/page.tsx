import { fetchAllCalendarEvents } from "@/sanity/lib/queries";
import Marquee from "@/components/home/Marquee";
import CalendarAccordion from "./CalendarAccordion";

export default async function CalendarPage() {
  const events = await fetchAllCalendarEvents();

  return (
    <div>
      <Marquee pageName="calendar" />
      <main>
        {events.length === 0 ? (
          <p>No events scheduled.</p>
        ) : (
          <CalendarAccordion events={events} />
        )}
      </main>
    </div>
  );
}
