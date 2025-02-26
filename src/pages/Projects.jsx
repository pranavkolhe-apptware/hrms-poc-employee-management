import React from 'react'
import ProjectTable from '../components/ui/project-table'
import { Toaster } from "react-hot-toast"
const Projects = () => {
  return (
    <div>
      <Toaster />
      <ProjectTable />
    </div>
  )
}

export default Projects