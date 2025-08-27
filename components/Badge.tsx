
import React from 'react';

interface BadgeProps {
  ok: boolean;
  label: string;
}

export default function Badge({ ok, label }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${
        ok 
        ? "bg-green-100 text-green-800 border-green-200" 
        : "bg-amber-100 text-amber-800 border-amber-200"
      }`}
    >
      {label}: {ok ? "pass" : "check"}
    </span>
  );
}
