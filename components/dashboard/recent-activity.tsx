export function RecentActivity() {
  return (
    <div className="col-span-3 rounded-lg border bg-card shadow-sm">
      <div className="p-6">
        <h3 className="font-semibold">Recent Severance Events</h3>
        <p className="text-sm text-muted-foreground">
          Latest transitions between innie and outie states
        </p>
      </div>
      <div className="px-6">
        <div className="space-y-4">
          {[
            {
              name: "Mark S.",
              type: "Elevator Transition",
              time: "2m",
            },
            {
              name: "Helly R.",
              type: "Elevator Transition",
              time: "4m",
            },
            {
              name: "Irving B.",
              type: "Overtime Protocol",
              time: "6m",
            },
            { name: "Dylan G.", type: "Security Override", time: "8m" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-lg border p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {item.name} • {item.type}
                </p>
                <p className="text-xs text-muted-foreground">
                  Completed • {item.time} ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6">
        <button className="w-full rounded-md border p-2 text-sm font-medium">
          View All
        </button>
      </div>
    </div>
  );
}
