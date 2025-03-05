import React from "react"
import { Badge } from "./ui/badge"

const EmployeeStatusBadge = ({ status }) => {
  return (
    <Badge
      variant={status === "Billable" ? "default" : "outline"}
      className={
        status === "Billable"
          ? "px-2 py-1 rounded-3xl bg-orange-500"
          : "border border-amber-500 text-amber-500 hover:bg-amber-50 transition-colors px-2 py-1 rounded-3xl"
      }
    >
      {status}
    </Badge>
  )
}

export default EmployeeStatusBadge