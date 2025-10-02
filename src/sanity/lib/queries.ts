import { groq } from 'next-sanity'
import { client } from '../../../sanity'

// Project type definition
export interface Project {
  _id: string
  _createdAt: string
  _updatedAt: string
  name: string
  description?: string
}

// Query to get all projects
export const getAllProjects = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    description
  }
`

// Query to get a single project by ID
export const getProjectById = groq`
  *[_type == "project" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    name,
    description
  }
`

// Data fetching functions
export async function fetchAllProjects(): Promise<Project[]> {
  return await client.fetch(getAllProjects)
}

export async function fetchProjectById(id: string): Promise<Project> {
  return await client.fetch(getProjectById, { id })
}
