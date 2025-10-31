import { Locale } from "./locale";

export function formatDateRange(dates: string[], locale: Locale = 'en'): { month: string; days: string } {
  if (!dates || dates.length === 0) {
    return { month: '', days: '' }
  }

  const firstDate = new Date(dates[0])
  const localeCode = locale === 'fr' ? 'fr-FR' : 'en-US'
  const month = firstDate.toLocaleString(localeCode, { month: 'short' }).toUpperCase()

  if (dates.length === 1) {
    const day = firstDate.getDate()
    return { month, days: day.toString() }
  }

  // Multiple dates - find range
  const sortedDates = dates.map(d => new Date(d)).sort((a, b) => a.getTime() - b.getTime())
  const firstDay = sortedDates[0].getDate()
  const lastDay = sortedDates[sortedDates.length - 1].getDate()

  return { 
    month, 
    days: firstDay === lastDay ? firstDay.toString() : `${firstDay}-${lastDay}` 
  }
}

export function formatEventDates(dates: string[], locale: Locale = 'en'): string {
  const localeCode = locale === 'fr' ? 'fr-FR' : 'en-GB'
  return dates.map(date => 
    new Date(date).toLocaleDateString(localeCode, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  ).join(', ')
}

