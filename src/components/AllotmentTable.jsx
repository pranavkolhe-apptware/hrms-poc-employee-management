import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

const allotments = [
  {
    id: 1,
    employee: "John Doe",
    project: "Website Redesign",
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    role: "Frontend Developer",
  },
  {
    id: 2,
    employee: "Jane Smith",
    project: "Mobile App Development",
    startDate: "2023-03-20",
    endDate: "2023-09-15",
    role: "Project Manager",
  },
  {
    id: 3,
    employee: "Bob Johnson",
    project: "Data Migration",
    startDate: "2023-02-01",
    endDate: "2023-04-30",
    role: "Database Administrator",
  },
]

export function AllotmentTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Allotments</h2>
        <Button>Add Allotment</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allotments.map((allotment) => (
            <TableRow key={allotment.id}>
              <TableCell>{allotment.employee}</TableCell>
              <TableCell>{allotment.project}</TableCell>
              <TableCell>{allotment.startDate}</TableCell>
              <TableCell>{allotment.endDate}</TableCell>
              <TableCell>{allotment.role}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

