import React from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"

const EmployeeFormHeader = ({ isEditing }) => {
  return (
    <DialogHeader className="px-6 pt-6 pb-2">
      <DialogTitle className="text-xl font-semibold text-primary">
        {isEditing ? "Edit Employee" : "Add New Employee"}
      </DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground">
        {isEditing ? "Update employee information below." : "Fill in the employee details below."}
      </DialogDescription>
    </DialogHeader>
  )
}

export default EmployeeFormHeader