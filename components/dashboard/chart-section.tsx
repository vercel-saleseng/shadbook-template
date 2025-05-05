export function ChartSection() {
  return (
    <div className="col-span-4 rounded-lg border bg-card shadow-sm">
      <div className="p-6">
        <h3 className="font-semibold">Work-Life Separation Index</h3>
        <p className="text-sm text-muted-foreground">
          Effectiveness of severance chip over the past 30 days
        </p>
      </div>
      <div className="h-[300px] w-full p-6 pt-0">
        <div className="h-full w-full">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current: 99.7%</p>
              <p className="text-xs text-muted-foreground">Target: 99.9%</p>
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Separation Index</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span>Threshold</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[250px] w-full">
            <svg viewBox="0 0 600 200" className="h-full w-full">
              {/* Background grid lines */}
              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={`grid-${i}`}
                  x1="0"
                  y1={i * 40}
                  x2="600"
                  y2={i * 40}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}

              {/* Data line - Separation Index */}
              <path
                d="M0,40 C20,38 40,42 60,40 C80,38 100,30 120,32 C140,34 160,20 180,15 C200,10 220,5 240,8 C260,11 280,20 300,18 C320,16 340,25 360,20 C380,15 400,10 420,12 C440,14 460,25 480,20 C500,15 520,10 540,8 C560,6 580,10 600,12"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />

              {/* Threshold line */}
              <path
                d="M0,20 L600,20"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Data points */}
              {[40, 42, 40, 32, 15, 8, 18, 20, 12, 20, 8, 12].map((y, i) => (
                <circle
                  key={`point-${i}`}
                  cx={i * 50 + 50}
                  cy={y}
                  r="3"
                  fill="hsl(var(--primary))"
                />
              ))}

              {/* X-axis labels */}
              <text x="0" y="195" className="text-xs fill-muted-foreground">
                Day 1
              </text>
              <text x="290" y="195" className="text-xs fill-muted-foreground">
                Day 15
              </text>
              <text x="580" y="195" className="text-xs fill-muted-foreground">
                Day 30
              </text>
            </svg>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <div>
              Higher values indicate stronger separation between innie/outie
              states
            </div>
            <div>Updated hourly</div>
          </div>
        </div>
      </div>
    </div>
  );
}
