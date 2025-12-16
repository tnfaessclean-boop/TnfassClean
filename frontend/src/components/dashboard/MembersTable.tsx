"use client"

import { useMemo, useState } from 'react'

type Member = {
  name: string
  role: string
  joined: string
}

const placeholder: Member[] = [
  { name: 'Kamel Ben Salah', role: 'Président', joined: '2024-02-01' },
  { name: 'Salwa Trabelsi', role: 'Membre', joined: '2024-06-12' },
  { name: 'Amine Jaziri', role: 'Trésorier', joined: '2024-09-03' },
  { name: 'Leila Hammami', role: 'Secrétaire', joined: '2025-01-12' },
  { name: 'Omar Gharbi', role: 'Membre', joined: '2025-03-22' },
  { name: 'Nadia Khelifi', role: 'Membre', joined: '2025-04-10' },
]

export default function MembersTable() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 5

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return placeholder
    return placeholder.filter((m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q))
  }, [query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="relative max-w-sm w-full">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="Rechercher un membre ou un rôle..."
            aria-label="Rechercher"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600">Affichage {filtered.length} résultats</div>
        </div>
      </div>

      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase border-b">
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Adhésion</th>
            </tr>
          </thead>
          <tbody>
            {current.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  Aucun membre trouvé.
                </td>
              </tr>
            ) : (
              current.map((m) => (
                <tr key={m.name} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">{m.name}</td>
                  <td className="px-4 py-3">{m.role}</td>
                  <td className="px-4 py-3">{m.joined}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="text-gray-600">Page {page} / {pageCount}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border bg-white disabled:opacity-50"
          >Précédent</button>
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="px-3 py-1 rounded-md border bg-white disabled:opacity-50"
          >Suivant</button>
        </div>
      </div>
    </div>
  )
}
