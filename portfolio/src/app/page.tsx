"use client";

import { useEffect, useState } from 'react';
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
  const pages = [
  { label: 'Blog', path: '/blog' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  ];

  useEffect(() => {
    const flickerTimer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(flickerTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    fetch('/quotes.json')
      .then((res) => res.json())
      .then((data: QuoteEntry[]) => {
        const today = new Date().toISOString().split('T')[0];
        const entry = data.find((q) => q.date === today);

        setFullQuote(entry?.quote || `""Lock in." - Me`)
      });
  }, [visible]);

  useEffect(() => {
    if (!fullQuote) return;

    let index = 0;

    const typeNext = () => {
      if (index < fullQuote.length - 1) {
        setQuote((prev) => prev + fullQuote[index]);
        index++;
        setTimeout(typeNext, 80); // Delay between characters
      } else {
        setTimeout(() => setButtonsVisible(true), 500)
      }
    };

    typeNext();

  }, [fullQuote]);


  return (
    <div className="w-screen h-screen bg-black relative">
      <h1
        className={clsx(
          "text-5xl font-bold opacity-0 animate-flicker absolute left-1/2 top-[25vh] -translate-x-1/2",
          visible && "opacity-100 transition-opacity duration-1000"
        )}
        id="sheen-text"
      >
        ISAAK WIEBE
      </h1>

      {visible && (
        <p className="text-lg absolute top-[45vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl text-center font-mono px-4">
          {quote}
          <span className="blinking-cursor"></span>
        </p>
      )}

      {buttonsVisible && (
        <div className="absolute top-[60vh] left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 px-4 animate-rise max-w-full">
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
