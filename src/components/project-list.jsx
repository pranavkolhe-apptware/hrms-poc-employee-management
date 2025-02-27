"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Pencil, Trash2, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"



const initialProjects = [
  { id: 1, name: "Project Alpha", client: "Client A", status: "In Progress", employeesAllocated: 3 },
  { id: 2, name: "Project Beta", client: "Client B", status: "Completed", employeesAllocated: 2 },
  { id: 3, name: "Project Gamma", client: "Client C", status: "Planning", employeesAllocated: 1 },
  { id: 4, name: "Project Delta", client: "Client D", status: "In Progress", employeesAllocated: 4 },
  { id: 5, name: "Project Epsilon", client: "Client E", status: "On Hold", employeesAllocated: 2 },
]

const ProjectList = () => {
  const [projects, setProjects] = useState(initialProjects)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setShowForm(true)
  }

  const handleSubmit = (formData) => {
    if (editingProject) {
      setProjects(projects.map((project) => (project.id === formData.id ? formData : project)))
    } else {
      setProjects([...projects, { ...formData, id: Date.now(), employeesAllocated: 0 }])
    }
    setShowForm(false)
    setEditingProject(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={() => setShowForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Employees Allocated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    project.status === "Completed"
                      ? "success"
                      : project.status === "In Progress"
                        ? "default"
                        : project.status === "On Hold"
                          ? "warning"
                          : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{project.employeesAllocated}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(project)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setShowForm(false)
            setEditingProject(null)
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

const ProjectForm = ({ project, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(project || { name: "", client: "", status: "Planning" })

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
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="client">Client</Label>
            <Input id="client" name="client" value={formData.client} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => handleChange({ target: { name: "status", value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">{project ? "Update" : "Add"} Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectList

