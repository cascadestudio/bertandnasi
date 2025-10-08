import { defineType } from 'sanity'

export const calendar = defineType({
  name: 'calendar',
  title: 'Calendar Event',
  type: 'document',
  icon: () => '📅',
  fields: [
    // Event Details
    {
      name: 'show',
      title: 'Show',
      type: 'reference',
      to: [{ type: 'show' }],
      validation: (Rule) => Rule.required(),
      description: 'Select the show from your shows list. The main image will be taken from the show.',
    },
    {
      name: 'dates',
      title: 'Performance Dates',
      type: 'array',
      of: [
        {
          type: 'date',
          options: {
            dateFormat: 'DD-MM-YYYY',
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Click "Add item" and use the calendar picker to select performance dates. You can add multiple dates for the same show.',
    },
    {
      name: 'venue',
      title: 'Venue/Theater Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The name of the theater or venue where the show will be performed.',
    },
    {
      name: 'location',
      title: 'City, Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The location where the show will be performed (e.g., "Paris, France" or "New York, USA").',
      placeholder: 'Paris, France',
    },
    {
      name: 'ticketUrl',
      title: 'Ticket Page URL',
      type: 'url',
      description: 'Link to where people can buy tickets.',
    },
    {
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      description: 'Upload additional images specific to this calendar event. The show\'s main image will be used automatically, these are extra images.',
    },
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'show.title',
      venue: 'venue',
      media: 'show.mainImage',
      dates: 'dates',
    },
    prepare(selection) {
      const { title, venue, media, dates } = selection
      
      // Format the first date
      let dateText = 'No date'
      if (dates && dates.length > 0) {
        const sortedDates = [...dates].sort()
        dateText = new Date(sortedDates[0]).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })
      }
      
      return {
        title: title || 'No show selected',
        subtitle: `${venue || 'No venue'} • ${dateText}`,
        media,
      }
    },
  },

  // Ordering
  orderings: [
    {
      title: 'Date, Soonest First',
      name: 'dateAsc',
      by: [{ field: 'dates[0]', direction: 'asc' }],
    },
    {
      title: 'Date, Latest First',
      name: 'dateDesc',
      by: [{ field: 'dates[0]', direction: 'desc' }],
    },
  ],
})
