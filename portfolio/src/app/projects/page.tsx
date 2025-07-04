import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';

export default function ProjectsPage() {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen bg-black text-white px-6 py-12 sm:px-12 md:px-20 lg:px-32">
        <header className="mb-12 border-b border-gray-700 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Projects</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            A portfolio of my favorite builds and experiments.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <ProjectCard
            title="30in30"
            description="Website to track the 30 apps that I am making in 30 days."
            tags={['Next.js', 'TypeScript', 'Tailwind']}
            link="https://30in30.vercel.app/"
          />

          <ProjectCard
            title="ComfortZone"
            description="A self-improvement app built with Next.js that gives you a daily social challenge to push you out of your comfort zone."
            tags={['Next.js', 'TypeScript', 'Tailwind']}
            link="https://comfortzone-sigma.vercel.app/"
          />

          <ProjectCard
            title="EasyApp"
            description="Command line app that takes a resume and cover letter as an input and returns tailored resumes and cover letters for every job on the UVic job board."
            tags={['Python', 'Javascript', 'RAG']}
            link="https://github.com/isaak1294/EasyApp"
          />

          <ProjectCard
            title="Interactive Workout Planner"
            description="A simple sing-page app that lets you select the muscles you want to workout and receive exercises to do for them."
            tags={['React', 'Typescript', 'UI/UX']}
            link="https://workout-planner-rho.vercel.app/"
          />
        </section>
      </main>
    </>
  );
}
