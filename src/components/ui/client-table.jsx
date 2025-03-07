"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Button } from "./button";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./dialog";
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
import { Toaster } from "react-hot-toast";

export default function ClientTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch clients from backend API instead of using dummy data
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog state for editing, adding and deletion
  const [editingClient, setEditingClient] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(null);
  // 1. Add this state at the top of your component along with other state declarations
const [isAddingClient, setIsAddingClient] = useState(false);

  // newClient state for adding a client
  const [newClient, setNewClient] = useState({
    clientName: "",
    clientContact: "",
    authorizedSignatory: "",
    clientEmail: "",
    contactNo: "",
    location: "",
  });

  // Fetch client list from API on mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_API_URL}client/listClients`)
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
        setLoading(false);
      });
  }, []);

  // Filter clients by search text (matches clientName or id)
  const filteredClients = clients.filter((client) => {
    return (
      client.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(client.id).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Edit handlers
  const handleEdit = (client) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };

  // Updated handleEditSubmit with axios.put
const handleEditSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const updatedClient = {
      id: editingClient.id, // include the id from the currently editing client
      clientName: formData.get("clientName"),
      clientContact: formData.get("clientContact"),
      authorizedSignatory: formData.get("authorizedSignatory"),
      clientEmail: formData.get("clientEmail"),
      contactNo: formData.get("contactNo"),
      location: formData.get("location"),
    };

    // Send PUT request with full payload
    await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}client/update`, updatedClient);

    // Refresh the client list after successful update
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}client/listClients`);
    setClients(data);

    toast.success("Client updated successfully");
    setIsEditDialogOpen(false);
    setEditingClient(null);
  } catch (error) {
    console.error("Update client error:", error);
    toast.error(`Failed to update client: ${error.message}`);
  }
};

  // Add handlers
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsAddingClient(true);
      console.log("newClient", newClient);
      await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}client/add`, newClient);
      
      // Refresh the client list after successful addition
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}client/listClients`);
      setClients(data);
      
      toast.success("New client added successfully!");
      setIsAddDialogOpen(false);
      setNewClient({
        clientName: "",
        clientContact: "",
        authorizedSignatory: "",
        clientEmail: "",
        contactNo: "",
        location: "",
      });
    } catch (error) {
      console.error("Add client error:", error);
      if (error.response && error.response.status === 409) {
        toast.error("Client already exists");
      } else {
        toast.error(`Failed to add client: ${error.message}`);
      }
    }finally {
      setIsAddingClient(false);
    }
  };





  // Delete handler
  const handleDelete = (clientId) => {
    setDeleteClientId(clientId);
  };

  const confirmDelete = async () => {
    if (deleteClientId) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}client/delete`, {
          params: { id: deleteClientId },
        });
        // Refresh the clients list after successful deletion
         // Immediately update local state by removing the deleted client
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== deleteClientId)
      );
      
        toast.success("Client deleted successfully!");
        setDeleteClientId(null);
      } catch (error) {
        console.error("Delete client error:", error);
        toast.error(`Failed to delete client: ${error.message}`);
      }
    }
  };

  if (loading) return <p>Loading clients...</p>;

  return (
    <div className="w-full max-w-8xl mx-auto mt-5 p-4 space-y-6">
      {/* Search Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search by client name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:max-w-xs"
        />
        {/* Uncomment below Add Client button if needed */}
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Clients Table */}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client Name</TableHead>
            <TableHead>Client Contact</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (




            <TableRow key={client.id}>
              <TableCell>{client.clientName || "N/A"}</TableCell>
              <TableCell>{client.clientContact || "N/A"}</TableCell>
              <TableCell>{client.contactNo || "N/A"}</TableCell>
              <TableCell>{client.clientEmail || "N/A"}</TableCell>
              <TableCell>{client.location || "N/A"}</TableCell>
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
            <Label htmlFor="clientName">Client Name</Label>
            <Input id="clientName" name="clientName" defaultValue={editingClient?.clientName} required />
          </div>
          <div>
            <Label htmlFor="clientContact">Client Contact</Label>
            <Input id="clientContact" name="clientContact" defaultValue={editingClient?.clientContact} required />
          </div>
          <div>
            <Label htmlFor="authorizedSignatory">Authorized Signatory</Label>
            <Input id="authorizedSignatory" name="authorizedSignatory" defaultValue={editingClient?.authorizedSignatory} required />
          </div>
          <div>
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input id="clientEmail" name="clientEmail" defaultValue={editingClient?.clientEmail} required />
          </div>
          <div>
            <Label htmlFor="contactNo">Contact Number</Label>
            <Input id="contactNo" name="contactNo" defaultValue={editingClient?.contactNo} required />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue={editingClient?.location} required />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="mt-2">
            Save Changes
          </Button>
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
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    name="clientName"
                    placeholder="Enter client name"
                    value={newClient.clientName}
                    onChange={(e) =>
                      setNewClient({ ...newClient, clientName: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clientContact">Client Contact</Label>
                  <Input
                    id="clientContact"
                    name="clientContact"
                    placeholder="Enter client contact"
                    value={newClient.clientContact}
                    onChange={(e) =>
                      setNewClient({ ...newClient, clientContact: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="authorizedSignatory">Authorized Signatory</Label>
                  <Input
                    id="authorizedSignatory"
                    name="authorizedSignatory"
                    placeholder="Enter authorized signatory"
                    value={newClient.authorizedSignatory}
                    onChange={(e) =>
                      setNewClient({ ...newClient, authorizedSignatory: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    id="clientEmail"
                    name="clientEmail"
                    placeholder="Enter client email"
                    value={newClient.clientEmail}
                    onChange={(e) =>
                      setNewClient({ ...newClient, clientEmail: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactNo">Contact Number</Label>
                  <Input
                    id="contactNo"
                    name="contactNo"
                    placeholder="Enter contact number"
                    
                    value={newClient.contactNo}
                    onChange={(e) => {
                      // Keep only digits
                      let input = e.target.value.replace(/\D/g, "");
                      // Trim to a maximum of 10 digits
                      if (input.length > 10) {
                        input = input.slice(0, 10);
                      }
                      setNewClient({ ...newClient, contactNo: input });
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter location"
                    value={newClient.location}
                    onChange={(e) =>
                      setNewClient({ ...newClient, location: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isAddingClient} className="mt-2">
                {isAddingClient ? "Loading..." : "Add Client"}
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

<Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}