import { defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: PlayIcon,
  fields: [
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The title of the video.',
    },
    {
      name: 'url',
      title: 'YouTube Video URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
      description: 'Paste the YouTube video URL here. The thumbnail will be automatically generated from YouTube.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Online Content', value: 'online-content' },
          { title: 'Trailers', value: 'trailers' },
          { title: 'Short Films', value: 'short-films' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Select the category for this video.',
    },
  ],

  // Preview configuration
  preview: {
    select: {
      title: 'title',
      category: 'category',
      url: 'url',
    },
    prepare(selection) {
      const { title, category } = selection
      
      // Format category for display
      const categoryLabels: Record<string, string> = {
        'online-content': 'Online Content',
        'trailers': 'Trailers',
        'short-films': 'Short Films',
      }
      
      return {
        title: title || 'Untitled Video',
        subtitle: categoryLabels[category] || category,
      }
    },
  },

  // Ordering
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
