"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Button } from "../components/ui/button"
import { Pencil, Trash2, BriefcaseIcon } from "lucide-react"
import EmployeeForm from "./employee-form"
import { Badge } from "../components/ui/badge"



const initialEmployees = [
  {
    id: 1,
    name: "John Doe",
    dob: "1990-05-15",
    email: "john@example.com",
    contact: "1234567890",
    primarySkills: ["React", "Node.js"],
    secondarySkills: ["Python", "SQL"],
  },
  {
    id: 2,
    name: "Jane Smith",
    dob: "1988-09-22",
    email: "jane@example.com",
    contact: "9876543210",
    primarySkills: ["Angular", "Java"],
    secondarySkills: ["C#", "MongoDB"],
  },
  {
    id: 3,
    name: "Alice Johnson",
    dob: "1992-03-10",
    email: "alice@example.com",
    contact: "5551234567",
    primarySkills: ["Vue.js", "PHP"],
    secondarySkills: ["MySQL", "Docker"],
  },
  {
    id: 4,
    name: "Bob Williams",
    dob: "1985-11-30",
    email: "bob@example.com",
    contact: "7778889999",
    primarySkills: ["React Native", "Swift"],
    secondarySkills: ["Kotlin", "Firebase"],
  },
  {
    id: 5,
    name: "Charlie Brown",
    dob: "1993-07-07",
    email: "charlie@example.com",
    contact: "3334445555",
    primarySkills: ["Django", "PostgreSQL"],
    secondarySkills: ["Redis", "Nginx"],
  },
  {
    id: 6,
    name: "Diana Clark",
    dob: "1991-01-25",
    email: "diana@example.com",
    contact: "2223334444",
    primarySkills: ["Ruby on Rails", "GraphQL"],
    secondarySkills: ["AWS", "Heroku"],
  },
  {
    id: 7,
    name: "Ethan Hunt",
    dob: "1987-06-18",
    email: "ethan@example.com",
    contact: "6667778888",
    primarySkills: ["ASP.NET", "C#"],
    secondarySkills: ["Azure", "TypeScript"],
  },
  {
    id: 8,
    name: "Fiona Green",
    dob: "1994-12-03",
    email: "fiona@example.com",
    contact: "1112223333",
    primarySkills: ["Flutter", "Dart"],
    secondarySkills: ["Firebase", "Git"],
  },
  {
    id: 9,
    name: "George Lee",
    dob: "1989-08-20",
    email: "george@example.com",
    contact: "4445556666",
    primarySkills: ["Go", "Kubernetes"],
    secondarySkills: ["Docker", "Prometheus"],
  },
  {
    id: 10,
    name: "Hannah White",
    dob: "1995-04-12",
    email: "hannah@example.com",
    contact: "8889990000",
    primarySkills: ["Unity", "C#"],
    secondarySkills: ["Blender", "3D Modeling"],
  },
]

const EmployeeList = ({ searchTerm }) => {
  const [employees, setEmployees] = useState(initialEmployees)
  const [editingEmployee, setEditingEmployee] = useState(null)

  const filteredEmployees = employees.filter((employee) =>
    Object.values(employee).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  const handleEdit = (employee) => {
    setEditingEmployee(employee)
  }

  const handleUpdate = (updatedEmployee) => {
    setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)))
    setEditingEmployee(null)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Primary Skills</TableHead>
            <TableHead>Secondary Skills</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.dob}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.contact}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {employee.primarySkills.map((skill, index) => (
                    <Badge key={index}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {employee.secondarySkills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(employee)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(employee.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <BriefcaseIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingEmployee && (
        <EmployeeForm employee={editingEmployee} onClose={() => setEditingEmployee(null)} onSubmit={handleUpdate} />
      )}
    </div>
  )
}

export default EmployeeList

