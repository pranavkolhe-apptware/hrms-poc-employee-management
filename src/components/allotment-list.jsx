
"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Pencil, Trash2, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"

const initialAllotments = [
  { id: 1, employee: "John Doe", project: "Project Alpha", startDate: "2023-01-01", endDate: "2023-12-31" },
  { id: 2, employee: "Jane Smith", project: "Project Beta", startDate: "2023-02-15", endDate: "2023-11-30" },
  { id: 3, employee: "Alice Johnson", project: "Project Gamma", startDate: "2023-03-01", endDate: "2023-09-30" },
  { id: 4, employee: "Bob Williams", project: "Project Delta", startDate: "2023-04-01", endDate: "2023-10-31" },
  { id: 5, employee: "Charlie Brown", project: "Project Epsilon", startDate: "2023-05-01", endDate: "2023-12-15" },
]

const AllotmentList = () => {
  const [allotments, setAllotments] = useState(initialAllotments)
  const [showForm, setShowForm] = useState(false)
  const [editingAllotment, setEditingAllotment] = useState(null)
  const [filter, setFilter] = useState("all")

  const handleDelete = (id) => {
    setAllotments(allotments.filter((allotment) => allotment.id !== id))
  }

  const handleEdit = (allotment) => {
    setEditingAllotment(allotment)
    setShowForm(true)
  }

  const handleSubmit = (formData) => {
    if (editingAllotment) {
      setAllotments(allotments.map((allotment) => (allotment.id === formData.id ? formData : allotment)))
    } else {
      setAllotments([...allotments, { ...formData, id: Date.now() }])
    }
    setShowForm(false)
    setEditingAllotment(null)
  }

  const getEmployeeStatus = (employee) => {
    const employeeAllotments = allotments.filter((a) => a.employee === employee)
    return employeeAllotments.length >= 3 ? "Overallocated" : "Normal"
  }

  const filteredAllotments =
    filter === "all" ? allotments : allotments.filter((a) => getEmployeeStatus(a.employee) === filter)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Allotments</h2>
        <div className="flex space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Normal">Normal</SelectItem>
              <SelectItem value="Overallocated">Overallocated</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Allotment
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAllotments.map((allotment) => (
            <TableRow key={allotment.id}>
              <TableCell>{allotment.employee}</TableCell>
              <TableCell>{allotment.project}</TableCell>
              <TableCell>{allotment.startDate}</TableCell>
              <TableCell>{allotment.endDate}</TableCell>
              <TableCell>
                <Badge variant={getEmployeeStatus(allotment.employee) === "Overallocated" ? "destructive" : "default"}>
                  {getEmployeeStatus(allotment.employee)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(allotment)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(allotment.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showForm && (
        <AllotmentForm
          allotment={editingAllotment}
          onClose={() => {
            setShowForm(false)
            setEditingAllotment(null)
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

const AllotmentForm = ({ allotment, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(allotment || { employee: "", project: "", startDate: "", endDate: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{allotment ? "Edit Allotment" : "Add New Allotment"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="employee">Employee</Label>
            <Select
              name="employee"
              value={formData.employee}
              onValueChange={(value) => handleChange({ target: { name: "employee", value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                <SelectItem value="Bob Williams">Bob Williams</SelectItem>
                <SelectItem value="Charlie Brown">Charlie Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="project">Project</Label>
            <Select
              name="project"
              value={formData.project}
              onValueChange={(value) => handleChange({ target: { name: "project", value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Project Alpha">Project Alpha</SelectItem>
                <SelectItem value="Project Beta">Project Beta</SelectItem>
                <SelectItem value="Project Gamma">Project Gamma</SelectItem>
                <SelectItem value="Project Delta">Project Delta</SelectItem>
                <SelectItem value="Project Epsilon">Project Epsilon</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
          </div>
          <DialogFooter>
            <Button type="submit">{allotment ? "Update" : "Add"} Allotment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AllotmentList

