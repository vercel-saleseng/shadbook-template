export function DepartmentTable() {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-6">
        <h3 className="font-semibold">Department Performance</h3>
        <p className="text-sm text-muted-foreground">
          Productivity metrics for severed employees by department
        </p>
      </div>
      <div className="border-t">
        <div className="grid grid-cols-5 border-b p-4 text-sm font-medium">
          <div>Department</div>
          <div>Employees</div>
          <div>Productivity</div>
          <div>Deviation</div>
          <div>Status</div>
        </div>
        {[
          {
            dept: "Macrodata Refinement",
            employees: "4",
            productivity: "92%",
            deviation: "0.5%",
            status: "Compliant",
          },
          {
            dept: "Optics & Design",
            employees: "6",
            productivity: "88%",
            deviation: "1.2%",
            status: "Compliant",
          },
          {
            dept: "Mind & Security",
            employees: "12",
            productivity: "95%",
            deviation: "0.3%",
            status: "Compliant",
          },
          {
            dept: "Wellness Center",
            employees: "3",
            productivity: "76%",
            deviation: "3.8%",
            status: "Warning",
          },
        ].map((item, i) => (
          <div key={i} className="grid grid-cols-5 border-b p-4 text-sm">
            <div className="font-medium">{item.dept}</div>
            <div>{item.employees}</div>
            <div>{item.productivity}</div>
            <div>{item.deviation}</div>
            <div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  item.status === "Compliant"
                    ? "bg-green-100 text-green-800"
                    : item.status === "Warning"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
