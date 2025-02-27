import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash2, BriefcaseIcon, Search } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import EmployeeForm from "./employee-form";
import { PlusCircle } from "lucide-react";

const initialEmployees = [
  {
    id: 1001,
    name: "John Doe",
    personalEmail: "john.personal@example.com",
    officeEmail: "john.doe@company.com",
    dateOfJoining: "2020-05-15",
    designation: "Senior Developer",
    department: "Technical",
    status: "Billable",
    primarySkills: ["React", "Node.js"],
    secondarySkills: ["Python", "SQL"],
  },
  {
    id: 1002,
    name: "Jane Smith",
    personalEmail: "jane.personal@example.com",
    officeEmail: "jane.smith@company.com",
    dateOfJoining: "2019-09-22",
    designation: "Project Manager",
    department: "Technical",
    status: "Billable",
    primarySkills: ["Angular", "Java"],
    secondarySkills: ["C#", "MongoDB"],
  },
  {
    id: 1003,
    name: "Alice Johnson",
    personalEmail: "alice.personal@example.com",
    officeEmail: "alice.johnson@company.com",
    dateOfJoining: "2021-03-10",
    designation: "HR Specialist",
    department: "HR",
    status: "Non-Billable",
    primarySkills: ["Recruitment", "Employee Relations"],
    secondarySkills: ["Payroll", "Benefits Administration"],
  },
  {
    id: 1004,
    name: "Bob Williams",
    personalEmail: "bob.personal@example.com",
    officeEmail: "bob.williams@company.com",
    dateOfJoining: "2018-11-30",
    designation: "Sales Executive",
    department: "Sales",
    status: "Billable",
    primarySkills: ["Lead Generation", "Negotiation"],
    secondarySkills: ["CRM", "Market Analysis"],
  },
  {
    id: 1005,
    name: "Charlie Brown",
    personalEmail: "charlie.personal@example.com",
    officeEmail: "charlie.brown@company.com",
    dateOfJoining: "2022-07-07",
    designation: "Backend Developer",
    department: "Technical",
    status: "Billable",
    primarySkills: ["Django", "PostgreSQL"],
    secondarySkills: ["Redis", "Nginx"],
  },
  {
    id: 1006,
    name: "Diana Clark",
    personalEmail: "diana.personal@example.com",
    officeEmail: "diana.clark@company.com",
    dateOfJoining: "2020-01-25",
    dateOfLeaving: "2023-06-15",
    designation: "UX Designer",
    department: "Technical",
    status: "Non-Billable",
    primarySkills: ["UI/UX", "Figma"],
    secondarySkills: ["Adobe XD", "Sketch"],
  },
  {
    id: 1007,
    name: "Ethan Hunt",
    personalEmail: "ethan.personal@example.com",
    officeEmail: "ethan.hunt@company.com",
    dateOfJoining: "2019-06-18",
    designation: "DevOps Engineer",
    department: "Technical",
    status: "Billable",
    primarySkills: ["AWS", "Docker"],
    secondarySkills: ["Kubernetes", "Jenkins"],
  },
  {
    id: 1008,
    name: "Fiona Green",
    personalEmail: "fiona.personal@example.com",
    officeEmail: "fiona.green@company.com",
    dateOfJoining: "2021-12-03",
    designation: "Marketing Specialist",
    department: "Sales",
    status: "Non-Billable",
    primarySkills: ["Digital Marketing", "Content Creation"],
    secondarySkills: ["SEO", "Social Media"],
  },
  {
    id: 1009,
    name: "George Lee",
    personalEmail: "george.personal@example.com",
    officeEmail: "george.lee@company.com",
    dateOfJoining: "2018-08-20",
    designation: "System Administrator",
    department: "Technical",
    status: "Billable",
    primarySkills: ["Linux", "Network Security"],
    secondarySkills: ["Bash Scripting", "Monitoring"],
  },
  {
    id: 1010,
    name: "Hannah White",
    personalEmail: "hannah.personal@example.com",
    officeEmail: "hannah.white@company.com",
    dateOfJoining: "2022-04-12",
    designation: "HR Manager",
    department: "HR",
    status: "Non-Billable",
    primarySkills: ["Leadership", "Conflict Resolution"],
    secondarySkills: ["Training", "Performance Management"],
  },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [nameOrIdSearch, setNameOrIdSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter employees based on search criteria
  const filteredEmployees = employees.filter((employee) => {
    const matchesNameOrId = 
      employee.name.toLowerCase().includes(nameOrIdSearch.toLowerCase()) || 
      employee.id.toString().includes(nameOrIdSearch);
    
    const matchesSkills = 
      skillSearch === "" || 
      employee.primarySkills.some(skill => 
        skill.toLowerCase().includes(skillSearch.toLowerCase())
      ) || 
      employee.secondarySkills.some(skill => 
        skill.toLowerCase().includes(skillSearch.toLowerCase())
      );
    
    return matchesNameOrId && matchesSkills;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdate = (updatedEmployee) => {
    setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
    setEditingEmployee(null);
  };

  const handleAdd = (newEmployee) => {
    setEmployees([...employees, { ...newEmployee, id: Math.max(...employees.map(e => e.id)) + 1 }]);
    setIsAddingEmployee(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Employee ID or Name"
            className="pl-10 border-gray-300 focus:border-blue-400 transition-colors duration-200 rounded-md shadow-sm"
            value={nameOrIdSearch}
            onChange={(e) => {
              setNameOrIdSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Skills"
                className="pl-10 border-gray-300 focus:border-purple-400 transition-colors duration-200 rounded-md shadow-sm"
                value={skillSearch}
                onChange={(e) => {
                  setSkillSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={() => setIsAddingEmployee(true)}
              className="w-fit "
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Employee
            </Button>
          </div>
      </div>

      <ScrollArea className="h-[430px] rounded-md border shadow-sm">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="w-[80px] font-semibold">Emp ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Date of Joining</TableHead>
              <TableHead className="font-semibold">Primary Skills</TableHead>
              <TableHead className="font-semibold">Secondary Skills</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((employee) => (
                <TableRow 
                  key={employee.id} 
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 mb-4"
                >
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  {/* <TableCell>
                    {new Date(employee.dateOfJoining).toLocaleDateString()}
                  </TableCell> */}

                <TableCell>
                  {new Date(employee.dateOfJoining).toISOString().split('T')[0].split('-').reverse().join('-')}
                </TableCell>

                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {employee.primarySkills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="default" 
                          className="bg-blue-500 hover:bg-blue-600 transition-colors px-2 py-1 rounded-3xl"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {employee.secondarySkills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors px-2 py-1 rounded-3xl"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={employee.status === "Billable" ? "default" : "outline"}
                      className={
                        employee.status === "Billable" 
                          ? "px-2 py-1 rounded-3xl bg-orange-500" 
                          : "border border-amber-500 text-amber-500 hover:bg-amber-50 transition-colors px-2 py-1 rounded-3xl"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(employee)}
                        className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors p-2 rounded"
                      >
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDelete(employee.id)}
                        className="border-red-200 hover:border-red-400 hover:bg-red-50 transition-colors p-2 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Search className="h-8 w-8 mb-2 opacity-50" />
                    <p>No employees found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 
                  ? "pointer-events-none opacity-50" 
                  : "cursor-pointer hover:bg-blue-50 transition-colors p-2 rounded"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded cursor-pointer" 
                    : "hover:bg-gray-100 transition-colors px-3 py-1 rounded cursor-pointer"}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages 
                  ? "pointer-events-none opacity-50" 
                  : "cursor-pointer hover:bg-blue-50 transition-colors p-2 rounded"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {(editingEmployee || isAddingEmployee) && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={() => {
            setEditingEmployee(null);
            setIsAddingEmployee(false);
          }}
          onSubmit={editingEmployee ? handleUpdate : handleAdd}
        />
      )}
    </div>
  );
};

export default EmployeeList;
