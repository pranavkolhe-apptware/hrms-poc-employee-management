






// // Working

// import { useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
// import { Button } from "./ui/button";
// import { Pencil, Trash2, BriefcaseIcon, Search, View } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { Input } from "./ui/input";
// import { ScrollArea } from "./ui/scroll-area";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "./ui/pagination";
// import EmployeeForm from "./employee-form";
// import { PlusCircle } from "lucide-react";

// const initialEmployees = [
//   {
//     id: 1001,
//     name: "John Doe",
//     personalEmail: "john.personal@example.com",
//     officeEmail: "john.doe@company.com",
//     dateOfJoining: "2020-05-15",
//     designation: "Senior Developer",
//     department: "Technical",
//     status: "Billable",
//     primarySkills: ["React", "Node.js"],
//     secondarySkills: ["Python", "SQL"],
//   },
//   {
//     id: 1002,
//     name: "Jane Smith",
//     personalEmail: "jane.personal@example.com",
//     officeEmail: "jane.smith@company.com",
//     dateOfJoining: "2019-09-22",
//     designation: "Project Manager",
//     department: "Technical",
//     status: "Billable",
//     primarySkills: ["Angular", "Java"],
//     secondarySkills: ["C#", "MongoDB"],
//   },
//   {
//     id: 1003,
//     name: "Alice Johnson",
//     personalEmail: "alice.personal@example.com",
//     officeEmail: "alice.johnson@company.com",
//     dateOfJoining: "2021-03-10",
//     designation: "HR Specialist",
//     department: "HR",
//     status: "Non-Billable",
//     primarySkills: ["Recruitment", "Employee Relations"],
//     secondarySkills: ["Payroll", "Benefits Administration"],
//   },
//   {
//     id: 1004,
//     name: "Bob Williams",
//     personalEmail: "bob.personal@example.com",
//     officeEmail: "bob.williams@company.com",
//     dateOfJoining: "2018-11-30",
//     designation: "Sales Executive",
//     department: "Sales",
//     status: "Billable",
//     primarySkills: ["Lead Generation", "Negotiation"],
//     secondarySkills: ["CRM", "Market Analysis"],
//   },
//   {
//     id: 1005,
//     name: "Charlie Brown",
//     personalEmail: "charlie.personal@example.com",
//     officeEmail: "charlie.brown@company.com",
//     dateOfJoining: "2022-07-07",
//     designation: "Backend Developer",
//     department: "Technical",
//     status: "Billable",
//     primarySkills: ["Django", "PostgreSQL"],
//     secondarySkills: ["Redis", "Nginx"],
//   },
//   {
//     id: 1006,
//     name: "Diana Clark",
//     personalEmail: "diana.personal@example.com",
//     officeEmail: "diana.clark@company.com",
//     dateOfJoining: "2020-01-25",
//     dateOfLeaving: "2023-06-15",
//     designation: "UX Designer",
//     department: "Technical",
//     status: "Non-Billable",
//     primarySkills: ["UI/UX", "Figma"],
//     secondarySkills: ["Adobe XD", "Sketch"],
//   },
//   {
//     id: 1007,
//     name: "Ethan Hunt",
//     personalEmail: "ethan.personal@example.com",
//     officeEmail: "ethan.hunt@company.com",
//     dateOfJoining: "2019-06-18",
//     designation: "DevOps Engineer",
//     department: "Technical",
//     status: "Billable",
//     primarySkills: ["AWS", "Docker"],
//     secondarySkills: ["Kubernetes", "Jenkins"],
//   },
//   {
//     id: 1008,
//     name: "Fiona Green",
//     personalEmail: "fiona.personal@example.com",
//     officeEmail: "fiona.green@company.com",
//     dateOfJoining: "2021-12-03",
//     designation: "Marketing Specialist",
//     department: "Sales",
//     status: "Non-Billable",
//     primarySkills: ["Digital Marketing", "Content Creation"],
//     secondarySkills: ["SEO", "Social Media"],
//   },
//   {
//     id: 1009,
//     name: "George Lee",
//     personalEmail: "george.personal@example.com",
//     officeEmail: "george.lee@company.com",
//     dateOfJoining: "2018-08-20",
//     designation: "System Administrator",
//     department: "Technical",
//     status: "Billable",
//     primarySkills: ["Linux", "Network Security"],
//     secondarySkills: ["Bash Scripting", "Monitoring"],
//   },
//   {
//     id: 1010,
//     name: "Hannah White",
//     personalEmail: "hannah.personal@example.com",
//     officeEmail: "hannah.white@company.com",
//     dateOfJoining: "2022-04-12",
//     designation: "HR Manager",
//     department: "HR",
//     status: "Non-Billable",
//     primarySkills: ["Leadership", "Conflict Resolution"],
//     secondarySkills: ["Training", "Performance Management"],
//   },
// ];

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState(initialEmployees);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [isAddingEmployee, setIsAddingEmployee] = useState(false);
//   const [nameOrIdSearch, setNameOrIdSearch] = useState("");
//   const [skillSearch, setSkillSearch] = useState("");
  
//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   // Filter employees based on search criteria
//   const filteredEmployees = employees.filter((employee) => {
//     const matchesNameOrId = 
//       employee.name.toLowerCase().includes(nameOrIdSearch.toLowerCase()) || 
//       employee.id.toString().includes(nameOrIdSearch);
    
//     const matchesSkills = 
//       skillSearch === "" || 
//       employee.primarySkills.some(skill => 
//         skill.toLowerCase().includes(skillSearch.toLowerCase())
//       ) || 
//       employee.secondarySkills.some(skill => 
//         skill.toLowerCase().includes(skillSearch.toLowerCase())
//       );
    
//     return matchesNameOrId && matchesSkills;
//   });

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
//   const paginatedEmployees = filteredEmployees.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleDelete = (id) => {
//     setEmployees(employees.filter((emp) => emp.id !== id));
//   };

//   const handleEdit = (employee) => {
//     setEditingEmployee(employee);
//   };

//   const handleUpdate = (updatedEmployee) => {
//     setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
//     setEditingEmployee(null);
//   };

//   const handleAdd = (newEmployee) => {
//     setEmployees([...employees, { ...newEmployee, id: Math.max(...employees.map(e => e.id)) + 1 }]);
//     setIsAddingEmployee(false);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="space-y-8 p-4 max-w-7xl mx-auto">

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="relative w-full max-w-sm">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search by Employee ID or Name"
//             className="pl-10 border-gray-300 focus:border-blue-400 transition-colors duration-200 rounded-md shadow-sm"
//             value={nameOrIdSearch}
//             onChange={(e) => {
//               setNameOrIdSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>
//         <div className="relative w-full max-w-sm">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search by Skills"
//                 className="pl-10 border-gray-300 focus:border-purple-400 transition-colors duration-200 rounded-md shadow-sm"
//                 value={skillSearch}
//                 onChange={(e) => {
//                   setSkillSearch(e.target.value);
//                   setCurrentPage(1);
//                 }}
//               />
//           </div>

//           <div className="flex justify-end">
//             <Button 
//               onClick={() => setIsAddingEmployee(true)}
//               className="w-fit "
//             >
//               <PlusCircle className="mr-2 h-4 w-4" /> Add New Employee
//             </Button>
//           </div>
//       </div>

//       <ScrollArea className="h-[430px] rounded-md border shadow-sm">
//         <Table>
//           <TableHeader className="sticky top-0 bg-background z-10">
//             <TableRow className="bg-gray-50 dark:bg-gray-800">
//               <TableHead className="w-[80px] font-semibold">Emp ID</TableHead>
//               <TableHead className="font-semibold">Name</TableHead>
//               <TableHead className="font-semibold">Date of Joining</TableHead>
//               <TableHead className="font-semibold">Primary Skills</TableHead>
//               <TableHead className="font-semibold">Secondary Skills</TableHead>
//               <TableHead className="font-semibold">Status</TableHead>
//               <TableHead className="text-right font-semibold">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedEmployees.length > 0 ? (
//               paginatedEmployees.map((employee) => (
//                 <TableRow 
//                   key={employee.id} 
//                   className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 mb-4"
//                 >
//                   <TableCell className="font-medium">{employee.id}</TableCell>
//                   <TableCell className="font-medium">{employee.name}</TableCell>
//                   {/* <TableCell>
//                     {new Date(employee.dateOfJoining).toLocaleDateString()}
//                   </TableCell> */}

//                 <TableCell>
//                   {new Date(employee.dateOfJoining).toISOString().split('T')[0].split('-').reverse().join('-')}
//                 </TableCell>

