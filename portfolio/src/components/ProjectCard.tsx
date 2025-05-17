'use client';

import React from 'react';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  link?: string;
}

export default function ProjectCard({ title, description, tags = [], link }: ProjectCardProps) {
  return (
    <div className="group relative bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-white transition-all duration-300 hover:shadow-lg hover:shadow-white/10">
      <div className="mb-4">
        <h3 className="text-xl font-semibold group-hover:text-white">{title}</h3>
        <p className="text-gray-400 mt-2">{description}</p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-sm px-2 py-1 rounded-full text-gray-300 group-hover:bg-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {link && (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-sm text-blue-400 hover:underline"
        >
          View Project →
        </Link>
      )}
    </div>
  );
}
