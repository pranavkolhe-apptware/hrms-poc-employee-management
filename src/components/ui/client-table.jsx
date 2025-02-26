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

export default function ClientTable() {
  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");

  // Dummy client data
  const [clients, setClients] = useState([
    {
      id: "CLT001",
      name: "John Doe",
      projectName: "E-commerce Platform",
      companyName: "Acme Corp",
      dateAdded: new Date("2024-02-20"),
    },
    {
      id: "CLT002",
      name: "Jane Smith",
      projectName: "Mobile App Development",
      companyName: "Global Tech",
      dateAdded: new Date("2024-01-15"),
    },
    {
      id: "CLT003",
      name: "Alice Brown",
      projectName: "CRM System",
      companyName: "Innovate Ltd",
      dateAdded: new Date("2024-02-25"),
    },
  ]);

  // State for editing, adding and deletion dialogs
  const [editingClient, setEditingClient] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(null);
  const [newClient, setNewClient] = useState({ name: "", projectName: "", companyName: "" });

  // Filter clients based on search text and company filter
  const filteredClients = clients.filter((client) => {
    return (
      (client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (companyFilter === "all" ? true : client.companyName === companyFilter)
    );
  });

  // Handlers for editing, adding and deletion actions
  const handleEdit = (client) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingClient) return;

    const formData = new FormData(e.currentTarget);
    const updatedClient = {
      ...editingClient,
      name: formData.get("name"),
      projectName: formData.get("projectName"),
      companyName: formData.get("companyName"),
    };

    setClients(clients.map((c) => (c.id === updatedClient.id ? updatedClient : c)));
    toast.success("Client updated successfully");
    setIsEditDialogOpen(false);
    setEditingClient(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const id = `CLT00${clients.length + 1}`;
    setClients([...clients, { id, ...newClient, dateAdded: new Date() }]);
    toast.success("New client added successfully!");
    setIsAddDialogOpen(false);
    setNewClient({ name: "", projectName: "", companyName: "" });
  };

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

  return (
    <div className="w-full max-w-7xl mx-auto mt-5 p-4 space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search by client name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={companyFilter} onValueChange={setCompanyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {[
              ...new Set(clients.map((client) => client.companyName)),
            ].map((company) => (
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

      {/* Clients Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.projectName}</TableCell>
              <TableCell>{client.companyName}</TableCell>
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
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    name="projectName"
                    defaultValue={editingClient?.projectName}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    defaultValue={editingClient?.companyName}
                    required
                  />
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
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    name="projectName"
                    value={newClient.projectName}
                    onChange={(e) => setNewClient({ ...newClient, projectName: e.target.value })}
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
              </div>
              <DialogFooter>
                <Button type="submit" className="mt-2">Add Client</Button>
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
    </div>
  );
}