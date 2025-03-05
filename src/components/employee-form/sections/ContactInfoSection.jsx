import React from "react"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Separator } from "../../ui/separator"
import { AlertCircle } from "lucide-react"

import {cn} from "../../../lib/utils";

const ContactInfoSection = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
        <Separator className="flex-1 ml-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="personalEmail" className="text-sm">
            Personal Email
          </Label>
          <Input
            id="personalEmail"
            name="personalEmail"
            type="email"
            value={formData.personalEmail}
            onChange={handleChange}
            className={cn(
              "transition-colors focus:border-primary",
              errors.personalEmail ? "border-destructive" : "border-input hover:border-neutral-400"
            )}
          />
          {errors.personalEmail && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.personalEmail}</p>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="officeEmail" className="text-sm">
            Office Email
          </Label>
          <Input
            id="officeEmail"
            name="officeEmail"
            type="email"
            value={formData.officeEmail}
            onChange={handleChange}
            className={cn(
              "transition-colors focus:border-primary",
              errors.officeEmail ? "border-destructive" : "border-input hover:border-neutral-400"
            )}
          />
          {errors.officeEmail && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.officeEmail}</p>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactNumber" className="text-sm">
            Contact Number
          </Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="10-digit number"
            className={cn(
              "transition-colors focus:border-primary",
              errors.contactNumber ? "border-destructive" : "border-input hover:border-neutral-400"
            )}
          />
          {errors.contactNumber && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.contactNumber}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactInfoSection