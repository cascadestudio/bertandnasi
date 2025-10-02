import Link from 'next/link'
import { fetchAllProjects } from '../sanity/lib/queries'

export default async function Home() {
  const projects = await fetchAllProjects()

  return (
    <div>
      <header>
        <h1>Next.js + Sanity Boilerplate</h1>
        <nav>
          <Link href="/studio">Got to Sanity Studio</Link>
        </nav>
      </header>

      <main>
        <h2>Projects in Sanity : </h2>
        {projects.length === 0 ? (
          <p>No projects found. <Link href="/studio">Create your first project</Link></p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project._id}>
                <h3>{project.name}</h3>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
