import React from 'react';
import MapPinIcon from '../icons/MapPinIcon';
import LinkIcon from '../icons/LinkIcon';

interface VenueBadgeProps {
    name: string;
    address?: string;
}

export default function VenueBadge({ name, address }: VenueBadgeProps) {
  const query = address || name;
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  
  return (
    <div className="mt-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
      <div className="flex items-start gap-3">
        <MapPinIcon className="w-5 h-5 mt-1 text-slate-500 dark:text-slate-400 shrink-0" />
        <div>
          <h4 className="font-bold text-charcoal dark:text-slate-200">{name}</h4>
          {address && <p className="text-sm text-slate-600 dark:text-slate-300">{address}</p>}
          <a href={gmapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-ocean hover:underline">
            <LinkIcon className="w-4 h-4" />
            View on Map
          </a>
        </div>
      </div>
    </div>
  );
}