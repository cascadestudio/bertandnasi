"use client";

import { useState, useMemo, useEffect } from "react";
import CalendarEventRow from "@/components/calendar/CalendarEventRow";
import { CalendarEvent } from "@/sanity/lib/queries";
import { usePathname } from "next/navigation";
import { getLocale } from "@/lib/locale";

interface CalendarAccordionProps {
  events: CalendarEvent[];
}

export default function CalendarAccordion({ events }: CalendarAccordionProps) {
  const pathname = usePathname();
  const locale = getLocale(pathname);
  const localeCode = locale === "fr" ? "fr-FR" : "en-GB";

  // Extract all available years from events
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    events.forEach((event) => {
      event.dates.forEach((date) => {
        years.add(new Date(date).getFullYear());
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [events]);

  // Default to the earliest year with events
  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears[0] || new Date().getFullYear()
  );

  // Filter events by selected year
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.dates.some((date) => new Date(date).getFullYear() === selectedYear)
    );
  }, [events, selectedYear]);

  // Group events by month
  const eventsByMonth = filteredEvents.reduce(
    (acc, event) => {
      const firstDate = new Date(event.dates[0]);
      const monthKey = `${firstDate.getFullYear()}-${String(firstDate.getMonth()).padStart(2, "0")}`;
      const monthName = firstDate.toLocaleDateString(localeCode, {
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

  const [openMonths, setOpenMonths] = useState<Set<string>>(new Set());

  // Get the first month key for dependency tracking
  const firstMonthKey = sortedMonths.length > 0 ? sortedMonths[0][0] : null;

  // Reset open month when year changes (open first month of selected year)
  useEffect(() => {
    if (firstMonthKey) {
      setOpenMonths(new Set([firstMonthKey]));
    } else {
      setOpenMonths(new Set());
    }
  }, [firstMonthKey]);

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
      {/* Year Selector Bar - matching navigation grid system */}
      <div
        className="bg-white"
        style={{ borderBottom: "4px solid var(--color-green)" }}
      >
        <div className="grid grid-cols-3 md:grid-cols-7">
          {availableYears.map((year, index) => {
            const isLastInRowMobile = (index + 1) % 3 === 0;
            const isLastInRowDesktop = (index + 1) % 7 === 0;

            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`year-selector-btn flex items-center justify-center font-medium text-2xl md:text-4xl transition-colors px-4 md:px-8 py-4 ${
                  isLastInRowMobile ? "year-selector-no-border-r" : ""
                } ${
                  isLastInRowDesktop ? "md:year-selector-no-border-r" : ""
                } ${
                  selectedYear === year
                    ? "year-selector-active"
                    : "text-black hover:text-[var(--color-green)]"
                }`}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>

      {/* Month Accordions */}
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
