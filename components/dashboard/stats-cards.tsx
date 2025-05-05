export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium tracking-tight text-muted-foreground">
            Active Innies
          </h3>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">78</p>
            <p className="text-sm text-muted-foreground">
              +4 from last quarter
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium tracking-tight text-muted-foreground">
            Severance Compliance
          </h3>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">99.4%</p>
            <p className="text-sm text-muted-foreground">
              +0.2% from last quarter
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium tracking-tight text-muted-foreground">
            Memory Bleed Rate
          </h3>
        </div>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">0.03%</p>
            <p className="text-sm text-muted-foreground">
              -0.01% from last quarter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
