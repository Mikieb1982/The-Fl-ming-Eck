
import React from 'react';
import { ValidationCheck, SelfTest } from '../types';
import Badge from './Badge';

interface DiagnosticsProps {
  validationChecks: ValidationCheck[];
  selfTests: SelfTest[];
}

export default function Diagnostics({ validationChecks, selfTests }: DiagnosticsProps) {
  return (
    <section className="rounded-2xl border p-4 md:p-6 bg-white shadow-sm">
      <h4 className="text-lg font-semibold">Diagnostics</h4>
      <div className="mt-4">
        <h5 className="font-medium text-sm text-gray-600 uppercase tracking-wider">Content Validation</h5>
        <ul className="mt-2 grid md:grid-cols-2 gap-2 text-sm">
          {validationChecks.map((c) => (
            <li key={c.id} className="flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-50">
              <span className="font-mono text-xs text-gray-700">{c.id}</span>
              <span className="flex gap-2">
                <Badge ok={c.english} label="EN" />
                <Badge ok={c.fresh} label={`≤45d (${c.ageDays}d)`} />
                <Badge ok={c.hasRequired} label="Struct" />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h5 className="font-medium text-sm text-gray-600 uppercase tracking-wider">Self-tests</h5>
        <ul className="mt-2 grid md:grid-cols-2 gap-2 text-sm">
          {selfTests.map((t, i) => (
            <li key={i} className={`border rounded-lg px-3 py-2 font-medium ${t.pass ? "bg-green-50 text-green-900 border-green-200" : "bg-amber-50 text-amber-900 border-amber-200"}`}>
              {t.pass ? "✓ PASS" : "✗ CHECK"} · {t.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
