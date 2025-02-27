"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { X } from "lucide-react"


const EmployeeForm = ({ employee, onClose, onSubmit, activeTab }) => {
  const [formData, setFormData] = useState(
    employee || {
      id: Date.now(),
      name: "",
      dob: "",
      email: "",
      contact: "",
      primarySkills: [],
      secondarySkills: [],
    },
  )
  const [newSkill, setNewSkill] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const addSkill = (type) => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (type, skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((skill) => skill !== skillToRemove),
    }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{employee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>
          <div>
            <Label>Primary Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.primarySkills.map((skill, index) => (
                <Badge key={index} variant="default">
                  {skill}
                  <button type="button" onClick={() => removeSkill("primarySkills", skill)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a primary skill" />
              <Button type="button" onClick={() => addSkill("primarySkills")}>
                Add
              </Button>
            </div>
          </div>
          <div>
            <Label>Secondary Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.secondarySkills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                  <button type="button" onClick={() => removeSkill("secondarySkills", skill)} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a secondary skill"
              />
              <Button type="button" onClick={() => addSkill("secondarySkills")}>
                Add
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{employee ? "Update" : "Add"} Employee</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeForm

