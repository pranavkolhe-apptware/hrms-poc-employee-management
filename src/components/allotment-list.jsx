// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
// import { Button } from "./ui/button"
// import { Pencil, Trash2, PlusCircle, Eye } from "lucide-react"
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
//     status: "Deployed" 
//   },
//   { 
//     id: 2, 
//     employeeId: 2, 
//     projectId: 2, 
//     startDate: "2023-02-15", 
//     allocationPercentage: 75, 
//     status: "Shadow" 
//   },
//   { 
//     id: 3, 
//     employeeId: 3, 
//     projectId: 3, 
//     startDate: "2023-03-01", 
//     allocationPercentage: 100, 
//     status: "Deployed" 
//   },
//   { 
//     id: 4, 
//     employeeId: 4, 
//     projectId: 4, 
//     startDate: "2023-04-01", 
//     allocationPercentage: 50, 
//     status: "Shadow" 
//   },
//   { 
//     id: 5, 
//     employeeId: 5, 
//     projectId: 5, 
//     startDate: "2023-05-01", 
//     allocationPercentage: 100, 
//     status: "Deployed" 
//   },
//   { 
//     id: 6, 
//     employeeId: 6, 
//     projectId: 6, 
//     startDate: "2023-06-01", 
//     allocationPercentage: 80, 
//     status: "Deployed" 
//   },
//   { 
//     id: 7, 
//     employeeId: 7, 
//     projectId: 7, 
//     startDate: "2023-07-15", 
//     allocationPercentage: 100, 
//     status: "Shadow" 
//   },
//   { 
//     id: 8, 
//     employeeId: 8, 
//     projectId: 8, 
//     startDate: "2023-08-01", 
//     allocationPercentage: 60, 
//     status: "Deployed" 
//   },
//   { 
//     id: 9, 
//     employeeId: 9, 
//     projectId: 9, 
//     startDate: "2023-09-01", 
//     allocationPercentage: 100, 
//     status: "Shadow" 
//   },
//   { 
//     id: 10, 
//     employeeId: 10, 
//     projectId: 10, 
//     startDate: "2023-10-01", 
//     allocationPercentage: 90, 
//     status: "Deployed" 
//   },
//   { 
//     id: 11, 
//     employeeId: 1, 
//     projectId: 2, 
//     startDate: "2023-11-01", 
//     allocationPercentage: 50, 
//     status: "Shadow" 
//   },
//   { 
//     id: 12, 
//     employeeId: 2, 
//     projectId: 3, 
//     startDate: "2023-12-01", 
//     allocationPercentage: 100, 
//     status: "Deployed" 
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
//   const [viewingProject, setViewingProject] = useState(null)
//   const [viewingAllotments, setViewingAllotments] = useState([])
//   const [filter, setFilter] = useState("all")
//   const [currentPage, setCurrentPage] = useState(1)

//   const handleDelete = (id) => {
//     setAllotments(allotments.filter((allotment) => allotment.id !== id))
//   }

//   const handleEdit = (allotment) => {
//     setEditingAllotment(allotment)
//     setShowForm(true)
//   }

//   const handleView = (projectId) => {
//     const project = projects.find(p => p.id === projectId)
//     if (project) {
//       setViewingProject(project)
//       setViewingAllotments(allotments.filter(a => a.projectId === projectId))
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

//   // Filter allotments based on status
//   const filteredAllotments = filter === "all" 
//     ? allotments 
//     : allotments.filter(a => a.status === filter)

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredAllotments.length / ITEMS_PER_PAGE)
  
//   // Get current page items
//   const currentItems = filteredAllotments.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   )

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-end">
//         {/* <h2 className="text-2xl font-bold">Engagements</h2> */}
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
//               <TableHead className="text-center">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentItems.length > 0 ? (
//               currentItems.map((allotment) => (
//                 <TableRow key={allotment.id}>
//                   <TableCell className="font-medium">{getEmployeeName(allotment.employeeId)}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center">
//                       {getProjectName(allotment.projectId)}
//                       <Button 
//                         variant="ghost" 
//                         size="icon" 
//                         className="ml-2 h-6 w-6" 
//                         onClick={() => handleView(allotment.projectId)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex justify-center space-x-2">
//                       <Button variant="outline" size="icon" onClick={() => handleEdit(allotment)}>
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button 
//                         variant="outline" 
//                         size="icon" 
//                         onClick={() => handleDelete(allotment.id)}
//                         className="text-destructive hover:text-destructive"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
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
//           onClose={() => {
//             setShowForm(false)
//             setEditingAllotment(null)
//           }}
//           onSubmit={handleSubmit}
//         />
//       )}

