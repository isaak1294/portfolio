import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  preview: string;
  date?: string;
}

export default function WritingPage() {
  const postsDirectory = path.join(process.cwd(), 'src/content/writings');
  const filenames = fs.existsSync(postsDirectory) ? fs.readdirSync(postsDirectory) : [];

  const posts: Post[] = filenames
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = filename.replace(/\.mdx$/, '');
      const preview = content.split('\n').find((line) => line.trim()) ?? '';

      return {
        slug,
        title: data.title || slug,
        preview,
        date: data.date || '',
      };
    });

    console.log('Found MDX posts:', filenames);
    console.log('Resolved posts directory:', postsDirectory);


  return (
    <>

      <main className="min-h-screen bg-black text-white px-6 py-12 sm:px-12 md:px-20 lg:px-32">
        <header className="mb-12 border-b border-gray-700 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Writings</h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Sometimes I write things. Just for fun.
          </p>
        </header>

        <section className="space-y-12">
          {posts.length === 0 ? (
            <p className="text-gray-300 text-lg">No entries yet.</p>
          ) : (
            posts.map(({ title, preview, slug, date }) => (
              <article key={slug} className="space-y-2">
                <h2 className="text-2xl font-semibold hover:text-gray-300 transition-colors duration-200">
                  <Link href={`/writing/${slug}`}>{title}</Link>
                </h2>
                {date && (
                  <p className="text-gray-500 text-sm">
                    {new Date(date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                )}
                <p className="text-gray-400 leading-relaxed">{preview}</p>
                <Link
                  href={`/writing/${slug}`}
                  className="text-sm text-gray-500 hover:text-gray-300 underline transition-colors duration-200"
                >
                  Read more →
                </Link>
              </article>
            ))
          )}
        </section>
      </main>
    </>
  );
}
