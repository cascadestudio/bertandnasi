export function formatDateRange(dates: string[]): { month: string; days: string } {
  if (!dates || dates.length === 0) {
    return { month: '', days: '' }
  }

  const firstDate = new Date(dates[0])
  const month = firstDate.toLocaleString('en-US', { month: 'short' }).toUpperCase()

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

export function formatEventDates(dates: string[]): string {
  return dates.map(date => 
    new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  ).join(', ')
}

