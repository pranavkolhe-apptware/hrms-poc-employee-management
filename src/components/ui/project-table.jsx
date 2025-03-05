


"use client";

import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProjectTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState("all");

  // Fetch projects from API (instead of using static dummy data)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog states for edit, add, deletion, and team modal
  const [editingProject, setEditingProject] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  const [availableClients, setAvailableClients] = useState([]);

  // New project state for the add form (if needed)
  const [newProject, setNewProject] = useState({
    name: "",
    endDate: "",
    clientId: "",
    billingType: ""
  });

  // Fetch projects from the API on mount
  useEffect(() => {
    const fetchClients = axios.get(`${import.meta.env.VITE_BACKEND_API_URL}client/listClients`);
    const fetchProjects = axios.get(`${import.meta.env.VITE_BACKEND_API_URL}project/listProjects`);

    Promise.all([fetchClients, fetchProjects])
      .then(([clientsResponse, projectsResponse]) => {
        setAvailableClients(clientsResponse.data);
        setProjects(projectsResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);


  // Filter projects (by project name or client name)
  const filteredProjects = projects.filter((project) => {
    const projectName = project.projectName || "";
    const clientName = (project.client && project.client.clientName) || "";
    return (
      projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handler stubs (edit, add, delete, team modal)
  const handleEdit = (project) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  // Update the handleEditSubmit function:
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_API_URL}project/${editingProject.id}/updateStatus?status=${editingProject.projectStatus}`
      );
      toast.success("Project status updated successfully!");

      // Update local state
      setProjects(projects.map(project =>
        project.id === editingProject.id
          ? { ...project, projectStatus: editingProject.projectStatus }
          : project
      ));

      setIsEditDialogOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update project status");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}project/add`, newProject);
      toast.success("New project added successfully!");
      console.log("New project:", newProject);
      setIsAddDialogOpen(false);
      // Optionally refresh the projects list:
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}project/listProjects`);
      setProjects(data);
      // Reset form state
      setNewProject({
        name: "",
        clientId: "",
        billingType: "",
        endDate: ""
      });
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project!");
    }
  };

  const handleDelete = (projectId) => {
    // Placeholder delete handler
    setDeleteProjectId(projectId);
  };

  const confirmDelete = async () => {
    if (deleteProjectId) {
      try {
        // Call DELETE API
        await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}project/delete?id=${deleteProjectId}`);

        // Update local state only after successful API call
        setProjects(projects.filter((prj) => prj.id !== deleteProjectId));
        toast.success("Project deleted successfully");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete project");
      } finally {
        setDeleteProjectId(null); // Reset delete state
      }
    }
  };

  const openTeamModal = (project) => {
    setModalProject(project);
    setIsTeamModalOpen(true);
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="w-full max-w-8xl mx-auto mt-5 p-4 space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search by project name or client name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:max-w-xs"
        />
        <Select value={clientFilter} onValueChange={setClientFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by client" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {/* Optional: Map valid client names */}
          </SelectContent>
        </Select>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects Table */}

      <Table >
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Project Type</TableHead>
            <TableHead>View Team</TableHead>
            <TableHead>Start Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.projectName}</TableCell>
              <TableCell>{project.client?.clientName || "N/A"}</TableCell>
              <TableCell>
                <Badge
                  className={
                    project.projectStatus.toLowerCase() === "ongoing"
                      ? "bg-blue-500"
                      : "bg-green-600"
                  }
                >
                  {project.projectStatus}
                </Badge>
              </TableCell>
              <TableCell>{project.projectType}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => openTeamModal(project)}>
                  View Team
                </Button>
              </TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell className="flex items-center gap-2">
                <div className="">
                  <Button onClick={() => handleEdit(project)} >
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
                <div className="">
                  <Button variant="destructive" onClick={() => handleDelete(project.id)} >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      {/* Edit Dialog (Placeholder) */}
      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>

              <div>
                <Label htmlFor="projectStatus">Status</Label>
                <Select
                  value={editingProject?.projectStatus}
                  onValueChange={(value) =>
                    setEditingProject({ ...editingProject, projectStatus: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ONGOING">ONGOING</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" className="mt-3">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Dialog (Placeholder) */}
      {/* // 3. Update the Add Dialog form in your component as follows: */}
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
                    onChange={(e) =>
                      setNewProject({ ...newProject, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <DatePicker
                    id="endDate"
                    selected={newProject.endDate ? new Date(newProject.endDate) : null}
                    onChange={(date) =>
                      setNewProject({ ...newProject, endDate: date.toISOString().split("T")[0] })
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select End Date"
                    className="input" // Adjust or remove based on your styling
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clientId">Client Name</Label>
                  <Select
                    value={newProject.clientId}
                    onValueChange={(value) =>
                      setNewProject({ ...newProject, clientId: value })
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableClients.map((client) => (
                        <SelectItem
                          key={client.id}
                          value={client.id.toString()}
                        >
                          {client.clientName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="billingType">Billing Type</Label>
                  <Select
                    value={newProject.billingType}
                    onValueChange={(value) =>
                      setNewProject({ ...newProject, billingType: value })
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select Billing Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BILLABLE">BILLABLE</SelectItem>
                      <SelectItem value="NON_BILLABLE">NON_BILLABLE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Project</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}


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

      {/* Project Team Modal (unchanged from before) */}
      {isTeamModalOpen && modalProject && (
        <Dialog open={isTeamModalOpen} onOpenChange={setIsTeamModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{modalProject.projectName} - Project Team</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
              <p>Static team view content goes here.</p>
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