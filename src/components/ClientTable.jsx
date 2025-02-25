import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

const clients = [
  {
    id: 1,
    name: "ABC Corp",
    contactPerson: "John Smith",
    email: "john@abccorp.com",
    phone: "123-456-7890",
  },
  {
    id: 2,
    name: "XYZ Inc",
    contactPerson: "Jane Doe",
    email: "jane@xyzinc.com",
    phone: "987-654-3210",
  },
  {
    id: 3,
    name: "123 Ltd",
    contactPerson: "Bob Johnson",
    email: "bob@123ltd.com",
    phone: "456-789-0123",
  },
]

export function ClientTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Button>Add Client</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.contactPerson}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
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

