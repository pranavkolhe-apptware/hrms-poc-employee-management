import React from "react"
import { ScrollArea } from "../ui/scroll-area"
import PersonalInfoSection from "./sections/PersonalInfoSection"
import ContactInfoSection from "./sections/ContactInfoSection"
import EmploymentDetailsSection from "./sections/EmployementDetailsSection"
import SkillsSection from "./sections/SkillsSection"

const EmployeeFormContent = ({ formData, setFormData, errors, setErrors, isEditing }) => {
  return (
    <ScrollArea className="px-6 py-4 max-h-[calc(90vh-130px)]">
      <form className="space-y-6">
        <PersonalInfoSection
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          isEditing={isEditing}
        />
        <ContactInfoSection
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
        <EmploymentDetailsSection
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
        <SkillsSection
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      </form>
    </ScrollArea>
  )
}

export default EmployeeFormContent