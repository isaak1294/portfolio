import TimelineEntry from '@/components/TimelineEntry';
import Navbar from '@/components/Navbar';

export default function ExperiencePage() {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen bg-black text-white px-6 py-12 sm:px-12 md:px-20 lg:px-32">
        <header className="mb-12 border-b border-gray-700 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Experience</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            A timeline of my education, work, and milestones.
          </p>
        </header>

        <section className="relative max-w-3xl mx-auto">
          <TimelineEntry
            title="AI Quality Assurance Engineer"
            subtitle="DataAnnotation"
            date="April 2025 – Present"
            description="Writing and improving a wide variety of AI written code to improve performance. Writing detailed criteria to ensure specific, atomic improvements."
          />
          <TimelineEntry
            title="Undergraduate Researcher"
            subtitle="University of Victoria"
            date="Jan 2025 – Apr 2025"
            description="Built a Python tool to analyze volatility and train LSTM models for cryptocurrency prediction. Focused on deep learning model tuning and time-series forecasting."
          />
          <TimelineEntry
            title="Student"
            subtitle="University of Victoria – B.Eng in Software Engineering"
            date="2022 – Present"
            description="Studying software architecture, machine learning, and embedded systems. Completed academic projects in control systems, databases, and operating systems."
          />
          <TimelineEntry
            title="Athlete"
            subtitle="Team Saskatchewan & Club Teams"
            date="2015 – 2021"
            description="Competed internationally in water polo and speed swimming. Developed discipline, teamwork, and resilience through sport."
          />
        </section>
      </main>
    </>
  );
}
