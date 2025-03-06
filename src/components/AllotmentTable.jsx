import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, BriefcaseIcon, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const AllotmentTable = ({ 
  currentItems, 
  expandedRows, 
  toggleRowExpansion, 
  handleView, 
  handleEdit, 
  handleDelete,
  employeesWithShadows 
}) => {
  return (
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
            <React.Fragment key={allotment.allotmentId}>
              <TableRow 
                className={cn(
                  allotment.listOfShadows?.length > 0 ? "bg-gray-50 dark:bg-blue-950/30" : "bg-blue-50",
                  expandedRows[allotment.allotmentId] ? "border-b-0" : ""
                )}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {allotment.listOfShadows?.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="mr-2 h-6 w-6 p-0" 
                        onClick={() => toggleRowExpansion(allotment.allotmentId)}
                      >
                        {expandedRows[allotment.allotmentId] ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </Button>
                    )}
                    {allotment.employeeName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleView(allotment.employeeId)}
                      title="View employee projects"
                    >
                      <BriefcaseIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={allotment.employeeStatus === "DEPLOYED" ? "default" : "secondary"}>
                    {allotment.employeeStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <div className="cursor-not-allowed hover:cursor-[block]">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(allotment)}
                        title="Edit allotment"
                        disabled
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="cursor-not-allowed hover:cursor-[block]">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDelete(allotment.allotmentId)}
                        className="text-destructive hover:text-destructive"
                        title="Delete allotment"
                        disabled
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              
              {/* Shadow Employees Rows */}
              {expandedRows[allotment.allotmentId] && allotment.listOfShadows?.length > 0 && (
                <TableRow className="bg-white dark:bg-blue-950/20">
                  <TableCell colSpan={4}>
                    <div className="pl-10 mt-[-7px] mb-[-7px]">
                      <Table>
                        <TableBody className="py-0">
                          {allotment.listOfShadows.map(shadow => (
                            <TableRow key={shadow.shadowId}>
                              <TableCell className="font-medium">
                                {shadow.employeeName}
                              </TableCell>
                              <TableCell>
                                {shadow.shadowProject}
                              </TableCell>
                              <TableCell>
                                {shadow.employeeAllocationPercent}
                              </TableCell>
                              <TableCell>
                                <div className="flex justify-center space-x-2">
                                  <div className="cursor-not-allowed hover:cursor-[block]">
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      onClick={() => handleEdit(shadow)}
                                      title="Edit allotment"
                                      disabled
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="cursor-not-allowed hover:cursor-[block]">
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      onClick={() => handleDelete(shadow.shadowId)}
                                      className="text-destructive hover:text-destructive"
                                      title="Delete allotment"
                                      disabled
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
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
  );
};

export default AllotmentTable;






// import { Button } from "../components/ui/button"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

// const allotments = [
//   {
//     id: 1,
//     employee: "John Doe",
//     project: "Website Redesign",
//     startDate: "2023-01-15",
//     endDate: "2023-06-30",
//     role: "Frontend Developer",
//   },
//   {
//     id: 2,
//     employee: "Jane Smith",
//     project: "Mobile App Development",
//     startDate: "2023-03-20",
//     endDate: "2023-09-15",
//     role: "Project Manager",
//   },
//   {
//     id: 3,
//     employee: "Bob Johnson",
//     project: "Data Migration",
//     startDate: "2023-02-01",
//     endDate: "2023-04-30",
//     role: "Database Administrator",
//   },
// ]

// export function AllotmentTable() {
//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between">
//         <h2 className="text-2xl font-bold">Allotments</h2>
//         <Button>Add Allotment</Button>
//       </div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Employee</TableHead>
//             <TableHead>Project</TableHead>
//             <TableHead>Start Date</TableHead>
//             <TableHead>End Date</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {allotments.map((allotment) => (
//             <TableRow key={allotment.id}>
//               <TableCell>{allotment.employee}</TableCell>
//               <TableCell>{allotment.project}</TableCell>
//               <TableCell>{allotment.startDate}</TableCell>
//               <TableCell>{allotment.endDate}</TableCell>
//               <TableCell>{allotment.role}</TableCell>
//               <TableCell>
//                 <Button variant="outline" className="mr-2">
//                   Edit
//                 </Button>
//                 <Button variant="destructive">Delete</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

