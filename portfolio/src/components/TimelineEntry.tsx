'use client';

interface TimelineEntryProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export default function TimelineEntry({ title, subtitle, date, description }: TimelineEntryProps) {
  return (
    <div className="relative pl-10 sm:pl-14 pb-10 border-l border-gray-700">
      <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white rounded-full shadow-md" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <h4 className="text-sm text-gray-400">{subtitle}</h4>
      <span className="text-xs text-gray-500 block mt-1">{date}</span>
      <p className="text-gray-300 mt-2">{description}</p>
    </div>
  );
}
