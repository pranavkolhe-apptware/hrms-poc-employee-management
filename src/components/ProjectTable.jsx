import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    client: "ABC Corp",
    startDate: "2023-01-01",
    endDate: "2023-06-30",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "XYZ Inc",
    startDate: "2023-03-15",
    endDate: "2023-09-15",
    status: "Planning",
  },
  {
    id: 3,
    name: "Data Migration",
    client: "123 Ltd",
    startDate: "2023-02-01",
    endDate: "2023-04-30",
    status: "Completed",
  },
]

export function ProjectTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button>Add Project</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>{project.status}</TableCell>
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

