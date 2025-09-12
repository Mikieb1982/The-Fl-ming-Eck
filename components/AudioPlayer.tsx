import React from 'react';

interface AudioPlayerProps {
  src: string;
  caption?: string;
}

export default function AudioPlayer({ src, caption }: AudioPlayerProps) {
  return (
    <figure className="my-6 not-prose">
      <audio
        controls
        src={src}
        className="w-full h-12 rounded-lg bg-light-grey dark:bg-slate-700"
      >
        Your browser does not support the audio element.
      </audio>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-slate-600 dark:text-slate-300">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}