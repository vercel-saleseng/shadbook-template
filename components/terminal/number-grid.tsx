"use client"

import { useEffect, useRef, useState } from "react"

interface NumberGridProps {
  onNumberClick: (rowIndex: number, colIndex: number) => void
}

export function NumberGrid({ onNumberClick }: NumberGridProps) {
  // Grid dimensions
  const ROWS = 10
  const COLS = 15
  const HIGHLIGHT_SIZE = 3

  const [numberGrid, setNumberGrid] = useState<number[][]>([])
  const [highlightedArea, setHighlightedArea] = useState<{
    startRow: number
    startCol: number
  }>({ startRow: 0, startCol: 0 })
  const [isHighlightVisible, setIsHighlightVisible] = useState(false)
  const [highlightOpacity, setHighlightOpacity] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Generate random grid of numbers
  const generateNumberGrid = (rows: number, cols: number) => {
    const grid = []
    for (let i = 0; i < rows; i++) {
      const row = []
      for (let j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random() * 10))
      }
      grid.push(row)
    }
    return grid
  }

  // Initialize grid
  useEffect(() => {
    setNumberGrid(generateNumberGrid(ROWS, COLS))
  }, [])

  // Function to generate a new highlighted area
  const generateNewHighlightedArea = () => {
    // Ensure the 3x3 grid fits within our number grid
    const maxStartRow = ROWS - HIGHLIGHT_SIZE
    const maxStartCol = COLS - HIGHLIGHT_SIZE

    const startRow = Math.floor(Math.random() * maxStartRow)
    const startCol = Math.floor(Math.random() * maxStartCol)

    setHighlightedArea({ startRow, startCol })

    // Start fade-in animation
    setHighlightOpacity(0)
    setIsHighlightVisible(true)

    // Animate opacity from 0 to 1 over 500ms
    let opacity = 0
    const fadeInterval = setInterval(() => {
      opacity += 0.1
      setHighlightOpacity(opacity)
      if (opacity >= 1) {
        clearInterval(fadeInterval)
      }
    }, 50)
  }

  // Set up the highlight cycle
  const startHighlightCycle = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // Generate new highlighted area
    generateNewHighlightedArea()

    // Set timer for next cycle
    timerRef.current = setTimeout(startHighlightCycle, 5000)
  }

  // Initialize and manage highlight cycle
  useEffect(() => {
    if (numberGrid.length > 0) {
      startHighlightCycle()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [numberGrid])

  // Check if a position is within the highlighted 3x3 area
  const isHighlighted = (rowIndex: number, colIndex: number) => {
    if (!isHighlightVisible) return false

    const { startRow, startCol } = highlightedArea
    return (
      rowIndex >= startRow &&
      rowIndex < startRow + HIGHLIGHT_SIZE &&
      colIndex >= startCol &&
      colIndex < startCol + HIGHLIGHT_SIZE
    )
  }

  const handleClick = (rowIndex: number, colIndex: number) => {
    // Check if the clicked position is within the highlighted area
    if (!isHighlighted(rowIndex, colIndex)) return

    // Unhighlight the grid
    setIsHighlightVisible(false)

    // Reset the timer to start a new 5-second cycle
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(startHighlightCycle, 5000)

    // Pass the click to the parent component
    onNumberClick(rowIndex, colIndex)
  }

  // Method to regenerate the grid (exposed for parent component)
  const regenerateGrid = () => {
    setNumberGrid(generateNumberGrid(ROWS, COLS))
  }

  // Expose the regenerateGrid method to parent components
  NumberGrid.regenerateGrid = regenerateGrid

  return (
    <div className="p-6 min-h-[400px] flex flex-col items-center justify-center bg-card">
      <div className="grid grid-cols-1 gap-y-2 font-mono text-center w-full">
        {numberGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-x-4">
            {row.map((num, colIndex) => {
              const highlighted = isHighlighted(rowIndex, colIndex)

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-6 h-6 flex items-center justify-center text-xs sm:text-sm transition-all duration-300
                    ${
                      highlighted ? "text-[hsl(var(--primary))] scale-150 z-10 cursor-pointer" : "text-muted-foreground"
                    }`}
                  style={{
                    opacity: highlighted ? highlightOpacity : 1,
                  }}
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {num}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
