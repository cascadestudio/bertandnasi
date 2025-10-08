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
      description: 'Select the show from your shows list. This will automatically pull the show title and main image.',
    },
    {
      name: 'dates',
      title: 'Performance Dates',
      type: 'array',
      of: [
        {
          type: 'datetime',
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: 'Add all the dates and times for this event. You can add multiple dates for the same show.',
    },
    {
      name: 'venue',
      title: 'Venue/Theater Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The name of the theater or venue where the show will be performed.',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The city where the venue is located.',
    },
    {
      name: 'ticketUrl',
      title: 'Ticket Page URL',
      type: 'url',
      description: 'Link to where people can buy tickets.',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      description: 'The main image for this calendar event. You can use the show\'s main image or upload a different one.',
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
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Additional images from the show\'s gallery or event-specific photos.',
    },
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'show.title',
      subtitle: 'venue',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'No show selected',
        subtitle: subtitle ? `at ${subtitle}` : 'No venue set',
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
