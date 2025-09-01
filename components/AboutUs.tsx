
import React from 'react';

// Simple inline SVG icons for the values list
const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

export default function AboutUs() {
  const values = [
    { title: "Accuracy & Fairness", text: "We are committed to factual reporting and presenting diverse perspectives with fairness and respect." },
    { title: "Community Focus", text: "We prioritize stories that matter to our local community, fostering connection and understanding among neighbors." },
    { title: "Independence", text: "Our journalism is not influenced by commercial or political interests. We maintain a clear separation between editorial content and advertising." },
    { title: "Accessibility", text: "We strive to make local information accessible to English speakers, helping newcomers integrate and long-term residents stay informed." }
  ];

  return (
    <>
      <h2>About The Fläming Eck</h2>
      
      <div className="my-6 p-4 rounded-lg bg-ocean/5 dark:bg-ocean/20 border border-ocean/20 dark:border-ocean/30">
        <h3 className="!mt-0">Our Mission</h3>
        <p>
          The Fläming Eck is an independent digital magazine dedicated to serving the English-speaking community in Bad Belzig and the wider Hoher Fläming region. Our mission is to provide high-quality, reliable, and engaging content that connects residents and visitors with the local culture, events, and stories that make this area unique.
        </p>
      </div>

      <h3>Our Values</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {values.map(value => (
          <div key={value.title} className="flex gap-4">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="w-8 h-8 text-ocean" />
            </div>
            <div>
              <h4 className="font-bold text-base !mt-0 text-charcoal dark:text-slate-200">{value.title}</h4>
              <p className="text-sm !mt-1">{value.text}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-6 border-slate-200 dark:border-slate-700" />

      <h3>Editorial Stance</h3>
      <p>
        We are non-partisan and focus on issues directly relevant to life in the Hoher Fläming. Our coverage includes local news, in-depth guides, historical features, cultural events, and community discussions. We aim to be a constructive platform for conversation, celebrating the region's heritage while looking toward its future.
      </p>
    </>
  );
}
