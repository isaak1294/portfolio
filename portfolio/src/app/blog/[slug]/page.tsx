import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import Navbar from '@/components/Navbar';

interface PageProps {
  params: { slug: string };
}

interface Frontmatter {
  title: string;
  date?: string;
}


export default async function BlogPostPage({ params }: PageProps) {
  const filePath = path.join(process.cwd(), 'src/content/posts', `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, 'utf8');

const { content: MDXContent, frontmatter } = await compileMDX<Frontmatter>({
  source: raw,
  options: {
    parseFrontmatter: true,
  },
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
