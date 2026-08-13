import { useState } from 'react'

function findMatchingExhibit(exhibits, query) {
  const q = query.toLowerCase().trim()
  if (!q) return null

  for (const exhibit of exhibits) {
    for (const keyword of exhibit.triggerKeywords) {
      const k = keyword.toLowerCase()
      if (q.includes(k) || k.includes(q)) return exhibit
    }
  }

  const words = q.split(/\s+/).filter((w) => w.length >= 4)
  for (const exhibit of exhibits) {
    for (const keyword of exhibit.triggerKeywords) {
      const k = keyword.toLowerCase()
      if (words.some((w) => k.includes(w))) return exhibit
    }
  }

  return null
}

export function useExhibitRequests(exhibits) {
  const [log, setLog] = useState([])
  const [inputValue, setInputValue] = useState('')

  function submit() {
    const query = inputValue.trim()
    if (!query) return
    const exhibit = findMatchingExhibit(exhibits, query)
    setLog((prev) => [...prev, { id: prev.length, query, exhibit }])
    setInputValue('')
  }

  return { log, inputValue, setInputValue, submit }
}
