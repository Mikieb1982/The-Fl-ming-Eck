import React, { useState } from 'react';
import PlayIcon from './icons/PlayIcon';

interface VideoEmbedProps {
  youtubeId: string;
  caption?: string;
}

export default function VideoEmbed({ youtubeId, caption }: VideoEmbedProps) {
  const [isActivated, setIsActivated] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
  // Using youtube-nocookie.com for privacy-enhanced mode
  // rel=0 prevents related videos from other channels from showing at the end
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;

  const handleActivate = () => {
    setIsActivated(true);
  };

  return (
    <figure className="my-6 not-prose">
      <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg bg-black group">
        {isActivated ? (
          <iframe
            src={embedUrl}
            title={caption || `YouTube video player`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full absolute inset-0"
          ></iframe>
        ) : (
          <button
            onClick={handleActivate}
            className="w-full h-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sandstone-ochre focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label={`Play video: ${caption || 'Embedded YouTube video'}`}
          >
            <img
              src={thumbnailUrl}
              alt={caption || `Thumbnail for YouTube video`}
              loading="lazy"
              className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
            <div className="relative w-16 h-16 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center group-hover:bg-brand-green group-hover:scale-110 transition-all duration-300 ease-in-out">
              <PlayIcon className="w-8 h-8 ml-1" />
            </div>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
