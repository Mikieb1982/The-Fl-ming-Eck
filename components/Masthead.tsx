
import React from 'react';
import { ValidationResult } from '../types';
import { BRAND } from '../constants';
import { fmtDate } from '../utils/helpers';
import Badge from './Badge';

interface MastheadProps {
  validation: ValidationResult;
}

export default function Masthead({ validation }: MastheadProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start justify-between gap-4">
      <div>
        <h1 className="text-5xl font-extrabold tracking-tight uppercase">{BRAND.title}</h1>
        <p className="text-gray-600 mt-2">{BRAND.strap}</p>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
        <p className="text-sm text-gray-500">Updated · {fmtDate(Date.now())}</p>
        <div className="flex gap-2">
          <Badge ok={validation.allEnglish} label="English" />
          <Badge ok={validation.allFresh} label="Freshness" />
          <Badge ok={validation.allRequired} label="Structure" />
        </div>
      </div>
    </header>
  );
}
