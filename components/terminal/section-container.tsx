"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface SectionContainerProps {
  id: string
  progress: number
  active: boolean
}

export function SectionContainer({ id, progress, active }: SectionContainerProps) {
  const [animationState, setAnimationState] = useState<"idle" | "opening" | "opened" | "closing">("idle")

  // Control the animation sequence
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (active) {
      // Start opening animation
      setAnimationState("opening")

      // After opening completes, set to opened state
      timeoutId = setTimeout(() => {
        setAnimationState("opened")

        // Start closing animation after a delay
        timeoutId = setTimeout(() => {
          setAnimationState("closing")

          // Reset to idle after closing animation completes
          timeoutId = setTimeout(() => {
            setAnimationState("idle")
          }, 1000) // Fade-out duration
        }, 1500) // How long to stay fully opened
      }, 700) // Opening duration
    } else {
      setAnimationState("idle")
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [active])

  return (
    <div className="flex flex-col">
      <div className="relative">
        {/* Box opening animation lines */}
        <div
          className={`absolute -top-6 left-0 w-1/3 h-6 border-l border-t border-[hsl(var(--primary))] transition-all duration-700
            ${animationState === "idle" ? "opacity-0" : ""}
            ${animationState === "opening" ? "opacity-100" : ""}
            ${animationState === "opened" ? "opacity-100" : ""}
            ${animationState === "closing" ? "opacity-0" : ""}`}
          style={{
            transform: animationState !== "idle" ? "translateY(-4px)" : "translateY(0)",
            transitionProperty: "opacity, transform",
          }}
        ></div>
        <div
          className={`absolute -top-6 right-0 w-1/3 h-6 border-r border-t border-[hsl(var(--primary))] transition-all duration-700
            ${animationState === "idle" ? "opacity-0" : ""}
            ${animationState === "opening" ? "opacity-100" : ""}
            ${animationState === "opened" ? "opacity-100" : ""}
            ${animationState === "closing" ? "opacity-0" : ""}`}
          style={{
            transform: animationState !== "idle" ? "translateY(-4px)" : "translateY(0)",
            transitionProperty: "opacity, transform",
          }}
        ></div>

        {/* Container - Card component */}
        <Card
          className={`mb-1 p-0 overflow-hidden bg-card transition-all duration-500
            ${animationState !== "idle" ? "border-[hsl(var(--primary))]" : "border-border"}`}
        >
          <CardContent className="p-2 text-center text-xs font-mono">
            <span
              className={`transition-colors duration-500 ${animationState !== "idle" ? "text-[hsl(var(--primary))]" : "text-muted-foreground"}`}
            >
              {id}
            </span>
          </CardContent>
        </Card>
      </div>
      <Progress
        value={progress}
        className={`h-2 transition-all duration-700 bg-muted`}
        indicatorClassName={`bg-[hsl(var(--primary))] ${animationState === "opening" ? "animate-pulse" : ""}`}
      />
      <div className="text-center text-xs font-mono text-muted-foreground mt-1">{progress}%</div>
    </div>
  )
}