//       {/* View Project Modal */}
//       {showViewModal && viewingProject && (
//         <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
//           <DialogContent className="sm:max-w-[600px]">
//             <DialogHeader>
//               <DialogTitle className="text-xl font-semibold">
//                 {viewingProject.name} Details
//               </DialogTitle>
//               <DialogDescription>
//                 View all team members assigned to this project
//               </DialogDescription>
//             </DialogHeader>
//             <ScrollArea className="max-h-[400px] overflow-auto pr-4">
//               <div className="space-y-4">
//                 {viewingAllotments.length > 0 ? (
//                   viewingAllotments.map((allotment) => (
//                     <div key={allotment.id} className="border rounded-md p-4 space-y-3">
//                       <div className="flex justify-between items-center">
//                         <h3 className="font-medium">{getEmployeeName(allotment.employeeId)}</h3>
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
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center py-4 text-muted-foreground">No allotments for this project</p>
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

// const AllotmentForm = ({ allotment, employees, projects, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState(
//     allotment || { 
//       id: 0, 
//       employeeId: 0, 
//       projectId: 0, 
//       startDate: "", 
//       allocationPercentage: 100, 
//       status: "Deployed" 
//     }
//   )
  
//   const [openEmployeeCombobox, setOpenEmployeeCombobox] = useState(false)
//   const [openProjectCombobox, setOpenProjectCombobox] = useState(false)

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
//               onValueChange={(value) => 
//                 setFormData(prev => ({ ...prev, status: value }))
//               }
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












// Working

"use client"

import React,{ useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Pencil, Trash2, PlusCircle, Eye, ChevronDown, ChevronRight, BriefcaseBusinessIcon, BriefcaseIcon } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { ScrollArea } from "./ui/scroll-area"
import { Slider } from "./ui/slider"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

// Demo data
const initialEmployees = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
  { id: 4, name: "Bob Williams" },
  { id: 5, name: "Charlie Brown" },
  { id: 6, name: "David Miller" },
  { id: 7, name: "Emma Wilson" },
  { id: 8, name: "Frank Thomas" },
  { id: 9, name: "Grace Davis" },
  { id: 10, name: "Henry Martin" },
]

const initialProjects = [
  { id: 1, name: "Project Alpha" },
  { id: 2, name: "Project Beta" },
  { id: 3, name: "Project Gamma" },
  { id: 4, name: "Project Delta" },
  { id: 5, name: "Project Epsilon" },
  { id: 6, name: "Project Zeta" },
  { id: 7, name: "Project Eta" },
  { id: 8, name: "Project Theta" },
  { id: 9, name: "Project Iota" },
  { id: 10, name: "Project Kappa" },
]

