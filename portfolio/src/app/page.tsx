"use client";

import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface QuoteEntry {
  date: string;
  quote: string;
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [quote, setQuote] = useState('');
  const [fullQuote, setFullQuote] = useState('');
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const skipRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pages = [
    { label: 'Blog', path: '/blog' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
  ];

  const fetchAndSetQuote = async () => {
    const res = await fetch('/quotes.json');
    const data: QuoteEntry[] = await res.json();
    const today = new Date().toISOString().split('T')[0];
    const entry = data.find((q) => q.date === today);
    const selected = entry?.quote || `""Lock in." - Me`;
    setFullQuote(selected);
    setQuote(selected);
    setButtonsVisible(true);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!visible || skipRef.current) return;

    fetch('/quotes.json')
      .then((res) => res.json())
      .then((data: QuoteEntry[]) => {
        const today = new Date().toISOString().split('T')[0];
        const entry = data.find((q) => q.date === today);
        const selected = entry?.quote || `""Lock in." - Me`;
        setFullQuote(selected);
      });
  }, [visible]);

  useEffect(() => {
    if (!fullQuote || skipRef.current) return;

    let index = -1;

    const typeNext = () => {
      if (skipRef.current) {
        setQuote(fullQuote);
        setButtonsVisible(true);
        return;
      }

      if (index < fullQuote.length - 1) {
        setQuote((prev) => prev + fullQuote[index]);
        index++;
        timeoutRef.current = setTimeout(typeNext, 80);
      } else {
        timeoutRef.current = setTimeout(() => setButtonsVisible(true), 500);
      }
    };

    typeNext();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [fullQuote]);

  const handleSkip = () => {
    if (skipRef.current) return;

    skipRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setVisible(true);
    fetchAndSetQuote();
  };

  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col items-center px-4 text-center overflow-hidden" onClick={handleSkip}>
      <h1
        className={clsx(
          "text-5xl sm:text-6xl font-bold animate-flicker mt-[25vh]",
          visible && "opacity-100 transition-opacity duration-1000"
        )}
        id="sheen-text"
      >
        ISAAK WIEBE
      </h1>

      {visible && (
        <p className="text-base sm:text-lg max-w-2xl font-mono mt-8 sm:mt-12 mb-10 sm:mb-16 px-2">
          {quote}
          <span className="blinking-cursor"></span>
        </p>
      )}

      {buttonsVisible && (
        <div className="flex flex-wrap justify-center gap-4 animate-rise max-w-full mb-12">
          {pages.map(({ label, path }) => (
            <Link href={path} key={label}>
              <button
                className="relative rounded-full px-6 py-3 bg-gray-700 text-white font-semibold overflow-hidden transition-all duration-300 group"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', `${x}px`);
                  e.currentTarget.style.setProperty('--y', `${y}px`);
                }}
              >
                <span className="relative z-10">{label}</span>
                <span className="absolute inset-0 bg-gradient-radial opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>


  );
}