//                   <TableCell>
//                     <div className="flex flex-wrap gap-1">
//                       {employee.primarySkills.map((skill, index) => (
//                         <Badge 
//                           key={index} 
//                           variant="default" 
//                           className="bg-blue-500 hover:bg-blue-600 transition-colors px-2 py-1 rounded-3xl"
//                         >
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex flex-wrap gap-1">
//                       {employee.secondarySkills.map((skill, index) => (
//                         <Badge 
//                           key={index} 
//                           variant="secondary" 
//                           className="bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors px-2 py-1 rounded-3xl"
//                         >
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <Badge 
//                       variant={employee.status === "Billable" ? "default" : "outline"}
//                       className={
//                         employee.status === "Billable" 
//                           ? "px-2 py-1 rounded-3xl bg-orange-500" 
//                           : "border border-amber-500 text-amber-500 hover:bg-amber-50 transition-colors px-2 py-1 rounded-3xl"
//                       }
//                     >
//                       {employee.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end space-x-2">
//                       <Button 
//                         variant="outline" 
//                         size="icon" 
//                         onClick={() => handleEdit(employee)}
//                         className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors p-2 rounded"
//                       >
//                         <Pencil className="h-4 w-4 text-blue-500" />
//                       </Button>
//                       <Button 
//                         variant="outline" 
//                         size="icon" 
//                         onClick={() => handleDelete(employee.id)}
//                         className="border-red-200 hover:border-red-400 hover:bg-red-50 transition-colors p-2 rounded"
//                       >
//                         <Trash2 className="h-4 w-4 text-red-500" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} className="h-24 text-center">
//                   <div className="flex flex-col items-center justify-center text-gray-500">
//                     <Search className="h-8 w-8 mb-2 opacity-50" />
//                     <p>No employees found.</p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </ScrollArea>

//       {totalPages > 1 && (
//         <Pagination className="mt-6">
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious 
//                 onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                 className={currentPage === 1 
//                   ? "pointer-events-none opacity-50" 
//                   : "cursor-pointer hover:bg-blue-50 transition-colors p-2 rounded"}
//               />
//             </PaginationItem>
            
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <PaginationItem key={page}>
//                 <PaginationLink 
//                   isActive={currentPage === page}
//                   onClick={() => handlePageChange(page)}
//                   className={currentPage === page 
//                     ? "bg-primary text-white px-3 py-1 rounded cursor-pointer" 
//                     : "hover:bg-gray-100 border hover:border-gray-600 transition-colors px-3 py-1 rounded cursor-pointer"}
//                 >
//                   {page}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}
            
//             <PaginationItem>
//               <PaginationNext 
//                 onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                 className={currentPage === totalPages 
//                   ? "pointer-events-none opacity-50" 
//                   : "cursor-pointer hover:bg-blue-50 transition-colors p-2 rounded"}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       )}

//       {(editingEmployee || isAddingEmployee) && (
//         <EmployeeForm
//           employee={editingEmployee}
//           onClose={() => {
//             setEditingEmployee(null);
//             setIsAddingEmployee(false);
//           }}
//           onSubmit={editingEmployee ? handleUpdate : handleAdd}
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeeList;






import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Pencil, Trash2, Search, PlusCircle, Briefcase } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Progress } from "./ui/progress";

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

const initialProjects = [
  { id: 1, name: "Project Alpha", client: "Acme Corp", startDate: "2023-01-01", endDate: "2023-12-31" },
  { id: 2, name: "Project Beta", client: "TechGiant Inc", startDate: "2023-02-15", endDate: "2024-02-14" },
  { id: 3, name: "Project Gamma", client: "Innovate Solutions", startDate: "2023-03-01", endDate: "2023-09-30" },
  { id: 4, name: "Project Delta", client: "Global Systems", startDate: "2023-04-01", endDate: "2024-03-31" },
  { id: 5, name: "Project Epsilon", client: "Future Tech", startDate: "2023-05-01", endDate: "2023-11-30" },
  { id: 6, name: "Project Zeta", client: "Digital Dynamics", startDate: "2023-06-01", endDate: "2024-05-31" },
  { id: 7, name: "Project Eta", client: "Smart Solutions", startDate: "2023-07-15", endDate: "2024-01-14" },
  { id: 8, name: "Project Theta", client: "Nexus Corp", startDate: "2023-08-01", endDate: "2024-07-31" },
  { id: 9, name: "Project Iota", client: "Quantum Enterprises", startDate: "2023-09-01", endDate: "2024-08-31" },
  { id: 10, name: "Project Kappa", client: "Pinnacle Systems", startDate: "2023-10-01", endDate: "2024-09-30" },
];

