import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, BriefcaseIcon, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';

const AllotmentTable = ({ 
  currentItems, 
  expandedRows, 
  toggleRowExpansion, 
  handleView, 
  handleEdit,
  handleDelete,
}) => {
  const [deletingIds, setDeletingIds] = useState(new Set());

  const handleDeleteClick = async (allotmentId, employeeId) => {
    try {
      setDeletingIds(prev => new Set([...prev, allotmentId]));
      
      // First check if the employee has any shadows
      const engagementResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/engagement/${employeeId}`);
      const engagementData = await engagementResponse.json();

      console.log('engagementData:', engagementData);

      // If employee has shadows and is deployed, prevent deletion
      // if (engagementData.employeeStatus === "DEPLOYED" && engagementData.listOfShadows?.length > 0) {
      //   toast.error('Cannot delete deployed employee with shadows');
      //   return;
      // }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/engagement/${allotmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error(`Failed to delete allotment with id: ${allotmentId}`);
        throw new Error('Failed to delete allotment');
      }

      toast.success(`Allotment deleted successfully with id: ${allotmentId}`);
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

  const isDeleteDisabled = (allotment) => {
    return allotment.employeeStatus === "DEPLOYED" && allotment.listOfShadows?.length > 0;
  };

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
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleDeleteClick(allotment.allotmentId, allotment.employeeId)}
                      className="text-destructive hover:text-destructive"
                      title="Delete allotment"
                      disabled={isDeleteDisabled(allotment) || deletingIds.has(allotment.allotmentId)}
                    >
                      {deletingIds.has(allotment.allotmentId) ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              
              {/* Shadow Employees Rows */}
              {expandedRows[allotment.allotmentId] && allotment.listOfShadows?.length > 0 && (
                <TableRow className="bg-white dark:bg-blue-950/20">
                  <TableCell colSpan={4}>
                    <div className="pl-10">
                      <Table>
                        <TableBody>
                          {allotment.listOfShadows.map(shadow => (
                            <TableRow key={shadow.shadowId || shadow.allotmentId}>
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
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    onClick={() => handleDeleteClick(shadow.allotmentId, shadow.employeeId)}
                                    className="text-destructive hover:text-destructive"
                                    title="Delete allotment"
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