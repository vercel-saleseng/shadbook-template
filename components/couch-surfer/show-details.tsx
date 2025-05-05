"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Calendar, Clock, Star, Tag, Tv2, Loader2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Episode {
  season: number
  episode: number
  name: string
  air_date: string
}

interface Show {
  id: number
  name: string
  permalink: string
  url: string
  description: string
  description_source: string
  start_date: string
  end_date: string | null
  country: string
  status: string
  runtime: number
  network: string
  youtube_link: string | null
  image_path: string
  image_thumbnail_path: string
  rating: string
  rating_count: string
  countdown: null | any
  genres: string[]
  pictures: string[]
  episodes: Episode[]
}

interface ShowDetailsProps {
  showId: string
}

export function ShowDetails({ showId }: ShowDetailsProps) {
  const [show, setShow] = useState<Show | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    async function fetchShowDetails() {
      setLoading(true)
      setError(false)

      try {
        const res = await fetch(`https://www.episodate.com/api/show-details?q=${showId}`)
        if (!res.ok) throw new Error("Failed to fetch show details")

        const data = await res.json()
        if (data.tvShow) {
          setShow(data.tvShow)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error("Error fetching show details:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchShowDetails()
  }, [showId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading show data...</p>
        </div>
      </div>
    )
  }

  if (error || !show) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          We couldn't load the show information. This might be due to a network issue or the API being temporarily
          unavailable.
        </p>
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    )
  }

  // Group episodes by season
  const episodesBySeason =
    show.episodes?.reduce(
      (acc, episode) => {
        if (!acc[episode.season]) {
          acc[episode.season] = []
        }
        acc[episode.season].push(episode)
        return acc
      },
      {} as Record<number, Episode[]>,
    ) || {}

  const seasons = Object.keys(episodesBySeason)
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/3 flex-shrink-0">
          <div className="relative aspect-[2/3] w-full max-w-[400px] mx-auto lg:mx-0 overflow-hidden rounded-lg shadow-lg border border-accent/20">
            <Image
              src={show.image_path || "/placeholder.svg?height=600&width=400"}
              alt={show.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
            {show.genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{show.name}</h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-primary" />
              <span>{show.rating}/10</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{show.start_date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{show.runtime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Tv2 className="w-4 h-4" />
              <span>{show.network}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{show.status}</span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: show.description }} />
          </div>

          {show.youtube_link && (
            <div className="mb-6">
              <Button variant="outline" className="gap-2" asChild>
                <a href={show.youtube_link} target="_blank" rel="noopener noreferrer">
                  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Watch Trailer
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>

      {show.episodes && show.episodes.length > 0 && (
        <Tabs defaultValue="season-1" className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Episodes</h2>
          <TabsList className="mb-4 flex flex-wrap">
            {seasons.map((season) => (
              <TabsTrigger key={season} value={`season-${season}`}>
                Season {season}
              </TabsTrigger>
            ))}
          </TabsList>

          {seasons.map((season) => (
            <TabsContent key={season} value={`season-${season}`} className="space-y-4">
              {episodesBySeason[season].map((episode) => (
                <Card key={`${episode.season}-${episode.episode}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          S{episode.season}:E{episode.episode}
                        </div>
                        <div className="font-medium">{episode.name}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(episode.air_date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )}

      {show.pictures && show.pictures.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {show.pictures.slice(0, 8).map((picture, index) => (
              <div key={index} className="aspect-video relative rounded-md overflow-hidden border border-accent/20">
                <Image
                  src={picture || "/placeholder.svg"}
                  alt={`${show.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
