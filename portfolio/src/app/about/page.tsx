export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 sm:px-12 md:px-20 lg:px-32">
      <header className="mb-12 border-b border-gray-700 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold">My Story</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          A bit about my background, growth, and what drives me.
        </p>
      </header>

      <section className="space-y-6 text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
        <blockquote className="italic text-gray-400 border-l-4 border-gray-600 pl-4">
          “Perseverance is not a long race; it is many short races one after the other.” — Walter Elliot
        </blockquote>

        <p>
          All stories have ups and downs, and mine is no exception.
        </p>

        <p>
          My journey as a software developer began in the third grade, when Khan Academy introduced a computer science course on their platform. It was a simple JavaScript course focused on creating graphics, animations, and basic physics simulations, and I was hooked. I spent all my free time experimenting on Khan Academy, proud to show my parents and teachers the simple games and animations I created.
        </p>

        <p>
          Over time, life became filled with other pursuits. By high school, I was competing in water polo and speed swimming at an international level, playing tournaments across California and Europe. These experiences built discipline and resilience, qualities that continue to shape me today. Yet, ever since that first animation of a car driving down a road, software development has always been on my mind.
        </p>

        <p>
          Unfortunately, attending high school in Saskatchewan meant I had limited access to computer science education. I took a single online course that mostly covered basic web development using HTML, CSS, and PHP, but it left me wanting more. When it came time to choose a field of study for university, I had no doubt: I wanted to pursue Software Engineering. I chose the University of Victoria for its accredited program, as well as for the chance to spread my wings beyond the prairies.
        </p>

        <p>
          Arriving at UVic, I expected things to go smoothly. That illusion quickly faded. High school had not prepared me for taking six engineering courses per semester. While I had the discipline from swimming, I lacked the study skills to apply it effectively to academics. During my first year, I lost 15 pounds of muscle, gained 30 back as fat, and ended up having to retake four courses. That summer, while retaking Calculus I and II, I committed to a serious shift in mindset. I decided that this would be the lowest point in my academic life, and the only way forward was up.
        </p>

        <p>
          And up I went. It wasn’t a meteoric rise, but each day I aimed to do at least one thing to improve, to make the day better than the last. Setbacks still came, but I kept moving forward more often than I fell back. My grades have steadily improved, I've built out personal projects, and I’ve made significant strides in both physical and mental health by adopting a proactive mindset.
        </p>

        <p className="font-semibold text-white">
          Today, I look back not just on the challenges I’ve faced, but on the progress I’ve made. I’m proud of the persistence that has brought me this far, not just in academics, but in becoming someone who doesn’t shy away from difficulty. As I continue this journey in software development, I bring with me the same principle that’s carried me through everything so far: show up, push forward, and don’t stop moving.
        </p>
      </section>
    </main>
  );
}
