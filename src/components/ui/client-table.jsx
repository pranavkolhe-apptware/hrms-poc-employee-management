

"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Button } from "./button";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
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
import { useNavigate } from "react-router-dom";

export default function ClientTable() {
  // Search/filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const navigate = useNavigate();

  // Dummy client data (projects as an array of strings)
  const [clients, setClients] = useState([
    {
      id: "CLT001",
      name: "John Doe",
      projects: ["E-commerce Platform", "Analytics Dashboard"],
      companyName: "Acme Corp",
      dateAdded: new Date("2024-02-20"),
    },
    {
      id: "CLT002",
      name: "Jane Smith",
      projects: ["Mobile App Development"],
      companyName: "Global Tech",
      dateAdded: new Date("2024-01-15"),
    },
    {
      id: "CLT003",
      name: "Alice Brown",
      projects: ["CRM System", "Content Management System"],
      companyName: "Innovate Ltd",
      dateAdded: new Date("2024-02-25"),
    },
  ]);

  // Dialog states for editing, adding and deletion
  const [editingClient, setEditingClient] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(null);
  // newClient.projects will be entered as a comma-separated string
  const [newClient, setNewClient] = useState({ name: "", projects: "", companyName: "" });

  // NEW STATE: for Projects Modal
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const [modalClient, setModalClient] = useState(null);

  // Filter clients by search text and company filter
  const filteredClients = clients.filter((client) => {
    return (
      (client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (companyFilter === "all" ? true : client.companyName === companyFilter)
    );
  });

  // Edit handlers
  const handleEdit = (client) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingClient) return;
    const formData = new FormData(e.currentTarget);
    const projectsArr = formData
      .get("projects")
      .toString()
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p !== "");
    const updatedClient = {
      ...editingClient,
      name: formData.get("name"),
      projects: projectsArr,
      companyName: formData.get("companyName"),
    };
    setClients(clients.map((c) => (c.id === updatedClient.id ? updatedClient : c)));
    toast.success("Client updated successfully");
    setIsEditDialogOpen(false);
    setEditingClient(null);
  };

  // Add handlers
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const id = `CLT00${clients.length + 1}`;
    const projectsArr = newClient.projects
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p !== "");
    setClients([...clients, { id, ...newClient, projects: projectsArr, dateAdded: new Date() }]);
    toast.success("New client added successfully!");
    setIsAddDialogOpen(false);
    setNewClient({ name: "", projects: "", companyName: "" });
  };

  // Delete handlers
  const handleDelete = (clientId) => {
    setDeleteClientId(clientId);
  };

  const confirmDelete = () => {
    if (deleteClientId) {
      setClients(clients.filter((c) => c.id !== deleteClientId));
      toast.success("Client deleted successfully!");
      setDeleteClientId(null);
    }
  };

  // Projects Modal handler
  const openProjectsModal = (client) => {
    setModalClient(client);
    setProjectsModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-5 p-4 space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search by client name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:max-w-xs"
        />
        <div className="flex items-center gap-4">
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {[...new Set(clients.map((client) => client.companyName))].map((company) => (
                <SelectItem key={company} value={company}>
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Clients Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Projects</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.companyName}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => openProjectsModal(client)}>
                  View
                </Button>
              </TableCell>
              <TableCell>{format(client.dateAdded, "MMM dd, yyyy")}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Button onClick={() => handleEdit(client)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(client.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
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
              <DialogTitle>Edit Client</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Client Name</Label>
                  <Input id="name" name="name" defaultValue={editingClient?.name} required />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" name="companyName" defaultValue={editingClient?.companyName} required />
                </div>
                <div>
                  <Label htmlFor="projects">Projects</Label>
                  <Input
                    id="projects"
                    name="projects"
                    defaultValue={editingClient?.projects.join(", ")}
                    placeholder="Enter projects separated by commas"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="mt-2">Save Changes</Button>
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
              <DialogTitle>Add Client</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Client Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={newClient.companyName}
                    onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="projects">Projects</Label>
                  <Input
                    id="projects"
                    name="projects"
                    value={newClient.projects}
                    onChange={(e) => setNewClient({ ...newClient, projects: e.target.value })}
                    placeholder="Enter projects separated by commas"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="mt-2">
                  Add Client
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation AlertDialog */}
      {deleteClientId && (
        <AlertDialog
          open={!!deleteClientId}
          onOpenChange={(open) => {
            if (!open) setDeleteClientId(null);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Client</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="py-4">Are you sure you want to delete this client?</div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Projects Modal Dialog */}
      {projectsModalOpen && modalClient && (
        <Dialog open={projectsModalOpen} onOpenChange={setProjectsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{modalClient.name} - Projects</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {modalClient.projects.map((proj, index) => (
                <div key={index} className="p-2 border rounded-md">
                  {proj}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="link" onClick={() => navigate(`/clients/${modalClient.id}`)}>
                View More Details
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}