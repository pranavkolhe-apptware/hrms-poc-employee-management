
"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Button } from "./button";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Badge } from "./badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Label } from "./label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

// Dummy project data – note the new fields "client" and "teams"
const dummyProjects = [
  {
    id: "PRJ001",
    name: "E-commerce Platform",
    status: "ongoing",
    client: "Acme Corp",
    teams: ["Team A", "Team B"],
    dateAdded: new Date("2024-02-20"),
  },
  {
    id: "PRJ002",
    name: "Mobile App Development",
    status: "completed",
    client: "Global Tech",
    teams: ["Team C"],
    dateAdded: new Date("2024-01-15"),
  },
  {
    id: "PRJ003",
    name: "CRM System",
    status: "completed",
    client: "Innovate Ltd",
    teams: ["Team D", "Team E"],
    dateAdded: new Date("2024-02-25"),
  },
  {
    id: "PRJ004",
    name: "Farmer App",
    status: "ongoing",
    client: "Acme Corp",
    teams: ["Team D", "Team E"],
    dateAdded: new Date("2024-02-25"),
  },
];

// Dummy clients list for the dropdown
const allClients = ["Acme Corp", "Global Tech", "Innovate Ltd"];

export default function ProjectTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState("all");

  const [projects, setProjects] = useState(dummyProjects);

  // Dialog states for edit, add, and deletion
  const [editingProject, setEditingProject] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  // Dialog state for project team modal
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  // New project state from the add form
  const [newProject, setNewProject] = useState({
    name: "",
    status: "ongoing",
    client: "",
  });

  // Filter the projects based on search and client filter
  const filteredProjects = projects.filter((project) => {
    return (
      (project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (clientFilter === "all" ? true : project.client === clientFilter)
    );
  });

  // Handlers for edit, add, delete, and team view
  const handleEdit = (project) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingProject) return;
    const formData = new FormData(e.currentTarget);
    const updatedProject = {
      ...editingProject,
      name: formData.get("name"),
      status: formData.get("status"),
      client: formData.get("client"),
    };
    setProjects(projects.map((prj) => (prj.id === updatedProject.id ? updatedProject : prj)));
    toast.success("Project updated successfully");
    setIsEditDialogOpen(false);
    setEditingProject(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const id = `PRJ00${projects.length + 1}`;
    setProjects([...projects, { id, ...newProject, dateAdded: new Date(), teams: [] }]);
    toast.success("New project added successfully!");
    setIsAddDialogOpen(false);
    setNewProject({
      name: "",
      status: "ongoing",
      client: "",
    });
  };

  const handleDelete = (projectId) => {
    setDeleteProjectId(projectId);
  };

  const confirmDelete = () => {
    if (deleteProjectId) {
      setProjects(projects.filter((prj) => prj.id !== deleteProjectId));
      toast.success("Project deleted successfully");
      setDeleteProjectId(null);
    }
  };

  const openTeamModal = (project) => {
    setModalProject(project);
    setIsTeamModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-5 p-4 space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* <Input
          placeholder="Search by project name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:max-w-xs"
        /> */}
        <Select value={clientFilter} onValueChange={setClientFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {allClients.map((client) => (
              <SelectItem key={client} value={client}>
                {client}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>View Project Team</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>
                <Badge className={project.status === "ongoing" ? "bg-blue-500" : "bg-green-600"}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => openTeamModal(project)}>
                  View Project Team
                </Button>
              </TableCell>
              <TableCell>{format(project.dateAdded, "dd-MM-yyyy")}</TableCell>
              <TableCell className="flex items-center gap-2">
              <div className="cursor-not-allowed hover:cursor-[block]">
                <Button onClick={() => handleEdit(project)} disabled>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
              <div className="cursor-not-allowed hover:cursor-[block]">
                <Button variant="destructive" onClick={() => handleDelete(project.id)} disabled>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" name="name" defaultValue={editingProject?.name} required />
                </div>
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Select
                    value={editingProject?.client}
                    onValueChange={(value) => setEditingProject({ ...editingProject, client: value })}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {allClients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="client" value={editingProject?.client} />
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <Input
                        type="radio"
                        name="status"
                        value="ongoing"
                        checked={editingProject?.status === "ongoing"}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, status: e.target.value })
                        }
                        className="w-4 h-4"
                      />
                      Ongoing
                    </label>
                    <label className="flex items-center gap-2">
                      <Input
                        type="radio"
                        name="status"
                        value="completed"
                        checked={editingProject?.status === "completed"}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, status: e.target.value })
                        }
                        className="w-4 h-4"
                      />
                      Completed
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Dialog */}
      {isAddDialogOpen && (
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Select value={newProject.client} onValueChange={(value) => setNewProject({ ...newProject, client: value })}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {allClients.map((client) => (
                        <SelectItem key={client} value={client}>
                          {client}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="client" value={newProject.client} />
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <Input
                        type="radio"
                        name="status"
                        value="ongoing"
                        checked={newProject.status === "ongoing"}
                        onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                        className="w-4 h-4"
                      />
                      Ongoing
                    </label>
                    <label className="flex items-center gap-2">
                      <Input
                        type="radio"
                        name="status"
                        value="completed"
                        checked={newProject.status === "completed"}
                        onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                        className="w-4 h-4"
                      />
                      Completed
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" >Add Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation AlertDialog */}
      {deleteProjectId && (
        <AlertDialog
          open={!!deleteProjectId}
          onOpenChange={(open) => {
            if (!open) setDeleteProjectId(null);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="py-4">Are you sure you want to delete this project?</div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Project Team Modal */}
      {isTeamModalOpen && modalProject && (
        <Dialog open={isTeamModalOpen} onOpenChange={setIsTeamModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{modalProject.name} - Project Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {modalProject.teams.length > 0 ? (
                modalProject.teams.map((team, index) => (
                  <div key={index} className="p-2 border rounded-md">
                    {team}
                  </div>
                ))
              ) : (
                <p>No teams assigned.</p>
              )}
            </div>
            <DialogFooter>
              <Button variant="link" onClick={() => (window.location.href = `/projects/${modalProject.id}`)}>
                View More Details
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}