const initialAllotments = [
  { 
    id: 1, 
    employeeId: 1, 
    projectId: 1, 
    startDate: "2023-01-01", 
    allocationPercentage: 100, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 2, 
    employeeId: 2, 
    projectId: 2, 
    startDate: "2023-02-15", 
    allocationPercentage: 75, 
    status: "Shadow",
    shadowOf: 1
  },
  { 
    id: 3, 
    employeeId: 3, 
    projectId: 3, 
    startDate: "2023-03-01", 
    allocationPercentage: 100, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 4, 
    employeeId: 4, 
    projectId: 4, 
    startDate: "2023-04-01", 
    allocationPercentage: 50, 
    status: "Shadow",
    shadowOf: 3
  },
  { 
    id: 5, 
    employeeId: 5, 
    projectId: 5, 
    startDate: "2023-05-01", 
    allocationPercentage: 100, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 6, 
    employeeId: 6, 
    projectId: 6, 
    startDate: "2023-06-01", 
    allocationPercentage: 80, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 7, 
    employeeId: 7, 
    projectId: 7, 
    startDate: "2023-07-15", 
    allocationPercentage: 100, 
    status: "Shadow",
    shadowOf: 6
  },
  { 
    id: 8, 
    employeeId: 8, 
    projectId: 8, 
    startDate: "2023-08-01", 
    allocationPercentage: 60, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 9, 
    employeeId: 9, 
    projectId: 9, 
    startDate: "2023-09-01", 
    allocationPercentage: 100, 
    status: "Shadow",
    shadowOf: 8
  },
  { 
    id: 10, 
    employeeId: 10, 
    projectId: 10, 
    startDate: "2023-10-01", 
    allocationPercentage: 90, 
    status: "Deployed",
    shadowOf: null
  },
  { 
    id: 11, 
    employeeId: 1, 
    projectId: 2, 
    startDate: "2023-11-01", 
    allocationPercentage: 50, 
    status: "Shadow",
    shadowOf: 10
  },
  { 
    id: 12, 
    employeeId: 2, 
    projectId: 3, 
    startDate: "2023-12-01", 
    allocationPercentage: 100, 
    status: "Deployed",
    shadowOf: null
  },
]

const ITEMS_PER_PAGE = 7

