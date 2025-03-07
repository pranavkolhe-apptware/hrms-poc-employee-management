import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronRight, Briefcase, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';

const ProjectsDialog = ({ isOpen, onClose, employee }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!isOpen || !employee) return;
      
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}employee/projectsById?employeeId=${employee.employeeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isOpen, employee]);

  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {employee.employeeName}'s Projects
          </DialogTitle>
          <DialogDescription>
            View all projects this employee is assigned to
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] overflow-auto pr-4">
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-gray-500" size={24} />
              </div>
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <div key={project.id} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{project.projectName}</h3>
                    <Badge variant={project.projectType === "BILLABLE" ? "default" : "secondary"}>
                      {project.projectType}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Client</p>
                      <p>{project.client.clientName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p>{project.projectStatus}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p>{project.startDate || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p>{project.endDate || "Not set"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Client Contact</p>
                      <p>{project.client.clientContact}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-muted-foreground">No projects assigned to this employee</p>
            )}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AllotmentTable = ({ 
  currentItems, 
  expandedRows, 
  toggleRowExpansion, 
  handleEdit,
  handleDelete,
}) => {
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [expandedProjects, setExpandedProjects] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const toggleProjectExpansion = (employeeId, projectIndex) => {
    setExpandedProjects(prev => {
      const key = `${employeeId}-${projectIndex}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  const handleDeleteClick = async (allotmentId) => {
    try {
      setDeletingIds(prev => new Set([...prev, allotmentId]));
      
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/engagement/${allotmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete allotment');
      }

      toast.success('Allotment deleted successfully');
      handleDelete(allotmentId);

    } catch (error) {
      console.error('Error deleting allotment:', error);
      toast.error('Failed to delete allotment');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(allotmentId);
        return newSet;
      });
    }
  };

  const handleViewProjects = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const isDeleteDisabled = (employee, project) => {
    return employee.employeeStatus === "DEPLOYED" && project.listOfShadows?.length > 0;
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((employee) => (
              <React.Fragment key={employee.employeeId}>
                {/* Employee Row */}
                <TableRow 
                  className={cn(
                    "bg-gray-50",
                    expandedRows[employee.employeeId] ? "border-b-0" : ""
                  )}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="mr-2 h-6 w-6 p-0" 
                        onClick={() => toggleRowExpansion(employee.employeeId)}
                      >
                        {expandedRows[employee.employeeId] ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </Button>
                      {employee.employeeName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={employee.employeeStatus === "DEPLOYED" ? "default" : "secondary"}>
                      {employee.employeeStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleViewProjects(employee)}
                        title="View employee projects"
                      >
                        <Briefcase className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Projects Rows */}
                {expandedRows[employee.employeeId] && (
                  <TableRow className="bg-white">
                    <TableCell colSpan={3}>
                      <div className="pl-10">
                        <Table>
                          <TableBody>
                            {employee.listOfProjects.map((project, projectIndex) => (
                              <React.Fragment key={project.projectId}>
                                {/* Project Row */}
                                <TableRow>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center">
                                      {project.listOfShadows?.length > 0 && (
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="mr-2 h-6 w-6 p-0" 
                                          onClick={() => toggleProjectExpansion(employee.employeeId, projectIndex)}
                                        >
                                          {expandedProjects[`${employee.employeeId}-${projectIndex}`] ? 
                                            <ChevronDown className="h-4 w-4" /> : 
                                            <ChevronRight className="h-4 w-4" />
                                          }
                                        </Button>
                                      )}
                                      {project.projectName}
                                    </div>
                                  </TableCell>
                                  <TableCell colSpan={2}>
                                    <div className="flex justify-end space-x-2">
                                      <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => handleEdit(project)}
                                        title="Edit project"
                                        disabled
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => handleDeleteClick(employee.allotmentId)}
                                        className="text-destructive hover:text-destructive"
                                        title="Delete project"
                                        disabled={isDeleteDisabled(employee, project) || deletingIds.has(employee.allotmentId)}
                                      >
                                        {deletingIds.has(employee.allotmentId) ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          <Trash2 className="h-4 w-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>

                                {/* Shadow Employees Rows */}
                                {expandedProjects[`${employee.employeeId}-${projectIndex}`] && project.listOfShadows?.length > 0 && (
                                  <TableRow>
                                    <TableCell colSpan={3}>
                                      <div className="pl-10">
                                        <Table>
                                          <TableBody>
                                            {project.listOfShadows.map(shadow => (
                                              <TableRow key={shadow.allotmentId}>
                                                <TableCell className="font-medium">
                                                  {shadow.employeeName}
                                                </TableCell>
                                                <TableCell>
                                                  Allocation: {shadow.employeeAllocationPercent}%
                                                </TableCell>
                                                <TableCell>
                                                  <div className="flex justify-end space-x-2">
                                                    <Button 
                                                      variant="outline" 
                                                      size="icon" 
                                                      onClick={() => handleEdit(shadow)}
                                                      title="Edit shadow"
                                                      disabled
                                                    >
                                                      <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button 
                                                      variant="outline" 
                                                      size="icon" 
                                                      onClick={() => handleDeleteClick(shadow.allotmentId)}
                                                      className="text-destructive hover:text-destructive"
                                                      title="Delete shadow"
                                                      disabled={deletingIds.has(shadow.allotmentId)}
                                                    >
                                                      {deletingIds.has(shadow.allotmentId) ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                      ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                      )}
                                                    </Button>
                                                  </div>
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </React.Fragment>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                No allotments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ProjectsDialog
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
      />
    </>
  );
};

export default AllotmentTable;