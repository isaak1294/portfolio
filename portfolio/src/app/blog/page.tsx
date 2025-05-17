// app/blog/page.tsx
export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 sm:px-12 md:px-20 lg:px-32">
      <header className="mb-12 border-b border-gray-700 pb-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Blog</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Thoughts, tutorials, and tech breakdowns.
        </p>
      </header>

      <section>
        <p className="text-gray-300 text-lg">
          No entries yet.
        </p>
      </section>
    </main>
  );
}