const AllotmentList = () => {
  const [allotments, setAllotments] = useState(initialAllotments)
  const [employees] = useState(initialEmployees)
  const [projects] = useState(initialProjects)
  const [showForm, setShowForm] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingAllotment, setEditingAllotment] = useState(null)
  const [viewingEmployee, setViewingEmployee] = useState(null)
  const [viewingAllotments, setViewingAllotments] = useState([])
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedRows, setExpandedRows] = useState({})
  const [employeesWithShadows, setEmployeesWithShadows] = useState({})

  // Calculate which employees have shadows
  useEffect(() => {
    const shadowMap = {}
    allotments.forEach(allotment => {
      if (allotment.status === "Shadow" && allotment.shadowOf) {
        if (!shadowMap[allotment.shadowOf]) {
          shadowMap[allotment.shadowOf] = []
        }
        shadowMap[allotment.shadowOf].push(allotment)
      }
    })
    setEmployeesWithShadows(shadowMap)
  }, [allotments])

  const handleDelete = (id) => {
    setAllotments(allotments.filter((allotment) => allotment.id !== id))
  }

  const handleEdit = (allotment) => {
    setEditingAllotment(allotment)
    setShowForm(true)
  }

  const handleView = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId)
    if (employee) {
      setViewingEmployee(employee)
      setViewingAllotments(allotments.filter(a => a.employeeId === employeeId))
      setShowViewModal(true)
    }
  }

  const handleSubmit = (formData) => {
    if (editingAllotment) {
      setAllotments(allotments.map((allotment) => (allotment.id === formData.id ? formData : allotment)))
    } else {
      setAllotments([...allotments, { ...formData, id: Date.now() }])
    }
    setShowForm(false)
    setEditingAllotment(null)
  }

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId)
    return employee ? employee.name : "Unknown"
  }

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    return project ? project.name : "Unknown"
  }

  const toggleRowExpansion = (allotmentId) => {
    setExpandedRows(prev => ({
      ...prev,
      [allotmentId]: !prev[allotmentId]
    }))
  }

  const hasShadowEmployees = (allotmentId) => {
    return employeesWithShadows[allotmentId] && employeesWithShadows[allotmentId].length > 0
  }

  // Get deployed employees for shadow selection
  const getDeployedEmployees = () => {
    const deployedAllotments = allotments.filter(a => a.status === "Deployed")
    return deployedAllotments.map(a => {
      const employee = employees.find(e => e.id === a.employeeId)
      return {
        allotmentId: a.id,
        employeeId: a.employeeId,
        name: employee ? employee.name : "Unknown",
        project: getProjectName(a.projectId)
      }
    })
  }

  // Filter allotments based on status
  const filteredAllotments = filter === "all" 
    ? allotments 
    : allotments.filter(a => a.status === filter)

  // Get top-level allotments (not shadows)
  const topLevelAllotments = filteredAllotments.filter(a => a.status !== "Shadow" || !a.shadowOf)

  // Calculate total pages
  const totalPages = Math.ceil(topLevelAllotments.length / ITEMS_PER_PAGE)
  
  // Get current page items
  const currentItems = topLevelAllotments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] border-input hover:border-neutral-400 transition-colors">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Deployed">Deployed</SelectItem>
              <SelectItem value="Shadow">Shadow</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Allotment
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
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length > 0 ? (
              currentItems.map((allotment) => (
                <React.Fragment key={allotment.id}>
                  <TableRow 
                    className={cn(
                      hasShadowEmployees(allotment.id) ? "bg-gray-50 dark:bg-blue-950/30" : "bg-blue-50",
                      expandedRows[allotment.id] ? "border-b-0" : ""
                    )}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {hasShadowEmployees(allotment.id) && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="mr-2 h-6 w-6 p-0" 
                            onClick={() => toggleRowExpansion(allotment.id)}
                          >
                            {expandedRows[allotment.id] ? 
                              <ChevronDown className="h-4 w-4" /> : 
                              <ChevronRight className="h-4 w-4" />
                            }
                          </Button>
                        )}
                        {getEmployeeName(allotment.employeeId)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {/* {getProjectName(allotment.projectId)} */}
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleView(allotment.employeeId)}
                          title="View employee projects"
                        >
                          {/* <Eye className="h-4 w-4" /> */}
                          <BriefcaseIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={allotment.status === "Deployed" ? "default" : "secondary"}>
                        {allotment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-2">
                        {/* <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleView(allotment.employeeId)}
                          title="View employee projects"
                        >
                          <Eye className="h-4 w-4" />
                        </Button> */}
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleEdit(allotment)}
                          title="Edit allotment"
                          disabled
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDelete(allotment.id)}
                          className="text-destructive hover:text-destructive"
                          title="Delete allotment"
                          disabled
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* Shadow Employees Rows */}
                  {expandedRows[allotment.id] && employeesWithShadows[allotment.id] && (
                    <TableRow className="bg-white dark:bg-blue-950/20">
                      <TableCell colSpan={4}>
                        <div className="pl-10 mt-[-7px] mb-[-7px]">
                          {/* <div className="text-sm font-medium text-muted-foreground mb-2">
                            Shadow Employees
                          </div> */}
                          <Table>
                            {/* <TableHeader>
                              <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Project</TableHead>
                                <TableHead>Allocation</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                              </TableRow>
                            </TableHeader> */}
                            <TableBody className="py-0">
                              {employeesWithShadows[allotment.id].map(shadowAllotment => (
                                <TableRow key={shadowAllotment.id}>
                                  <TableCell className="font-medium">
                                    {getEmployeeName(shadowAllotment.employeeId)}
                                  </TableCell>
                                  <TableCell>
                                    {getProjectName(shadowAllotment.projectId)}
                                  </TableCell>
                                  <TableCell>
                                    {shadowAllotment.allocationPercentage}%
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex justify-center space-x-2">
                                      <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => handleEdit(shadowAllotment)}
                                        title="Edit allotment"
                                        disabled
                                      >
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => handleDelete(shadowAllotment.id)}
                                        className="text-destructive hover:text-destructive"
                                        title="Delete allotment"
                                        disabled
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
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No allotments found
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
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              &lt;
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              &gt;
            </Button>
          </div>
        </div>
      )}

      {/* Add/Edit Allotment Form */}
      {showForm && (
        <AllotmentForm
          allotment={editingAllotment}
          employees={employees}
          projects={projects}
          deployedEmployees={getDeployedEmployees()}
          onClose={() => {
            setShowForm(false)
            setEditingAllotment(null)
          }}
          onSubmit={handleSubmit}
        />
      )}

      {/* View Employee Projects Modal */}
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
  )
}

