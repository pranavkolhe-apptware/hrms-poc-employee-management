import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Pencil, Trash2, Search, PlusCircle } from "lucide-react"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Progress } from "./ui/progress"
import EmployeeForm from "./employee-form"
import EmployeeSkillBadges from "./EmployeeSkillBadges"
import EmployeeStatusBadge from "./EmployeeStatusBadge"
import EmployeeProjectsDialog from "./EmployeeProjectsDialog"
import EmployeeDeleteDialog from "./EmployeeDeleteDialog"
import EmployeePagination from "./EmployeePagination"
import { toast } from "sonner"

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [nameOrIdSearch, setNameOrIdSearch] = useState("")
  const [skillSearch, setSkillSearch] = useState("")
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingEmployee, setViewingEmployee] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7



  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/listEmployees`)

      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      const transformedData = data.map((emp) => ({
        id: emp.id,
        name: emp.name,
        yoe: emp.totalYrExp,
        primarySkills: emp.primarySkills || [],
        secondarySkills: emp.secondarySkills || [],
        status: emp.status === "NON_BILLABLE" ? "Non-Billable" : "Billable",
        personalEmail: emp.personalEmail || "",
        officeEmail: emp.officeEmail || "",
        contactNumber: emp.contactNumber || "",
        employeeId: emp.employeeId || 0,
        dateOfBirth: emp.dateOfBirth || "",
        dateOfJoining: emp.dateOfJoining || "",
        designation: emp.designation || "",
        department: emp.department || "",
        totalYrExp: emp.totalYrExp || 0,
        reportingManager: emp.reportingManager || "",
      }))

      setEmployees(transformedData)
      setError(null)
    } catch (err) {
      console.error("Error fetching employees:", err)
      toast.error("Failed to load employees. Please try again later.")
      setError("Failed to load employees. Please try again later.")
      setEmployees([])
    } finally {
      setLoading(false)
    }
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesNameOrId =
      employee.name.toLowerCase().includes(nameOrIdSearch.toLowerCase()) ||
      employee.id.toString().includes(nameOrIdSearch)

    const matchesSkills =
      skillSearch === "" ||
      employee.primarySkills.some((skill) => skill.toLowerCase().includes(skillSearch.toLowerCase())) ||
      employee.secondarySkills.some((skill) => skill.toLowerCase().includes(skillSearch.toLowerCase()))

    return matchesNameOrId && matchesSkills
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleDelete = async () => {
    if (!employeeToDelete) return

    try {
      setDeleteLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/delete?id=${employeeToDelete.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEmployees(employees.filter((emp) => emp.id !== employeeToDelete.id))
        toast.success(`Employee ${employeeToDelete.name} has been deleted successfully`);
      } else {
        toast.error(`Failed to delete employee. Status: ${response.status}`);
        throw new Error(`Failed to delete employee. Status: ${response.status}`)
      }
    } catch (err) {
      console.error("Error deleting employee:", err)
      toast.error("Failed to delete employee. Please try again later.")
    } finally {
      setDeleteLoading(false)
      setDeleteDialogOpen(false)
      setEmployeeToDelete(null)
    }
  }

  const handleUpdate = async (updatedEmployee) => {
    await fetchEmployees()
    setEditingEmployee(null)
  }

  const handleAdd = async (newEmployee) => {
    await fetchEmployees()
    setIsAddingEmployee(false)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-full max-w-md">
          <Progress value={undefined} className="h-2 mb-4" />
          <p className="text-center text-gray-500">Loading employees...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md max-w-md">
          <p className="font-medium">Error loading data</p>
          <p className="text-sm">{error}</p>
          <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => fetchEmployees()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 mt-3 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Employee ID or Name"
            className="pl-10 border-gray-300 focus:border-blue-400 transition-colors duration-200 rounded-md shadow-sm"
            value={nameOrIdSearch}
            onChange={(e) => {
              setNameOrIdSearch(e.target.value)
              setCurrentPage(1)
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
              setSkillSearch(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={() => setIsAddingEmployee(true)} className="w-fit">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Employee
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[430px] rounded-md border shadow-sm">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow className="bg-gray-50 dark:bg-gray-800">
              <TableHead className="w-[80px] font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">YOE</TableHead>
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
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 mb-4 cursor-pointer"
                  onClick={() => {
                    setViewingEmployee(employee)
                    setShowViewModal(true)
                  }}
                >
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>{employee.yoe}</TableCell>
                  <TableCell>
                    <EmployeeSkillBadges skills={employee.primarySkills} type="primary" />
                  </TableCell>
                  <TableCell>
                    <EmployeeSkillBadges skills={employee.secondarySkills} type="secondary" />
                  </TableCell>
                  <TableCell>
                    <EmployeeStatusBadge status={employee.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingEmployee(employee)
                        }}
                        className="border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors p-2 rounded"
                      >
                        <Pencil className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEmployeeToDelete(employee)
                          setDeleteDialogOpen(true)
                        }}
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
        <EmployeePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {(editingEmployee || isAddingEmployee) && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={() => {
            setEditingEmployee(null)
            setIsAddingEmployee(false)
          }}
          onSubmit={editingEmployee ? handleUpdate : handleAdd}
          isEditing={!!editingEmployee}
        />
      )}

      {showViewModal && viewingEmployee && (
        <EmployeeProjectsDialog
          employee={viewingEmployee}
          open={showViewModal}
          onClose={() => setShowViewModal(false)}
        />
      )}

      <EmployeeDeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        employee={employeeToDelete}
        loading={deleteLoading}
      />
    </div>
  )
}

export default EmployeeList