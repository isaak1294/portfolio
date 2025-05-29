import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import Navbar from '@/components/Navbar';

// --- DO NOT TYPE `params` at all
export default async function Page({ params }: any) {
  const filePath = path.join(process.cwd(), 'src/content/posts', `${params.slug}.mdx`);
  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, 'utf8');

  const { content: MDXContent, frontmatter } = await compileMDX<{
    title: string;
    date?: string;
  }>({
    source: raw,
    options: { parseFrontmatter: true },
    components: useMDXComponents({}),
  });

  return (
    <>
      <Navbar />
      <main className="bg-black text-white min-h-screen px-6 py-12 sm:px-12 md:px-20 lg:px-32">
        <article className="prose prose-invert max-w-3xl mx-auto">
          <h1>{frontmatter.title}</h1>
          {MDXContent}
        </article>
      </main>
    </>
  );
}

// --- DO NOT return a Promise unless this function is async
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'src/content/posts');
  const files = fs.readdirSync(postsDir);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ''),
    }));
}
