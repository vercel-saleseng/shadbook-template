"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SearchResult {
  id: number
  name: string
  permalink: string
  start_date: string
  network: string
  image_thumbnail_path: string
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  // Simple debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch search results
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedQuery.length < 2) {
        setResults([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const res = await fetch(`https://www.episodate.com/api/search?q=${encodeURIComponent(debouncedQuery)}&page=1`)
        if (!res.ok) throw new Error("Failed to fetch search results")

        const data = await res.json()
        setResults(data.tv_shows.slice(0, 5)) // Limit to 5 suggestions
        setIsOpen(data.tv_shows.length > 0)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          navigateToShow(results[selectedIndex].id)
        } else if (query.trim() !== "") {
          handleSearch()
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  const navigateToShow = (id: number) => {
    router.push(`/show/${id}`)
    setQuery("")
    setIsOpen(false)
  }

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          className="pr-16"
        />
        {query.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-8 h-full"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 h-full"
          onClick={handleSearch}
          aria-label="Search"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg overflow-hidden">
          <ul className="py-1">
            {results.map((show, index) => (
              <li
                key={show.id}
                className={`px-3 py-2 cursor-pointer flex items-center gap-3 hover:bg-accent/50 ${
                  index === selectedIndex ? "bg-accent" : ""
                }`}
                onClick={() => navigateToShow(show.id)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="relative h-10 w-16 flex-shrink-0">
                  <Image
                    src={show.image_thumbnail_path || "/placeholder.svg?height=60&width=40"}
                    alt={show.name}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{show.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{show.network}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