const initialAllotments = [
  { 
    id: 1, 
    employeeId: 1001, 
    projectId: 1, 
    startDate: "2023-01-01", 
    endDate: "2023-12-31",
    allocationPercentage: 100, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 2, 
    employeeId: 1002, 
    projectId: 2, 
    startDate: "2023-02-15", 
    endDate: "2024-02-14",
    allocationPercentage: 75, 
    status: "Shadow",
    shadowOf: 1
  },
  { 
    id: 3, 
    employeeId: 1003, 
    projectId: 3, 
    startDate: "2023-03-01", 
    endDate: "2023-09-30",
    allocationPercentage: 100, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 4, 
    employeeId: 1004, 
    projectId: 4, 
    startDate: "2023-04-01", 
    endDate: "2024-03-31",
    allocationPercentage: 50, 
    status: "Shadow",
    shadowOf: 3
  },
  { 
    id: 5, 
    employeeId: 1005, 
    projectId: 5, 
    startDate: "2023-05-01", 
    endDate: "2023-11-30",
    allocationPercentage: 100, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 6, 
    employeeId: 1006, 
    projectId: 6, 
    startDate: "2023-06-01", 
    endDate: "2024-05-31",
    allocationPercentage: 80, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 7, 
    employeeId: 1007, 
    projectId: 7, 
    startDate: "2023-07-15", 
    endDate: "2024-01-14",
    allocationPercentage: 100, 
    status: "Shadow",
    shadowOf: 6
  },
  { 
    id: 8, 
    employeeId: 1008, 
    projectId: 8, 
    startDate: "2023-08-01", 
    endDate: "2024-07-31",
    allocationPercentage: 60, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 9, 
    employeeId: 1009, 
    projectId: 9, 
    startDate: "2023-09-01", 
    endDate: "2024-08-31",
    allocationPercentage: 100, 
    status: "Shadow",
    shadowOf: 8
  },
  { 
    id: 10, 
    employeeId: 1010, 
    projectId: 10, 
    startDate: "2023-10-01", 
    endDate: "2024-09-30",
    allocationPercentage: 90, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 11, 
    employeeId: 1001, 
    projectId: 2, 
    startDate: "2023-11-01", 
    endDate: "2024-10-31",
    allocationPercentage: 50, 
    status: "Shadow",
    shadowOf: 10
  },
  { 
    id: 12, 
    employeeId: 1002, 
    projectId: 3, 
    startDate: "2023-12-01", 
    endDate: "2024-11-30",
    allocationPercentage: 100, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 13, 
    employeeId: 1003, 
    projectId: 5, 
    startDate: "2023-06-15", 
    endDate: "2023-12-15",
    allocationPercentage: 25, 
    status: "Shadow",
    shadowOf: 5
  },
  { 
    id: 14, 
    employeeId: 1004, 
    projectId: 7, 
    startDate: "2023-08-01", 
    endDate: "2024-02-28",
    allocationPercentage: 50, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 15, 
    employeeId: 1005, 
    projectId: 9, 
    startDate: "2023-07-01", 
    endDate: "2024-06-30",
    allocationPercentage: 40, 
    status: "Shadow",
    shadowOf: 9
  },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [projects] = useState(initialProjects);
  const [allotments] = useState(initialAllotments);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [nameOrIdSearch, setNameOrIdSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  
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

  const handleViewProjects = (employee, e) => {
    e.stopPropagation(); // Prevent row click event
    setViewingEmployee(employee);
    setShowViewModal(true);
  };

  const handleRowClick = (employee) => {
    setViewingEmployee(employee);
    setShowViewModal(true);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  const getProjectClient = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.client : "Unknown Client";
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.name : "Unknown Employee";
  };

  const getViewingAllotments = () => {
    if (!viewingEmployee) return [];
    return allotments.filter(a => a.employeeId === viewingEmployee.id);
  };

  const getShadowingEmployee = (allotmentId) => {
    const shadowAllotment = allotments.find(a => a.id === allotmentId);
    if (!shadowAllotment) return "Unknown";
    
    const employee = employees.find(e => e.id === shadowAllotment.employeeId);
    return employee ? employee.name : "Unknown";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateTotalAllocation = (employeeAllotments) => {
    return employeeAllotments.reduce((total, allotment) => total + allotment.allocationPercentage, 0);
  };

  const viewingAllotments = getViewingAllotments();
  const totalAllocation = calculateTotalAllocation(viewingAllotments);

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* <div className="relative w-full max-w-sm">
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
        </div> */}

        <div className="flex justify-end">
          <Button 
            onClick={() => setIsAddingEmployee(true)}
            className="w-fit"
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
              paginatedEmployees.map((employee) => {
                const employeeAllotments = allotments.filter(a => a.employeeId === employee.id);
                const hasProjects = employeeAllotments.length > 0;
                
                return (
                  <TableRow 
                    key={employee.id} 
                    className={`hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 mb-4 ${hasProjects ? 'cursor-pointer' : ''}`}
                    onClick={hasProjects ? () => handleRowClick(employee) : undefined}
                  >
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell className="font-medium">{employee.name}</TableCell>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(employee);
                          }}
                          className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors p-2 rounded"
                          disabled
                        >
                          <Pencil className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(employee.id);
                          }}
                          className="border-red-200 hover:border-red-400 hover:bg-red-50 transition-colors p-2 rounded"
                          disabled
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
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
                    ? "bg-primary text-white px-3 py-1 rounded cursor-pointer" 
                    : "hover:bg-gray-100 border hover:border-gray-600 transition-colors px-3 py-1 rounded cursor-pointer"}
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

      {/* {showViewModal && viewingEmployee && (
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
            <DialogHeader className="pb-4 border-b">
              <DialogTitle className="text-xl font-semibold flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-primary" />
                {viewingEmployee.name}'s Project Allocations
              </DialogTitle>
              <DialogDescription className="pt-2">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Allocation:</span>
                    <span className="font-medium">{totalAllocation}%</span>
                  </div>
                  <Progress value={totalAllocation} className="h-2" />
                  <div className="text-xs text-right text-muted-foreground mt-1">
                    {totalAllocation > 100 ? (
                      <span className="text-red-500">Over-allocated by {totalAllocation - 100}%</span>
                    ) : totalAllocation < 100 ? (
                      <span className="text-amber-500">Under-allocated by {100 - totalAllocation}%</span>
                    ) : (
                      <span className="text-green-500">Perfectly allocated</span>
                    )}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <ScrollArea className="max-h-[400px] pr-4 pt-2">
              <div className="space-y-4">
                {viewingAllotments.length > 0 ? (
                  viewingAllotments.map((allotment) => (
                    <div 
                      key={allotment.id} 
                      className={`border rounded-lg p-4 space-y-3 transition-all hover:shadow-md ${
                        allotment.status === "Deployed" 
                          ? "border-l-4 border-l-blue-500" 
                          : "border-l-4 border-l-purple-500"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-lg">{getProjectName(allotment.projectId)}</h3>
                          <p className="text-sm text-muted-foreground">{getProjectClient(allotment.projectId)}</p>
                        </div>
                        <Badge 
                          variant={allotment.status === "Deployed" ? "default" : "secondary"}
                          className={
                            allotment.status === "Deployed" 
                              ? "bg-blue-500 hover:bg-blue-600" 
                              : "bg-purple-500 hover:bg-purple-600 text-white"
                          }
                        >
                          {allotment.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <p className="text-xs text-muted-foreground">Start Date</p>
                          <p className="font-medium">{formatDate(allotment.startDate)}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <p className="text-xs text-muted-foreground">End Date</p>
                          <p className="font-medium">{formatDate(allotment.endDate)}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm text-muted-foreground">Allocation</p>
                          <p className="text-sm font-medium">{allotment.allocationPercentage}%</p>
                        </div>
                        <Progress value={allotment.allocationPercentage} className="h-2" />
                      </div>
                      
                      {allotment.status === "Shadow" && allotment.shadowOf && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Shadowing</p>
                          <p className="font-medium text-sm">{getShadowingEmployee(allotment.shadowOf)}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Briefcase className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-center">No projects assigned to this employee</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <DialogFooter className="pt-4 border-t">
              <Button variant="outline" onClick={() => setShowViewModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )} */}

      {showViewModal && viewingEmployee && (
              <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      {viewingEmployee.name}'s Projects
                    </DialogTitle>
                    <DialogDescription>
                      View all projects this employee is assigned to
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[400px] overflow-auto pr-4">
                    <div className="space-y-4">
                      {viewingAllotments.length > 0 ? (
                        viewingAllotments.map((allotment) => (
                          <div key={allotment.id} className="border rounded-md p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">{getProjectName(allotment.projectId)}</h3>
                              <Badge variant={allotment.status === "Deployed" ? "default" : "secondary"}>
                                {allotment.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Start Date</p>
                                <p>{allotment.startDate}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Allocation</p>
                                <p>{allotment.allocationPercentage}%</p>
                              </div>
                              {allotment.status === "Shadow" && allotment.shadowOf && (
                                <div className="col-span-2">
                                  <p className="text-muted-foreground">Shadow of</p>
                                  <p>{getEmployeeName(
                                    allotments.find(a => a.id === allotment.shadowOf)?.employeeId
                                  )}</p>
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

export default EmployeeList;