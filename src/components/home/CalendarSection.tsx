import { fetchUpcomingEvents } from "@/sanity/lib/queries";
import CalendarEventRow from "@/components/calendar/CalendarEventRow";

export default async function CalendarSection() {
  const events = await fetchUpcomingEvents();

  if (events.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="space-y-[-4px]">
        {events.map((event) => (
          <CalendarEventRow key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
}
