import React from 'react';
import { ClipboardList } from 'lucide-react';

export default function RequestBoard({ lang = 'en', items = [] }) {
  const l = lang === 'ru'
    ? { title: 'Доска запросов', status: 'Статус', none: 'Нет запросов' }
    : { title: 'Request Board', status: 'Status', none: 'No requests' };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur p-5">
      <div className="flex items-center gap-2 text-white/90 mb-4">
        <ClipboardList className="w-5 h-5" />
        <h3 className="font-medium">{l.title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="text-white/60 text-sm">{l.none}</p>
      ) : (
        <div className="overflow-x-auto -mx-3 px-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/60">
                <th className="text-left font-normal py-2">Title</th>
                <th className="text-left font-normal py-2">{l.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((it) => (
                <tr key={it.id}>
                  <td className="py-3 text-white">{it.title}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md border border-white/10 text-xs text-white/80">
                      {it.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
