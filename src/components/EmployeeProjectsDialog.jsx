import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Badge } from "./ui/badge"

const EmployeeProjectsDialog = ({ employee, open, onClose }) => {
  // Mock data - replace with actual data from your application
  const allotments = [
    {
      id: 1,
      employeeId: 1,
      projectId: 1,
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      allocationPercentage: 100,
      status: "Deployed",
      shadowOf: null,
    },
    // Add more allotments as needed
  ]

  const projects = [
    { id: 1, name: "Project Alpha", client: "Acme Corp" },
    // Add more projects as needed
  ]

  const getProjectName = (projectId) => {
    const project = projects.find((p) => p.id === projectId)
    return project ? project.name : "Unknown Project"
  }

  const employeeAllotments = allotments.filter((a) => a.employeeId === employee.id)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{employee.name}'s Projects</DialogTitle>
          <DialogDescription>View all projects this employee is assigned to</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] overflow-auto pr-4">
          <div className="space-y-4">
            {employeeAllotments.length > 0 ? (
              employeeAllotments.map((allotment) => (
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
  )
}

export default EmployeeProjectsDialog