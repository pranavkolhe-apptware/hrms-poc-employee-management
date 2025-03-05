import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import {
  Pencil,
  Trash2,
  PlusCircle,
  Eye,
  ChevronDown,
  ChevronRight,
  BriefcaseIcon,
  AlertCircle,
  Loader2,
  Users,
  CheckIcon,
  ChevronsUpDown
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Slider } from "./ui/slider";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const ITEMS_PER_PAGE = 7;
const API_BASE_URL = "https://hrms-au5y.onrender.com";

const AllotmentList = () => {
  const [projectEmployees, setProjectEmployees] = useState({});
  const [employeeEngagements, setEmployeeEngagements] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingAllotment, setEditingAllotment] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [viewingEngagements, setViewingEngagements] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingEngagements, setLoadingEngagements] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoadingEmployees(true);
        const response = await fetch(`${API_BASE_URL}/employee/listEmployees`);
        if (!response.ok) {
          throw new Error(`Failed to fetch employees: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch employees");
        toast({
          title: "Error",
          description: "Failed to load employees. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const response = await fetch(`${API_BASE_URL}/project/listProjects`);
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch projects");
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingProjects(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Fetch project employees and build engagements
  useEffect(() => {
    const fetchProjectEmployees = async () => {
      if (loadingProjects || projects.length === 0) return;
      
      try {
        setLoadingEngagements(true);
        
        // Create a map to store employees by project
        const projectEmployeesMap = {};
        const allEngagements = [];
        
        // Fetch employees for each project
        for (const project of projects) {
          try {
            const response = await fetch(`${API_BASE_URL}/employee/byProject?projectId=${project.id}`);
            if (!response.ok) {
              console.warn(`Failed to fetch employees for project ${project.id}: ${response.status}`);
              continue;
            }
            
            const employees = await response.json();
            projectEmployeesMap[project.id] = employees;
            
            // Create engagement objects for each employee in this project
            employees.forEach(employee => {
              // Create a unique ID for this engagement
              const engagementId = `${employee.id}_${project.id}`;
              
              // Determine if this is a shadow employee based on status
              const isShadow = employee.status === "NON_BILLABLE";
              
              // Create the engagement object
              const engagement = {
                id: engagementId,
                employeeId: employee.id,
                projectId: project.id,
                engagementStatus: isShadow ? "SHADOW" : "DEPLOYED",
                allocationPercent: 100, // Default value
                workLocation: "Onsite", // Default value
                projectJoiningDate: employee.dateOfJoining,
                // If this is a shadow employee and has a reporting manager, set the reporting resource
                reportingResource: isShadow && employee.reportingManager ? 
                  `${employee.reportingManager.id}_${project.id}` : null
              };
              
              allEngagements.push(engagement);
            });
          } catch (err) {
            console.error(`Error fetching employees for project ${project.id}:`, err);
          }
        }
        
        setProjectEmployees(projectEmployeesMap);
        setEmployeeEngagements(allEngagements);
      } catch (err) {
        console.error("Error fetching project employees:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch project employees");
        toast({
          title: "Error",
          description: "Failed to load employee engagements. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoadingEngagements(false);
      }
    };

    fetchProjectEmployees();
  }, [projects, loadingProjects]);

  const handleDelete = async (id) => {
    // In a real implementation, you would call an API to delete the engagement
    try {
      // Mock implementation for now
      setEmployeeEngagements(employeeEngagements.filter((engagement) => engagement.id !== id));
      toast({
        title: "Success",
        description: "Project allocation removed successfully",
      });
    } catch (err) {
      console.error("Error deleting engagement:", err);
      toast({
        title: "Error",
        description: "Failed to delete project allocation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (engagement) => {
    setEditingAllotment(engagement);
    setShowForm(true);
  };

  const handleView = (employeeId) => {
    const employee = employees.find((e) => e.id === employeeId);
    if (employee) {
      setViewingEmployee(employee);

      // Get all engagements for this employee
      const employeeEngagements = employeeEngagements.filter((e) => e.employeeId === employeeId);
      setViewingEngagements(employeeEngagements);

      setShowViewModal(true);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setFormSubmitting(true);

      // Format date to YYYY-MM-DD for API
      let formattedDate = formData.startDate;
      if (formData.startDate && formData.startDate.includes("-")) {
        // Ensure date is in YYYY-MM-DD format
        if (formData.startDate.split("-")[0].length === 2) {
          // Convert from DD-MM-YYYY to YYYY-MM-DD
          const [day, month, year] = formData.startDate.split("-");
          formattedDate = `${year}-${month}-${day}`;
        }
      }

      // Prepare the data for the API
      const apiData = {
        projectId: formData.projectId,
        employeeId: formData.employeeId,
        workLocation: formData.workLocation,
        allocationPercent: formData.allocationPercentage,
        projectJoiningDate: formattedDate,
        engagementStatus: formData.status,
      };

      // Add reportingResource only if status is SHADOW and we have a valid ID
      if (formData.status === "SHADOW" && formData.reportingResource) {
        // Extract the employee ID from the reporting resource
        const parts = formData.reportingResource.split("_");
        if (parts.length > 0) {
          const reportingResourceId = parseInt(parts[0], 10);
          if (!isNaN(reportingResourceId)) {
            apiData.reportingResource = reportingResourceId;
          }
        }
      }

      console.log("Sending API data:", apiData);

      // Call the API to assign the project
      const response = await fetch(`${API_BASE_URL}/employee/assignProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed to assign project: ${response.status}`);
      }

      const result = await response.text();

      // Update the UI with the new assignment
      // In a real scenario, you'd fetch the updated data from the API
      if (editingAllotment) {
        setEmployeeEngagements(
          employeeEngagements.map((engagement) =>
            engagement.id === formData.id ? { ...formData, id: engagement.id } : engagement,
          ),
        );
      } else {
        const newEngagement = {
          ...formData,
          id: Date.now().toString(), // This is a temporary ID, in a real app would come from API
          engagementStatus: formData.status,
          allocationPercent: formData.allocationPercentage,
        };
        setEmployeeEngagements([...employeeEngagements, newEngagement]);
      }

      toast({
        title: "Success",
        description: result || "Project assigned successfully",
      });

      setShowForm(false);
      setEditingAllotment(null);
      
      // Refresh the data after successful assignment
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("Error assigning project:", err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to assign project",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find((e) => e.id === employeeId);
    return employee ? employee.name : "Unknown";
  };

  const getProjectName = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    return project ? project.projectName : "Unknown Project";
  };

  const toggleRowExpansion = (engagementId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [engagementId]: !prev[engagementId],
    }));
  };

  // Get shadow employees for a specific reporting resource
  const getShadowEmployeesFor = (reportingResourceId) => {
    return employeeEngagements.filter((e) => e.reportingResource === reportingResourceId);
  };

  // Check if an employee has shadows
  const hasShadowEmployees = (engagementId) => {
    return employeeEngagements.some((e) => e.reportingResource === engagementId);
  };

  // Get deployed employees for shadow selection
  const getDeployedEmployeesForSelect = () => {
    return employeeEngagements
      .filter(engagement => engagement.engagementStatus === "DEPLOYED")
      .map((engagement) => {
        const employee = employees.find((e) => e.id === engagement.employeeId);
        return {
          engagementId: engagement.id,
          employeeId: engagement.employeeId,
          name: employee ? employee.name : "Unknown",
          project: getProjectName(engagement.projectId),
        };
      });
  };

  // Filter engagements based on status
  const filteredEngagements =
    filter === "all" ? employeeEngagements : employeeEngagements.filter((e) => e.engagementStatus === filter);

  // Get top-level engagements (not shadows or deployed based on filter)
  const topLevelEngagements =
    filter === "SHADOW"
      ? filteredEngagements // For shadow filter, show all shadow employees
      : filteredEngagements.filter(
          (e) =>
            filter === "DEPLOYED"
              ? e.engagementStatus === "DEPLOYED"
              : e.engagementStatus === "DEPLOYED" || !e.reportingResource, // For "all" filter
        );

  // Calculate total pages
  const totalPages = Math.ceil(topLevelEngagements.length / ITEMS_PER_PAGE);

  // Get current page items
  const currentItems = topLevelEngagements.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const isLoading = loadingEmployees || loadingProjects || loadingEngagements;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-full max-w-md">
          <Progress value={undefined} className="h-2 mb-4" />
          <p className="text-center text-gray-500">Loading project allocations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md max-w-md">
          <p className="font-medium">Error loading data</p>
          <p className="text-sm">{error}</p>
          <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Project Allocations</h2>
        <div className="flex space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] border-input hover:border-neutral-400 transition-colors">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="DEPLOYED">Deployed</SelectItem>
              <SelectItem value="SHADOW">Shadow</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Assign Project
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Allocation %</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((engagement) => (
                <React.Fragment key={engagement.id}>
                  <TableRow
                    className={cn(
                      hasShadowEmployees(engagement.id) ? "bg-gray-50 dark:bg-blue-950/30" : "",
                      expandedRows[engagement.id] ? "border-b-0" : "",
                    )}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {hasShadowEmployees(engagement.id) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mr-2 h-6 w-6 p-0"
                            onClick={() => toggleRowExpansion(engagement.id)}
                          >
                            {expandedRows[engagement.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        {getEmployeeName(engagement.employeeId)}
                      </div>
                    </TableCell>
                    <TableCell>{getProjectName(engagement.projectId)}</TableCell>
                    <TableCell>
                      <Badge variant={engagement.engagementStatus === "DEPLOYED" ? "default" : "secondary"}>
                        {engagement.engagementStatus === "DEPLOYED" ? "Deployed" : "Shadow"}
                      </Badge>
                    </TableCell>
                    <TableCell>{engagement.allocationPercent}%</TableCell>
                    <TableCell>{engagement.workLocation}</TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleView(engagement.employeeId)}
                          title="View employee projects"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(engagement)}
                          title="Edit engagement"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(engagement.id)}
                          className="text-destructive hover:text-destructive"
                          title="Delete engagement"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Shadow Employees Accordion */}
                  {expandedRows[engagement.id] && hasShadowEmployees(engagement.id) && (
                    <TableRow className="bg-white dark:bg-blue-950/20">
                      <TableCell colSpan={6} className="p-0">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="shadow-employees" className="border-0">
                            <AccordionTrigger className="py-2 px-4 hover:no-underline">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="mr-2 h-4 w-4" />
                                Shadow Employees
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-10 mt-[-7px] mb-[-7px]">
                                <Table>
                                  <TableBody className="py-0">
                                    {getShadowEmployeesFor(engagement.id).map((shadowEngagement) => (
                                      <TableRow key={shadowEngagement.id}>
                                        <TableCell className="font-medium">
                                          {getEmployeeName(shadowEngagement.employeeId)}
                                        </TableCell>
                                        <TableCell>{getProjectName(shadowEngagement.projectId)}</TableCell>
                                        <TableCell>
                                          <Badge variant="secondary">Shadow</Badge>
                                        </TableCell>
                                        <TableCell>{shadowEngagement.allocationPercent}%</TableCell>
                                        <TableCell>{shadowEngagement.workLocation}</TableCell>
                                        <TableCell>
                                          <div className="flex justify-center space-x-2">
                                            <Button
                                              variant="outline"
                                              size="icon"
                                              onClick={() => handleEdit(shadowEngagement)}
                                              title="Edit engagement"
                                            >
                                              <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                              variant="outline"
                                              size="icon"
                                              onClick={() => handleDelete(shadowEngagement.id)}
                                              className="text-destructive hover:text-destructive"
                                              title="Delete engagement"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  {employeeEngagements.length === 0 ? (
                    <div className="flex flex-col items-center gap-2">
                      <BriefcaseIcon className="h-8 w-8 opacity-40" />
                      <p>No project allocations found</p>
                      <Button variant="outline" size="sm" onClick={() => setShowForm(true)} className="mt-2">
                        Assign a project
                      </Button>
                    </div>
                  ) : (
                    "No allocations match the current filter"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              &lt;
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              &gt;
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Engagement Form */}
      {showForm && (
        <AllotmentForm
          allotment={editingAllotment}
          employees={employees}
          projects={projects}
          deployedEmployees={getDeployedEmployeesForSelect()}
          onClose={() => {
            setShowForm(false);
            setEditingAllotment(null);
          }}
          onSubmit={handleSubmit}
          isSubmitting={formSubmitting}
        />
      )}

      {/* View Employee Projects Modal */}
      {showViewModal && viewingEmployee && (
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">{viewingEmployee.name}'s Projects</DialogTitle>
              <DialogDescription>View all projects this employee is assigned to</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[400px] overflow-auto pr-4">
              <div className="space-y-4">
                {viewingEngagements.length > 0 ? (
                  viewingEngagements.map((engagement) => (
                    <div key={engagement.id} className="border rounded-md p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{getProjectName(engagement.projectId)}</h3>
                        <Badge variant={engagement.engagementStatus === "DEPLOYED" ? "default" : "secondary"}>
                          {engagement.engagementStatus === "DEPLOYED" ? "Deployed" : "Shadow"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Start Date</p>
                          <p>{engagement.projectJoiningDate || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Allocation</p>
                          <p>{engagement.allocationPercent}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p>{engagement.workLocation}</p>
                        </div>
                        {engagement.engagementStatus === "SHADOW" && engagement.reportingResource && (
                          <div className="col-span-2">
                            <p className="text-muted-foreground">Shadow of</p>
                            <p>
                              {getEmployeeName(
                                employeeEngagements.find((e) => e.id === engagement.reportingResource)?.employeeId || 0,
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-muted-foreground">No projects assigned to this employee</p>
                )}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const AllotmentForm = ({ allotment, employees, projects, deployedEmployees, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState(
    allotment || {
      id: 0,
      employeeId: 0,
      projectId: 0,
      startDate: new Date().toISOString().split("T")[0],
      allocationPercentage: 100,
      status: "DEPLOYED",
      reportingResource: null,
      workLocation: "Onsite",
    },
  );

  const [openEmployeeCombobox, setOpenEmployeeCombobox] = useState(false);
  const [openProjectCombobox, setOpenProjectCombobox] = useState(false);
  const [openShadowCombobox, setOpenShadowCombobox] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId) {
      newErrors.employeeId = "Employee is required";
    }

    if (!formData.projectId) {
      newErrors.projectId = "Project is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.workLocation) {
      newErrors.workLocation = "Work location is required";
    }

    if (formData.status === "SHADOW" && !formData.reportingResource) {
      newErrors.reportingResource = "Reporting resource is required for shadow status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleAllocationChange = (value) => {
    setFormData((prev) => ({ ...prev, allocationPercentage: value[0] }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
      // Reset reportingResource if changing from Shadow to Deployed
      reportingResource: value === "DEPLOYED" ? null : prev.reportingResource,
    }));
  };

  // Format date for display (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    // Check if date is in DD-MM-YYYY format
    if (dateString.includes("-") && dateString.split("-")[0].length === 2) {
      const [day, month, year] = dateString.split("-");
      return `${year}-${month}-${day}`;
    }

    return dateString;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {allotment ? "Edit Project Allocation" : "Assign New Project"}
          </DialogTitle>
          <DialogDescription>
            {allotment ? "Update the details of this project allocation" : "Assign a project to an employee"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Employee Selection */}
          <div className="space-y-2">
            <Label
              htmlFor="employee"
              className={cn("text-sm font-medium", errors.employeeId ? "text-destructive" : "")}
            >
              Employee
            </Label>
            <Popover open={openEmployeeCombobox} onOpenChange={setOpenEmployeeCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openEmployeeCombobox}
                  className={cn(
                    "w-full justify-between border-input hover:border-neutral-400 transition-colors",
                    errors.employeeId ? "border-destructive" : "",
                  )}
                >
                  {formData.employeeId
                    ? employees.find((employee) => employee.id === formData.employeeId)?.name
                    : "Select employee..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Search employee..." />
                  <CommandList>
                    <CommandEmpty>No employee found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[200px]">
                        {employees.map((employee) => (
                          <CommandItem
                            key={employee.id}
                            value={employee.name}
                            onSelect={() => {
                              setFormData((prev) => ({ ...prev, employeeId: employee.id }));
                              setOpenEmployeeCombobox(false);

                              // Clear error
                              if (errors.employeeId) {
                                setErrors((prev) => {
                                  const newErrors = { ...prev };
                                  delete newErrors.employeeId;
                                  return newErrors;
                                });
                              }
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.employeeId === employee.id ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {employee.name}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.employeeId && (
              <div className="flex items-center text-xs text-destructive mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                <p>{errors.employeeId}</p>
              </div>
            )}
          </div>

          {/* Project Selection */}
          <div className="space-y-2">
            <Label htmlFor="project" className={cn("text-sm font-medium", errors.projectId ? "text-destructive" : "")}>
              Project
            </Label>
            <Popover open={openProjectCombobox} onOpenChange={setOpenProjectCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProjectCombobox}
                  className={cn(
                    "w-full justify-between border-input hover:border-neutral-400 transition-colors",
                    errors.projectId ? "border-destructive" : "",
                  )}
                >
                  {formData.projectId
                    ? projects.find((project) => project.id === formData.projectId)?.projectName
                    : "Select project..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Search project..." />
                  <CommandList>
                    <CommandEmpty>No project found.</CommandEmpty>
                    <CommandGroup>
                      <ScrollArea className="h-[200px]">
                        {projects.map((project) => (
                          <CommandItem
                            key={project.id}
                            value={project.projectName}
                            onSelect={() => {
                              setFormData((prev) => ({ ...prev, projectId: project.id }));
                              setOpenProjectCombobox(false);

                              // Clear error
                              if (errors.projectId) {
                                setErrors((prev) => {
                                  const newErrors = { ...prev };
                                  delete newErrors.projectId;
                                  return newErrors;
                                });
                              }
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.projectId === project.id ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {project.projectName}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.projectId && (
              <div className="flex items-center text-xs text-destructive mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                <p>{errors.projectId}</p>
              </div>
            )}
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label
              htmlFor="startDate"
              className={cn("text-sm font-medium", errors.startDate ? "text-destructive" : "")}
            >
              Project Joining Date
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formatDateForInput(formData.startDate)}
              onChange={handleChange}
              className={cn(
                "border-input hover:border-neutral-400 transition-colors",
                errors.startDate ? "border-destructive" : "",
              )}
              required
            />
            {errors.startDate && (
              <div className="flex items-center text-xs text-destructive mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                <p>{errors.startDate}</p>
              </div>
            )}
          </div>

          {/* Work Location */}
          <div className="space-y-2">
            <Label
              htmlFor="workLocation"
              className={cn("text-sm font-medium", errors.workLocation ? "text-destructive" : "")}
            >
              Work Location
            </Label>
            <Select
              value={formData.workLocation}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, workLocation: value }));

                // Clear error
                if (errors.workLocation) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.workLocation;
                    return newErrors;
                  });
                }
              }}
            >
              <SelectTrigger
                className={cn(
                  "border-input hover:border-neutral-400 transition-colors",
                  errors.workLocation ? "border-destructive" : "",
                )}
              >
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Onsite">Onsite</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
            {errors.workLocation && (
              <div className="flex items-center text-xs text-destructive mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                <p>{errors.workLocation}</p>
              </div>
            )}
          </div>

          {/* Engagement Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">
              Engagement Status
            </Label>
            <RadioGroup value={formData.status} onValueChange={handleStatusChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="DEPLOYED" id="deployed" />
                <Label htmlFor="deployed" className="cursor-pointer">
                  Deployed
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SHADOW" id="shadow" />
                <Label htmlFor="shadow" className="cursor-pointer">
                  Shadow
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Shadow Of Selection - Only shown when status is Shadow */}
          {formData.status === "SHADOW" && (
            <div className="space-y-2">
              <Label
                htmlFor="reportingResource"
                className={cn("text-sm font-medium", errors.reportingResource ? "text-destructive" : "")}
              >
                Reporting Resource
              </Label>
              <Popover open={openShadowCombobox} onOpenChange={setOpenShadowCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openShadowCombobox}
                    className={cn(
                      "w-full justify-between border-input hover:border-neutral-400 transition-colors",
                      errors.reportingResource ? "border-destructive" : "",
                    )}
                  >
                    {formData.reportingResource
                      ? deployedEmployees.find((e) => e.engagementId === formData.reportingResource)?.name || "Unknown"
                      : "Select reporting resource..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search reporting resource..." />
                    <CommandList>
                      <CommandEmpty>No deployed employee found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-[200px]">
                          {deployedEmployees.map((employee) => (
                            <CommandItem
                              key={employee.engagementId}
                              value={`${employee.name} (${employee.project})`}
                              onSelect={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  reportingResource: employee.engagementId,
                                }));
                                setOpenShadowCombobox(false);

                                // Clear error
                                if (errors.reportingResource) {
                                  setErrors((prev) => {
                                    const newErrors = { ...prev };
                                    delete newErrors.reportingResource;
                                    return newErrors;
                                  });
                                }
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.reportingResource === employee.engagementId ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {employee.name} ({employee.project})
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.reportingResource && (
                <div className="flex items-center text-xs text-destructive mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <p>{errors.reportingResource}</p>
                </div>
              )}
            </div>
          )}

          {/* Allocation Percentage */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="allocationPercentage" className="text-sm font-medium">
                Allocation Percentage
              </Label>
              <span className="text-sm font-medium">{formData.allocationPercentage}%</span>
            </div>
            <Slider
              defaultValue={[formData.allocationPercentage]}
              max={100}
              step={5}
              onValueChange={handleAllocationChange}
              className="py-2"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-input hover:border-neutral-400 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {allotment ? "Updating..." : "Assigning..."}
                </>
              ) : allotment ? (
                "Update"
              ) : (
                "Assign Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AllotmentList;





// // Working

// "use client"

// import React,{ useState, useEffect } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
// import { Button } from "./ui/button"
// import { Pencil, Trash2, PlusCircle, Eye, ChevronDown, ChevronRight, BriefcaseBusinessIcon, BriefcaseIcon } from "lucide-react"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
// import { Badge } from "./ui/badge"
// import { ScrollArea } from "./ui/scroll-area"
// import { Slider } from "./ui/slider"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
// import { cn } from "@/lib/utils"
// import { CheckIcon, ChevronsUpDown } from "lucide-react"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

// // Demo data
// const initialEmployees = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Jane Smith" },
//   { id: 3, name: "Alice Johnson" },
//   { id: 4, name: "Bob Williams" },
//   { id: 5, name: "Charlie Brown" },
//   { id: 6, name: "David Miller" },
//   { id: 7, name: "Emma Wilson" },
//   { id: 8, name: "Frank Thomas" },
//   { id: 9, name: "Grace Davis" },
//   { id: 10, name: "Henry Martin" },
// ]

// const initialProjects = [
//   { id: 1, name: "Project Alpha" },
//   { id: 2, name: "Project Beta" },
//   { id: 3, name: "Project Gamma" },
//   { id: 4, name: "Project Delta" },
//   { id: 5, name: "Project Epsilon" },
//   { id: 6, name: "Project Zeta" },
//   { id: 7, name: "Project Eta" },
//   { id: 8, name: "Project Theta" },
//   { id: 9, name: "Project Iota" },
//   { id: 10, name: "Project Kappa" },
// ]

// const initialAllotments = [
//   { 
//     id: 1, 
//     employeeId: 1, 
//     projectId: 1, 
//     startDate: "2023-01-01", 
//     allocationPercentage: 100, 
//     status: "Deployed",
//     shadowOf: null
//   },
//   { 
//     id: 2, 
//     employeeId: 2, 
//     projectId: 2, 
//     startDate: "2023-02-15", 
//     allocationPercentage: 75, 
//     status: "Shadow",
//     shadowOf: 1
//   },
//   { 
//     id: 3, 
//     employeeId: 3, 
//     projectId: 3, 
//     startDate: "2023-03-01", 
//     allocationPercentage: 100, 
//     status: "Deployed",
//     shadowOf: null
//   },
//   { 
//     id: 4, 
//     employeeId: 4, 
//     projectId: 4, 
//     startDate: "2023-04-01", 
//     allocationPercentage: 50, 
//     status: "Shadow",
//     shadowOf: 3
//   },
//   { 
//     id: 5, 
//     employeeId: 5, 
//     projectId: 5, 
//     startDate: "2023-05-01", 
//     allocationPercentage: 100, 
//     status: "Deployed",
//     shadowOf: null
//   },
//   { 
//     id: 6, 
//     employeeId: 6, 
//     projectId: 6, 
//     startDate: "2023-06-01", 
//     allocationPercentage: 80, 
//     status: "Deployed",
//     shadowOf: null
//   },
//   { 
//     id: 7, 
//     employeeId: 7, 
//     projectId: 7, 
//     startDate: "2023-07-15", 
//     allocationPercentage: 100, 
//     status: "Shadow",
//     shadowOf: 6
//   },
//   { 
//     id: 8, 
//     employeeId: 8, 
//     projectId: 8, 
//     startDate: "2023-08-01", 
//     allocationPercentage: 60, 
//     status: "Deployed",
//     shadowOf: null
//   },
//   { 
//     id: 9, 
//     employeeId: 9, 
//     projectId: 9, 
//     startDate: "2023-09-01", 
//     allocationPercentage: 100, 
//     status: "Shadow",
//     shadowOf: 8
//   },
//   { 
//     id: 10, 
//     employeeId: 10, 
//     projectId: 10, 
//     startDate: "2023-10-01", 
//     allocationPercentage: 90, 
//     status: "Deployed",
//     shadowOf: null
//   },
//   { 
//     id: 11, 
//     employeeId: 1, 
//     projectId: 2, 
//     startDate: "2023-11-01", 
//     allocationPercentage: 50, 
//     status: "Shadow",
//     shadowOf: 10
//   },
//   { 
//     id: 12, 
//     employeeId: 2, 
//     projectId: 3, 
//     startDate: "2023-12-01", 
//     allocationPercentage: 100, 
//     status: "Deployed",
//     shadowOf: null
//   },
// ]

// const ITEMS_PER_PAGE = 7

// const AllotmentList = () => {
//   const [allotments, setAllotments] = useState(initialAllotments)
//   const [employees] = useState(initialEmployees)
//   const [projects] = useState(initialProjects)
//   const [showForm, setShowForm] = useState(false)
//   const [showViewModal, setShowViewModal] = useState(false)
//   const [editingAllotment, setEditingAllotment] = useState(null)
//   const [viewingEmployee, setViewingEmployee] = useState(null)
//   const [viewingAllotments, setViewingAllotments] = useState([])
//   const [filter, setFilter] = useState("all")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [expandedRows, setExpandedRows] = useState({})
//   const [employeesWithShadows, setEmployeesWithShadows] = useState({})

//   // Calculate which employees have shadows
//   useEffect(() => {
//     const shadowMap = {}
//     allotments.forEach(allotment => {
//       if (allotment.status === "Shadow" && allotment.shadowOf) {
//         if (!shadowMap[allotment.shadowOf]) {
//           shadowMap[allotment.shadowOf] = []
//         }
//         shadowMap[allotment.shadowOf].push(allotment)
//       }
//     })
//     setEmployeesWithShadows(shadowMap)
//   }, [allotments])

//   const handleDelete = (id) => {
//     setAllotments(allotments.filter((allotment) => allotment.id !== id))
//   }

//   const handleEdit = (allotment) => {
//     setEditingAllotment(allotment)
//     setShowForm(true)
//   }

//   const handleView = (employeeId) => {
//     const employee = employees.find(e => e.id === employeeId)
//     if (employee) {
//       setViewingEmployee(employee)
//       setViewingAllotments(allotments.filter(a => a.employeeId === employeeId))
//       setShowViewModal(true)
//     }
//   }

//   const handleSubmit = (formData) => {
//     if (editingAllotment) {
//       setAllotments(allotments.map((allotment) => (allotment.id === formData.id ? formData : allotment)))
//     } else {
//       setAllotments([...allotments, { ...formData, id: Date.now() }])
//     }
//     setShowForm(false)
//     setEditingAllotment(null)
//   }

//   const getEmployeeName = (employeeId) => {
//     const employee = employees.find(e => e.id === employeeId)
//     return employee ? employee.name : "Unknown"
//   }

//   const getProjectName = (projectId) => {
//     const project = projects.find(p => p.id === projectId)
//     return project ? project.name : "Unknown"
//   }

//   const toggleRowExpansion = (allotmentId) => {
//     setExpandedRows(prev => ({
//       ...prev,
//       [allotmentId]: !prev[allotmentId]
//     }))
//   }

//   const hasShadowEmployees = (allotmentId) => {
//     return employeesWithShadows[allotmentId] && employeesWithShadows[allotmentId].length > 0
//   }

//   // Get deployed employees for shadow selection
//   const getDeployedEmployees = () => {
//     const deployedAllotments = allotments.filter(a => a.status === "Deployed")
//     return deployedAllotments.map(a => {
//       const employee = employees.find(e => e.id === a.employeeId)
//       return {
//         allotmentId: a.id,
//         employeeId: a.employeeId,
//         name: employee ? employee.name : "Unknown",
//         project: getProjectName(a.projectId)
//       }
//     })
//   }

//   // Filter allotments based on status
//   const filteredAllotments = filter === "all" 
//     ? allotments 
//     : allotments.filter(a => a.status === filter)

//   // Get top-level allotments (not shadows)
//   const topLevelAllotments = filteredAllotments.filter(a => a.status !== "Shadow" || !a.shadowOf)

//   // Calculate total pages
//   const totalPages = Math.ceil(topLevelAllotments.length / ITEMS_PER_PAGE)
  
//   // Get current page items
//   const currentItems = topLevelAllotments.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   )

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-end">
//         <div className="flex space-x-2">
//           <Select value={filter} onValueChange={setFilter}>
//             <SelectTrigger className="w-[180px] border-input hover:border-neutral-400 transition-colors">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All</SelectItem>
//               <SelectItem value="Deployed">Deployed</SelectItem>
//               <SelectItem value="Shadow">Shadow</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button onClick={() => setShowForm(true)}>
//             <PlusCircle className="mr-2 h-4 w-4" /> Add Allotment
//           </Button>
//         </div>
//       </div>

//       <div className="border rounded-md">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Employee</TableHead>
//               <TableHead>Project</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-center">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentItems.length > 0 ? (
//               currentItems.map((allotment) => (
//                 <React.Fragment key={allotment.id}>
//                   <TableRow 
//                     className={cn(
//                       hasShadowEmployees(allotment.id) ? "bg-gray-50 dark:bg-blue-950/30" : "bg-blue-50",
//                       expandedRows[allotment.id] ? "border-b-0" : ""
//                     )}
//                   >
//                     <TableCell className="font-medium">
//                       <div className="flex items-center">
//                         {hasShadowEmployees(allotment.id) && (
//                           <Button 
//                             variant="ghost" 
//                             size="icon" 
//                             className="mr-2 h-6 w-6 p-0" 
//                             onClick={() => toggleRowExpansion(allotment.id)}
//                           >
//                             {expandedRows[allotment.id] ? 
//                               <ChevronDown className="h-4 w-4" /> : 
//                               <ChevronRight className="h-4 w-4" />
//                             }
//                           </Button>
//                         )}
//                         {getEmployeeName(allotment.employeeId)}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center">
//                         {/* {getProjectName(allotment.projectId)} */}
//                         <Button 
//                           variant="outline" 
//                           size="icon" 
//                           onClick={() => handleView(allotment.employeeId)}
//                           title="View employee projects"
//                         >
//                           {/* <Eye className="h-4 w-4" /> */}
//                           <BriefcaseIcon className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={allotment.status === "Deployed" ? "default" : "secondary"}>
//                         {allotment.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex justify-center space-x-2">
//                         {/* <Button 
//                           variant="outline" 
//                           size="icon" 
//                           onClick={() => handleView(allotment.employeeId)}
//                           title="View employee projects"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button> */}
//                         <div className="cursor-not-allowed hover:cursor-[block]">
//                           <Button 
//                             variant="outline" 
//                             size="icon" 
//                             onClick={() => handleEdit(allotment)}
//                             title="Edit allotment"
//                             disabled
//                           >
//                             <Pencil className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         <div className="cursor-not-allowed hover:cursor-[block]">
//                           <Button 
//                             variant="outline" 
//                             size="icon" 
//                             onClick={() => handleDelete(allotment.id)}
//                             className="text-destructive hover:text-destructive"
//                             title="Delete allotment"
//                             disabled
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </TableCell>
//                   </TableRow>
                  
//                   {/* Shadow Employees Rows */}
//                   {expandedRows[allotment.id] && employeesWithShadows[allotment.id] && (
//                     <TableRow className="bg-white dark:bg-blue-950/20">
//                       <TableCell colSpan={4}>
//                         <div className="pl-10 mt-[-7px] mb-[-7px]">
//                           {/* <div className="text-sm font-medium text-muted-foreground mb-2">
//                             Shadow Employees
//                           </div> */}
//                           <Table>
//                             {/* <TableHeader>
//                               <TableRow>
//                                 <TableHead>Employee</TableHead>
//                                 <TableHead>Project</TableHead>
//                                 <TableHead>Allocation</TableHead>
//                                 <TableHead className="text-center">Actions</TableHead>
//                               </TableRow>
//                             </TableHeader> */}
//                             <TableBody className="py-0">
//                               {employeesWithShadows[allotment.id].map(shadowAllotment => (
//                                 <TableRow key={shadowAllotment.id}>
//                                   <TableCell className="font-medium">
//                                     {getEmployeeName(shadowAllotment.employeeId)}
//                                   </TableCell>
//                                   <TableCell>
//                                     {getProjectName(shadowAllotment.projectId)}
//                                   </TableCell>
//                                   <TableCell>
//                                     {shadowAllotment.allocationPercentage}%
//                                   </TableCell>
//                                   <TableCell>
//                                     <div className="flex justify-center space-x-2">
//                                       <div className="cursor-not-allowed hover:cursor-[block]">
//                                         <Button 
//                                           variant="outline" 
//                                           size="icon" 
//                                           onClick={() => handleEdit(shadowAllotment)}
//                                           title="Edit allotment"
//                                           disabled
//                                         >
//                                           <Pencil className="h-4 w-4" />
//                                         </Button>
//                                       </div>
//                                       <div className="cursor-not-allowed hover:cursor-[block]">
//                                         <Button 
//                                           variant="outline" 
//                                           size="icon" 
//                                           onClick={() => handleDelete(shadowAllotment.id)}
//                                           className="text-destructive hover:text-destructive"
//                                           title="Delete allotment"
//                                           disabled
//                                         >
//                                           <Trash2 className="h-4 w-4" />
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   </TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </React.Fragment>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
//                   No allotments found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4">
//           <div className="flex space-x-1">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className="h-8 w-8 p-0"
//             >
//               &lt;
//             </Button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setCurrentPage(page)}
//                 className="h-8 w-8 p-0"
//               >
//                 {page}
//               </Button>
//             ))}
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//               className="h-8 w-8 p-0"
//             >
//               &gt;
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit Allotment Form */}
//       {showForm && (
//         <AllotmentForm
//           allotment={editingAllotment}
//           employees={employees}
//           projects={projects}
//           deployedEmployees={getDeployedEmployees()}
//           onClose={() => {
//             setShowForm(false)
//             setEditingAllotment(null)
//           }}
//           onSubmit={handleSubmit}
//         />
//       )}

//       {/* View Employee Projects Modal */}
//       {showViewModal && viewingEmployee && (
//         <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle className="text-xl font-semibold">
//                 {viewingEmployee.name}'s Projects
//               </DialogTitle>
//               <DialogDescription>
//                 View all projects this employee is assigned to
//               </DialogDescription>
//             </DialogHeader>
//             <ScrollArea className="max-h-[400px] overflow-auto pr-4">
//               <div className="space-y-4">
//                 {viewingAllotments.length > 0 ? (
//                   viewingAllotments.map((allotment) => (
//                     <div key={allotment.id} className="border rounded-md p-4 space-y-3">
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-medium">{getProjectName(allotment.projectId)}</h3>
//                         <Badge variant={allotment.status === "Deployed" ? "default" : "secondary"}>
//                           {allotment.status}
//                         </Badge>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <p className="text-muted-foreground">Start Date</p>
//                           <p>{allotment.startDate}</p>
//                         </div>
//                         <div>
//                           <p className="text-muted-foreground">Allocation</p>
//                           <p>{allotment.allocationPercentage}%</p>
//                         </div>
//                         {allotment.status === "Shadow" && allotment.shadowOf && (
//                           <div className="col-span-2">
//                             <p className="text-muted-foreground">Shadow of</p>
//                             <p>{getEmployeeName(
//                               allotments.find(a => a.id === allotment.shadowOf)?.employeeId
//                             )}</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center py-4 text-muted-foreground">No projects assigned to this employee</p>
//                 )}
//               </div>
//             </ScrollArea>
//             <DialogFooter>
//               <Button variant="outline" onClick={() => setShowViewModal(false)}>
//                 Close
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   )
// }

// const AllotmentForm = ({ allotment, employees, projects, deployedEmployees, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState(
//     allotment || { 
//       id: 0, 
//       employeeId: 0, 
//       projectId: 0, 
//       startDate: "", 
//       allocationPercentage: 100, 
//       status: "Deployed",
//       shadowOf: null
//     }
//   )
  
//   const [openEmployeeCombobox, setOpenEmployeeCombobox] = useState(false)
//   const [openProjectCombobox, setOpenProjectCombobox] = useState(false)
//   const [openShadowCombobox, setOpenShadowCombobox] = useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     onSubmit(formData)
//   }

//   const handleAllocationChange = (value) => {
//     setFormData(prev => ({ ...prev, allocationPercentage: value[0] }))
//   }

//   const handleStatusChange = (value) => {
//     setFormData(prev => ({ 
//       ...prev, 
//       status: value,
//       // Reset shadowOf if changing from Shadow to Deployed
//       shadowOf: value === "Deployed" ? null : prev.shadowOf
//     }))
//   }

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold">
//             {allotment ? "Edit Allotment" : "Add New Allotment"}
//           </DialogTitle>
//           <DialogDescription>
//             {allotment ? "Update the details of this engagement" : "Create a new project engagement"}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Employee Selection */}
//           <div className="space-y-2">
//             <Label htmlFor="employee" className="text-sm font-medium">Employee</Label>
//             <Popover open={openEmployeeCombobox} onOpenChange={setOpenEmployeeCombobox}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   role="combobox"
//                   aria-expanded={openEmployeeCombobox}
//                   className="w-full justify-between border-input hover:border-neutral-400 transition-colors"
//                 >
//                   {formData.employeeId ? 
//                     employees.find(employee => employee.id === formData.employeeId)?.name : 
//                     "Select employee..."}
//                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-[400px] p-0">
//                 <Command>
//                   <CommandInput placeholder="Search employee..." />
//                   <CommandList>
//                     <CommandEmpty>No employee found.</CommandEmpty>
//                     <CommandGroup>
//                       <ScrollArea className="h-[200px]">
//                         {employees.map((employee) => (
//                           <CommandItem
//                             key={employee.id}
//                             value={employee.name}
//                             onSelect={() => {
//                               setFormData(prev => ({ ...prev, employeeId: employee.id }))
//                               setOpenEmployeeCombobox(false)
//                             }}
//                           >
//                             <CheckIcon
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 formData.employeeId === employee.id ? "opacity-100" : "opacity-0"
//                               )}
//                             />
//                             {employee.name}
//                           </CommandItem>
//                         ))}
//                       </ScrollArea>
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//           </div>

//           {/* Project Selection */}
//           <div className="space-y-2">
//             <Label htmlFor="project" className="text-sm font-medium">Project</Label>
//             <Popover open={openProjectCombobox} onOpenChange={setOpenProjectCombobox}>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   role="combobox"
//                   aria-expanded={openProjectCombobox}
//                   className="w-full justify-between border-input hover:border-neutral-400 transition-colors"
//                 >
//                   {formData.projectId ? 
//                     projects.find(project => project.id === formData.projectId)?.name : 
//                     "Select project..."}
//                   <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-[400px] p-0">
//                 <Command>
//                   <CommandInput placeholder="Search project..." />
//                   <CommandList>
//                     <CommandEmpty>No project found.</CommandEmpty>
//                     <CommandGroup>
//                       <ScrollArea className="h-[200px]">
//                         {projects.map((project) => (
//                           <CommandItem
//                             key={project.id}
//                             value={project.name}
//                             onSelect={() => {
//                               setFormData(prev => ({ ...prev, projectId: project.id }))
//                               setOpenProjectCombobox(false)
//                             }}
//                           >
//                             <CheckIcon
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 formData.projectId === project.id ? "opacity-100" : "opacity-0"
//                               )}
//                             />
//                             {project.name}
//                           </CommandItem>
//                         ))}
//                       </ScrollArea>
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//           </div>

//           {/* Start Date */}
//           <div className="space-y-2">
//             <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
//             <Input
//               id="startDate"
//               name="startDate"
//               type="date"
//               value={formData.startDate}
//               onChange={handleChange}
//               className="border-input hover:border-neutral-400 transition-colors"
//               required
//             />
//           </div>

//           {/* Engagement Status */}
//           <div className="space-y-2">
//             <Label htmlFor="status" className="text-sm font-medium">Engagement Status</Label>
//             <Select 
//               value={formData.status} 
//               onValueChange={handleStatusChange}
//             >
//               <SelectTrigger className="border-input hover:border-neutral-400 transition-colors">
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Deployed">Deployed</SelectItem>
//                 <SelectItem value="Shadow">Shadow</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Shadow Of Selection - Only shown when status is Shadow */}
//           {formData.status === "Shadow" && (
//             <div className="space-y-2">
//               <Label htmlFor="shadowOf" className="text-sm font-medium">Shadow Of</Label>
//               <Popover open={openShadowCombobox} onOpenChange={setOpenShadowCombobox}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     aria-expanded={openShadowCombobox}
//                     className="w-full justify-between border-input hover:border-neutral-400 transition-colors"
//                   >
//                     {formData.shadowOf ? 
//                       deployedEmployees.find(e => e.allotmentId === formData.shadowOf)?.name + 
//                       ` (${deployedEmployees.find(e => e.allotmentId === formData.shadowOf)?.project})` : 
//                       "Select employee to shadow..."}
//                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[400px] p-0">
//                   <Command>
//                     <CommandInput placeholder="Search deployed employee..." />
//                     <CommandList>
//                       <CommandEmpty>No deployed employee found.</CommandEmpty>
//                       <CommandGroup>
//                         <ScrollArea className="h-[200px]">
//                           {deployedEmployees.map((employee) => (
//                             <CommandItem
//                               key={employee.allotmentId}
//                               value={`${employee.name} (${employee.project})`}
//                               onSelect={() => {
//                                 setFormData(prev => ({ 
//                                   ...prev, 
//                                   shadowOf: employee.allotmentId,
//                                   // Optionally set the same project as the shadowed employee
//                                   projectId: projects.find(p => p.name === employee.project)?.id || prev.projectId
//                                 }))
//                                 setOpenShadowCombobox(false)
//                               }}
//                             >
//                               <CheckIcon
//                                 className={cn(
//                                   "mr-2 h-4 w-4",
//                                   formData.shadowOf === employee.allotmentId ? "opacity-100" : "opacity-0"
//                                 )}
//                               />
//                               {employee.name} ({employee.project})
//                             </CommandItem>
//                           ))}
//                         </ScrollArea>
//                       </CommandGroup>
//                     </CommandList>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//             </div>
//           )}

//           {/* Allocation Percentage */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <Label htmlFor="allocationPercentage" className="text-sm font-medium">
//                 Allocation Percentage
//               </Label>
//               <span className="text-sm font-medium">{formData.allocationPercentage}%</span>
//             </div>
//             <Slider
//               defaultValue={[formData.allocationPercentage]}
//               max={100}
//               step={5}
//               onValueChange={handleAllocationChange}
//               className="py-2"
//             />
//           </div>

//           <DialogFooter className="pt-2">
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={onClose}
//               className="border-input hover:border-neutral-400 transition-colors"
//             >
//               Cancel
//             </Button>
//             <Button type="submit">
//               {allotment ? "Update" : "Add"} Allotment
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default AllotmentList

// export { AllotmentList }

