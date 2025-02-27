// import React from 'react'

// const People = () => {
//   return (
//     <div>People</div>
//   )
// }

// export default People





"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { PlusCircle } from "lucide-react"
import SearchBar from "../components/search-bar"
import EmployeeList from "../components/employee-list"
import ProjectList from "../components/project-list"
import AllotmentList from "../components/allotment-list"
import EmployeeForm from "../components/employee-form"




const People = () => {
  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("employees")

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Employee Management</h1>
      <div className="flex justify-between items-center">
        <SearchBar onSearch={setSearchTerm} />
        <Button onClick={() => setShowEmployeeForm(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Employee
        </Button>
      </div>
      <Tabs defaultValue="employees" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="allotment">Allotment</TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          <EmployeeList searchTerm={searchTerm} />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectList />
        </TabsContent>
        <TabsContent value="allotment">
          <AllotmentList />
        </TabsContent>
      </Tabs>
      {showEmployeeForm && <EmployeeForm onClose={() => setShowEmployeeForm(false)} activeTab={activeTab} />}
    </div>
  )
}

export default People

