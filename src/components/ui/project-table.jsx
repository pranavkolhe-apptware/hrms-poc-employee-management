


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

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { User, Users } from "lucide-react";



import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { set } from "date-fns";

export default function ProjectTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [clientFilter, setClientFilter] = useState("All");

  // Fetch projects from API (instead of using static dummy data)
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);

  // Dialog states for edit, add, deletion, and team modal
  const [editingProject, setEditingProject] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);

  const [availableClients, setAvailableClients] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [progressFilter, setProgressFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  // New project state for the add form (if needed)
  const [newProject, setNewProject] = useState({
    name: "",
    startDate: new Date().toISOString().split("T")[0],
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

        console.log("Fetched projects:", projectsResponse.data);
        console.log("Fetched clients:", clientsResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);


  // Filter projects (by project name or client name)
  // const filteredProjects = projects.filter((project) => {
  //   const projectName = project.projectName || "";
  //   const clientName = (project.client && project.client.clientName) || "";
  //   return (
  //     projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     clientName.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  // });


  const filteredProjects = projects.filter((project) => {
    const projectName = project.projectName?.toLowerCase() || "";
    const clientName = project.client?.clientName?.toLowerCase() || "";
    const matchesSearch =
      projectName.includes(searchQuery.toLowerCase()) ||
      clientName.includes(searchQuery.toLowerCase());
  
    const matchesProgress =
      progressFilter === "" || 
      progressFilter === "all" ||  // Add this line to handle "all" value
      project.projectStatus?.toUpperCase() === progressFilter.toUpperCase();
  
    const matchesType =
      typeFilter === "" || 
      typeFilter === "all" ||  // Add this line to handle "all" value
      project.projectType?.toUpperCase() === typeFilter.toUpperCase();
  
    return matchesSearch && matchesProgress && matchesType;
  });













  // Handler stubs (edit, add, delete, team modal)
  function handleEdit(project) {
    setEditingProject({
      id: project.id,
      name: project.projectName || "",
      clientId: project.client?.id?.toString() || "",
      billingType: project.billingType || "BILLABLE",
      projectStatus: project.projectStatus || "ONGOING",
      startDate: project.startDate || "",
      endDate: project.endDate || "",
    });
    setIsEditDialogOpen(true);
  }

  // Update the handleEditSubmit function:
  async function handleEditSubmit(e) {
    e.preventDefault();
    if (!editingProject) return;
    try {
      console.log("Editing project:", editingProject);
      setIsEditingProject(true);
      await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}project/update?id=${editingProject.id}`,
        {
          name: editingProject.name,
          clientId: Number(editingProject.clientId),
          billingType: editingProject.billingType,
          startDate: editingProject.startDate,
          endDate: editingProject.endDate,
          projectStatus: editingProject.projectStatus,
        }
      );
      toast.success("Project updated successfully!");
  
      // Optionally refresh your local list or re-fetch projects:
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}project/listProjects`
      );
      setProjects(data);
  
      setIsEditDialogOpen(false);
      setEditingProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    }finally{
      setIsEditingProject(false);
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
     setIsAddingProject(true); 
      await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}project/add`, newProject);
      toast.success("New project added successfully!");
      console.log("New projectjjj:", newProject);
      setIsAddDialogOpen(false);
      // Optionally refresh the projects list:
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}project/listProjects`);
      setProjects(data);
      // Reset form state
      setNewProject({
        name: "",
        clientId: "",
        billingType: "",
        endDate: "",
        startDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project!");
    }finally{
      setIsAddingProject(false);
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

  const openTeamModal = async (project) => {
    setModalProject(project);
    setIsTeamModalOpen(true);
    setIsLoadingTeam(true);
  
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_API_URL}employee/byProject?projectId=${project.id}`
    );
    setTeamMembers(response.data);
  } catch (error) {
    console.error("Error fetching team data:", error);
    toast.error("Failed to load team members");
  } finally {
    setIsLoadingTeam(false);
  }
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


        {/* {/* Filter by Progress} */}
  <Select value={progressFilter} onValueChange={setProgressFilter}>
    <SelectTrigger className="w-40">
      <SelectValue placeholder="Filter by Progress" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="ONGOING">Ongoing</SelectItem>
      <SelectItem value="COMPLETED">Completed</SelectItem>
    </SelectContent>
  </Select> 





  {/* Filter by Project Type */}
  <Select value={typeFilter} onValueChange={setTypeFilter}>
    <SelectTrigger className="w-40">
      <SelectValue placeholder="Filter by Project Type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All</SelectItem>
      <SelectItem value="BILLABLE">Billable</SelectItem>
      <SelectItem value="NON_BILLABLE">Non-Billable</SelectItem>
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
            <TableHead>Progress</TableHead>
            <TableHead>Project Type</TableHead>
            <TableHead>View Team</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Actions</TableHead>
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
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <Label htmlFor="editName">Project Name</Label>
      <Input
        id="editName"
        value={editingProject?.name}
        onChange={(e) =>
          setEditingProject({ ...editingProject, name: e.target.value })
        }
        required
      />
    </div>


    {/* <div>
      <Label htmlFor="editClientId">Client Name</Label>
      <Select
        value={editingProject?.clientId}
        onValueChange={(value) =>
          setEditingProject({ ...editingProject, clientId: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Client" />
        </SelectTrigger>
        <SelectContent>
          {availableClients.map((client) => (
            <SelectItem key={client.id} value={client.id.toString()}>
              {client.clientName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div> */}




    <div>
      <Label htmlFor="editBillingType">Billing Type</Label>
      <Select
        value={editingProject?.billingType}
        onValueChange={(value) =>
          setEditingProject({ ...editingProject, billingType: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Billing Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BILLABLE">BILLABLE</SelectItem>
          <SelectItem value="NON_BILLABLE">NON_BILLABLE</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label htmlFor="editStartDate">Start Date</Label>
      <DatePicker
        id="editStartDate"
        selected={
          editingProject?.startDate && !isNaN(Date.parse(editingProject.startDate))? new Date(editingProject.startDate) : null
        }
        onChange={(date) =>
          setEditingProject({
            ...editingProject,
            startDate: date.toISOString().split("T")[0],
          })
        }
        dateFormat="yyyy-MM-dd"
        placeholderText="Select Start Date"
        required
      />
    </div>

    <div>
      <Label htmlFor="editEndDate">End Date</Label>
      <DatePicker
        id="editEndDate"
        selected={
          editingProject?.endDate ? new Date(editingProject.endDate) : null
        }
        onChange={(date) =>
          setEditingProject({
            ...editingProject,
            endDate: date.toISOString().split("T")[0],
          })
        }
        dateFormat="yyyy-MM-dd"
        placeholderText="Select End Date"
        required
      />
    </div>
  </div>

  {/* Optionally keep Project Status here, if you still want it */}
  <div className="mt-4">
    <Label htmlFor="projectStatus">Progress</Label>
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

  <DialogFooter className="mt-4">
    <Button type="submit" disabled={isEditingProject}>
      {{isEditingProject} ? "Save Changes":"Saving changes ..."  }  </Button>
  </DialogFooter>
</form>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Dialog (Placeholder) */}
      {/* // 3. Update the Add Dialog form in your component as follows: */}
      





      {/* Add Dialog */}
{isAddDialogOpen && (
  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Project</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleAddSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Project Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter project name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <Label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
              Client Name
            </Label>
            <Select
              value={newProject.clientId}
              onValueChange={(value) =>
                setNewProject({ ...newProject, clientId: value })
              }
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {availableClients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.clientName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="billingType" className="block text-sm font-medium text-gray-700">
              Billing Type
            </Label>
            <Select
              value={newProject.billingType}
              onValueChange={(value) =>
                setNewProject({ ...newProject, billingType: value })
              }
            >
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select Billing Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BILLABLE">BILLABLE</SelectItem>
                <SelectItem value="NON_BILLABLE">NON_BILLABLE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </Label>
            <DatePicker
              id="startDate"
              selected={newProject.startDate ? new Date(newProject.startDate) : null}
              onChange={(date) =>
                setNewProject({ ...newProject, startDate: date.toISOString().split("T")[0] })
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Start Date"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </Label>
            <DatePicker
              id="endDate"
              selected={newProject.endDate ? new Date(newProject.endDate) : null}
              onChange={(date) =>
                setNewProject({ ...newProject, endDate: date.toISOString().split("T")[0] })
              }
              dateFormat="yyyy-MM-dd"
              placeholderText="Select End Date"
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button type="submit" className="w-full sm:w-auto" disabled={isAddingProject} >
            {isAddingProject ? "Adding Project..." : "Add Project"}
          </Button>
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
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {modalProject.projectName} - Project Team
        </DialogTitle>
      </DialogHeader>
      
      {isLoadingTeam ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No team members assigned to this project yet.</p>
        </div>
      ) : (
        <div className="space-y-4 my-2">
          {teamMembers.map((member) => (
            <Card key={member.allotmentId} className="border rounded-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback>{member.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.employeeName}</div>
                    <Badge variant={member.employeeStatus === "DEPLOYED" ? "default" : "outline"} className="text-xs mt-2 mb-2">
                      {member.employeeStatus}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              
              {member.listOfShadows && member.listOfShadows.length > 0 && (
                <CardContent className="pt-0">
                  <Accordion type="single" collapsible className="w-full no-underline">
                    <AccordionItem value="shadows" className="">
                      <AccordionTrigger className="text-sm py-2 hover:no-underline">
                        Shadow Team ({member.listOfShadows.length})
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-6 border-l-2 border-muted">
                          {member.listOfShadows.map((shadow) => (
                            <div key={shadow.allotmentId} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                              <Avatar className="h-7 w-7 bg-muted-foreground/70">
                                <AvatarFallback>{shadow.employeeName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium">{shadow.employeeName}</div>
                                <div className="text-xs text-muted-foreground">Allocation: {shadow.employeeAllocationPercent}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
      
      <DialogFooter>
        {/* <Button variant="link" onClick={() => (window.location.href = `/projects/${modalProject.id}`)}>
          View Full Project Details
        </Button> */}
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}


    </div>
  );
}