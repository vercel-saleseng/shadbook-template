import { Suspense } from "react";
import { ShowDetails } from "@/components/couch-surfer/show-details";
import { PopularShows } from "@/components/couch-surfer/popular-shows";
import { SearchBar } from "@/components/couch-surfer/search-bar";

export default function Home() {
  return (
    <>
      <header className="border-b border-border py-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="/couch-surfer"
            className="tex/couch-surfer/showfont-bold text-primary"
          >
            Couch Surfer
          </a>
          <Suspense>
            <SearchBar />
          </Suspense>
        </div>
      </header>

      <div className="min-h-screen py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2">Featured TV Show</h1>
        </header>

        <ShowDetails showId="20177" />

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">
            Popular Shows You Might Like
          </h2>
          <PopularShows />
        </div>
      </div>
    </>
  );
}
