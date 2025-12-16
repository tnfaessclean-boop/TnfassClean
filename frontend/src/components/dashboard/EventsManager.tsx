"use client"

import { useEffect, useMemo, useState } from 'react'

type EventItem = {
  id: string
  title: string
  date: string
  description?: string
}

const STORAGE_KEY = 'atpne_events_v1'

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

export default function EventsManager() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setEvents(JSON.parse(raw))
    } catch (e) {
      console.error('Failed to load events', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
    } catch (e) {
      console.error('Failed to save events', e)
    }
  }, [events])

  const addEvent = () => {
    if (!title || !date) return
    const item: EventItem = { id: uid(), title: title.trim(), date, description: description.trim() }
    setEvents((s) => [item, ...s])
    setTitle('')
    setDate('')
    setDescription('')
  }

  const removeEvent = (id: string) => setEvents((s) => s.filter((e) => e.id !== id))

  const upcoming = useMemo(() => events.slice().sort((a, b) => (a.date < b.date ? -1 : 1)), [events])

  return (
    <div className="mt-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h4 className="text-lg font-medium mb-3">Ajouter un événement</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre" className="col-span-1 sm:col-span-2 px-3 py-2 border rounded-md" />
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="px-3 py-2 border rounded-md" />
        </div>

        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optionnel)" className="w-full px-3 py-2 border rounded-md mb-3 min-h-[80px]" />

        <div className="flex items-center justify-end gap-2">
          <button onClick={() => { setTitle(''); setDate(''); setDescription('') }} className="px-3 py-2 rounded-md border bg-white">Annuler</button>
          <button onClick={addEvent} className="px-3 py-2 rounded-md bg-primary-600 text-white">Ajouter</button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-medium mb-2">Événements à venir</h4>
        {upcoming.length === 0 ? (
          <div className="text-sm text-gray-500">Aucun événement pour l&apos;instant.</div>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((ev) => (
              <li key={ev.id} className="bg-white rounded-lg shadow p-3 flex justify-between items-start">
                <div>
                  <div className="font-medium text-gray-800">{ev.title}</div>
                  <div className="text-sm text-gray-500">{ev.date} {ev.description && <>— {ev.description}</>}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => removeEvent(ev.id)} className="text-sm text-rose-600">Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