const AllotmentForm = ({ allotment, employees, projects, deployedEmployees, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    allotment || { 
      id: 0, 
      employeeId: 0, 
      projectId: 0, 
      startDate: "", 
      allocationPercentage: 100, 
      status: "Deployed",
      shadowOf: null
    }
  )
  
  const [openEmployeeCombobox, setOpenEmployeeCombobox] = useState(false)
  const [openProjectCombobox, setOpenProjectCombobox] = useState(false)
  const [openShadowCombobox, setOpenShadowCombobox] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleAllocationChange = (value) => {
    setFormData(prev => ({ ...prev, allocationPercentage: value[0] }))
  }

  const handleStatusChange = (value) => {
    setFormData(prev => ({ 
      ...prev, 
      status: value,
      // Reset shadowOf if changing from Shadow to Deployed
      shadowOf: value === "Deployed" ? null : prev.shadowOf
    }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {allotment ? "Edit Allotment" : "Add New Allotment"}
          </DialogTitle>
          <DialogDescription>
            {allotment ? "Update the details of this engagement" : "Create a new project engagement"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Employee Selection */}
          <div className="space-y-2">
            <Label htmlFor="employee" className="text-sm font-medium">Employee</Label>
            <Popover open={openEmployeeCombobox} onOpenChange={setOpenEmployeeCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openEmployeeCombobox}
                  className="w-full justify-between border-input hover:border-neutral-400 transition-colors"
                >
                  {formData.employeeId ? 
                    employees.find(employee => employee.id === formData.employeeId)?.name : 
                    "Select employee..."}
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
                              setFormData(prev => ({ ...prev, employeeId: employee.id }))
                              setOpenEmployeeCombobox(false)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.employeeId === employee.id ? "opacity-100" : "opacity-0"
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
          </div>

          {/* Project Selection */}
          <div className="space-y-2">
            <Label htmlFor="project" className="text-sm font-medium">Project</Label>
            <Popover open={openProjectCombobox} onOpenChange={setOpenProjectCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProjectCombobox}
                  className="w-full justify-between border-input hover:border-neutral-400 transition-colors"
                >
                  {formData.projectId ? 
                    projects.find(project => project.id === formData.projectId)?.name : 
                    "Select project..."}
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
                            value={project.name}
                            onSelect={() => {
                              setFormData(prev => ({ ...prev, projectId: project.id }))
                              setOpenProjectCombobox(false)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.projectId === project.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {project.name}
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              className="border-input hover:border-neutral-400 transition-colors"
              required
            />
          </div>

          {/* Engagement Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">Engagement Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="border-input hover:border-neutral-400 transition-colors">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Deployed">Deployed</SelectItem>
                <SelectItem value="Shadow">Shadow</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Shadow Of Selection - Only shown when status is Shadow */}
          {formData.status === "Shadow" && (
            <div className="space-y-2">
              <Label htmlFor="shadowOf" className="text-sm font-medium">Shadow Of</Label>
              <Popover open={openShadowCombobox} onOpenChange={setOpenShadowCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openShadowCombobox}
                    className="w-full justify-between border-input hover:border-neutral-400 transition-colors"
                  >
                    {formData.shadowOf ? 
                      deployedEmployees.find(e => e.allotmentId === formData.shadowOf)?.name + 
                      ` (${deployedEmployees.find(e => e.allotmentId === formData.shadowOf)?.project})` : 
                      "Select employee to shadow..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search deployed employee..." />
                    <CommandList>
                      <CommandEmpty>No deployed employee found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-[200px]">
                          {deployedEmployees.map((employee) => (
                            <CommandItem
                              key={employee.allotmentId}
                              value={`${employee.name} (${employee.project})`}
                              onSelect={() => {
                                setFormData(prev => ({ 
                                  ...prev, 
                                  shadowOf: employee.allotmentId,
                                  // Optionally set the same project as the shadowed employee
                                  projectId: projects.find(p => p.name === employee.project)?.id || prev.projectId
                                }))
                                setOpenShadowCombobox(false)
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.shadowOf === employee.allotmentId ? "opacity-100" : "opacity-0"
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
            >
              Cancel
            </Button>
            <Button type="submit">
              {allotment ? "Update" : "Add"} Allotment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AllotmentList

export { AllotmentList }