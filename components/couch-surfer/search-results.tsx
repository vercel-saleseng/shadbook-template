"use client"

import { useState, useEffect } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Show {
  id: number
  name: string
  permalink: string
  start_date: string
  end_date: string | null
  country: string
  network: string
  status: string
  image_thumbnail_path: string
}

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const [shows, setShows] = useState<Show[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setShows([])
        setTotal(0)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(false)

      try {
        const res = await fetch(`https://www.episodate.com/api/search?q=${encodeURIComponent(query)}&page=1`)
        if (!res.ok) throw new Error("Failed to fetch search results")

        const data = await res.json()
        if (data.tv_shows) {
          setShows(data.tv_shows)
          setTotal(Number.parseInt(data.total) || 0)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error("Error searching shows:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[30vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Searching for shows...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh] px-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold mb-2">Search failed</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't complete your search. This might be due to a network issue or the API being temporarily
          unavailable.
        </p>
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    )
  }

  if (shows.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">No shows found</h2>
        <p className="text-muted-foreground">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <>
      <p className="text-muted-foreground mb-6">Found {total} results</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {shows.map((show) => (
          <Card key={show.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <Link href={`/show/${show.id}`} className="block">
              <div className="aspect-[2/3] relative">
                <Image
                  src={show.image_thumbnail_path || "/placeholder.svg?height=300&width=200"}
                  alt={show.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-2">
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-primary" />
                    <span>{show.network}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-2">{show.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{show.status}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </>
  )
}
