"use client";

import { useState } from "react";
import CalendarEventRow from "@/components/calendar/CalendarEventRow";
import { CalendarEvent } from "@/sanity/lib/queries";

interface CalendarAccordionProps {
  events: CalendarEvent[];
}

export default function CalendarAccordion({ events }: CalendarAccordionProps) {
  // Group events by month
  const eventsByMonth = events.reduce(
    (acc, event) => {
      const firstDate = new Date(event.dates[0]);
      const monthKey = `${firstDate.getFullYear()}-${String(firstDate.getMonth()).padStart(2, "0")}`;
      const monthName = firstDate.toLocaleDateString("en-GB", {
        month: "long",
      });

      if (!acc[monthKey]) {
        acc[monthKey] = {
          monthName,
          events: [],
        };
      }
      acc[monthKey].events.push(event);
      return acc;
    },
    {} as Record<string, { monthName: string; events: CalendarEvent[] }>
  );

  // Sort months by date (most recent first)
  const sortedMonths = Object.entries(eventsByMonth).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  const [openMonths, setOpenMonths] = useState<Set<string>>(
    new Set(sortedMonths.length > 0 ? [sortedMonths[0][0]] : [])
  );

  const toggleMonth = (monthKey: string) => {
    if (openMonths.has(monthKey)) {
      // If clicking on an open month, close it
      setOpenMonths(new Set());
    } else {
      // If clicking on a closed month, close all others and open this one
      setOpenMonths(new Set([monthKey]));
    }
  };

  return (
    <div className="w-full">
      {sortedMonths.map(([monthKey, { monthName, events }]) => (
        <div
          key={monthKey}
          className={
            !openMonths.has(monthKey)
              ? "border-b-4 border-[var(--color-green)]"
              : ""
          }
        >
          {/* Month Header */}
          <button
            onClick={() => toggleMonth(monthKey)}
            className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors group"
          >
            <h2
              className={`month-header ${openMonths.has(monthKey) ? "month-header-open" : ""}`}
            >
              {monthName}
            </h2>
            <span
              className={`text-[var(--color-green)] font-normal text-5xl lg:text-[84px] ${openMonths.has(monthKey) ? "lg:text-[var(--color-green)]" : ""}`}
            >
              {openMonths.has(monthKey) ? "−" : "+"}
            </span>
          </button>

          {/* Month Content */}
          {openMonths.has(monthKey) && (
            <div className="space-y-[-4px]">
              {events.map((event) => (
                <CalendarEventRow key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
