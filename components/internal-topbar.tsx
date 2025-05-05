"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon, BookOpenIcon } from "lucide-react";

export function InternalTopbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 px-4 border-b bg-background/95 backdrop-blur z-30">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold font-mono text-primary">
              shadbook
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="https://github.com/vercel-saleseng/registry-demo"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
