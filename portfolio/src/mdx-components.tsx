import type { MDXComponents } from 'mdx/types';
import clsx from 'clsx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 {...props} className={clsx("text-3xl sm:text-4xl font-bold mt-10 mb-4", props.className)} />
    ),
    h2: (props) => (
      <h2 {...props} className={clsx("text-2xl font-semibold mt-8 mb-4", props.className)} />
    ),
    p: (props) => (
      <p {...props} className={clsx("text-gray-300 leading-relaxed mb-4", props.className)} />
    ),
    a: (props) => (
      <a {...props} className={clsx("text-accent2 underline hover:text-accent1", props.className)} />
    ),
    ul: (props) => (
      <ul {...props} className={clsx("list-disc list-inside mb-4", props.className)} />
    ),
    ol: (props) => (
      <ol {...props} className={clsx("list-decimal list-inside mb-4", props.className)} />
    ),
    code: (props) => (
      <code {...props} className={clsx("bg-gray-800 text-white px-1 rounded", props.className)} />
    ),
    pre: (props) => (
      <pre {...props} className={clsx("bg-gray-900 text-white p-4 rounded mb-6 overflow-auto", props.className)} />
    ),
    ...components,
  };
}
