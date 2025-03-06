import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import PersonalInfoSection from "./employee-form/sections/PersonalInfoSection";
import EmploymentDetailsSection from "./employee-form/sections/EmployementDetailsSection";
import SkillsSection from "./employee-form/sections/SkillsSection";
import { toast } from "sonner";

const EmployeeForm = ({ employee, onClose, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    personalEmail: "",
    officeEmail: "",
    contactNumber: "",
    employeeId: "",
    dateOfBirth: "",
    dateOfJoining: new Date().toISOString().split("T")[0],
    designation: "",
    department: "TECHNOLOGY",
    status: "NON_BILLABLE",
    primarySkills: [],
    secondarySkills: [],
    totalYrExp: "",
    reportingManager: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee && isEditing) {
      const updatedFormData = {
        ...employee,
        dateOfBirth: formatDateForForm(employee.dateOfBirth),
        dateOfJoining: formatDateForForm(employee.dateOfJoining),
        reportingManager: employee.reportingManager?.toString()
      };
      setFormData(updatedFormData);
    }
  }, [employee, isEditing]);

  const formatDateForForm = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatDateForAPI = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.personalEmail.trim()) {
      newErrors.personalEmail = "Email is required";
    } else if (!emailRegex.test(formData.personalEmail)) {
      newErrors.personalEmail = "Invalid email format";
    }
    // office email must end with @apptware.com
    if (!formData.officeEmail.trim()) {
      newErrors.officeEmail = "Office email is required";
    } else if (!emailRegex.test(formData.officeEmail)) {
      newErrors.officeEmail = "Invalid email format";
    } else if (!formData.officeEmail.endsWith("@apptware.com")) {
      newErrors.officeEmail = "Office email must end with @apptware.com";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!phoneRegex.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }
    if (!isEditing && !formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.dateOfJoining) newErrors.dateOfJoining = "Date of joining is required";
    if (!formData.totalYrExp) newErrors.totalYrExp = "Years of experience is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    // if (!formData.reportingManager) newErrors.reportingManager = "Reporting manager is required";
    if (formData.primarySkills.length === 0) newErrors.primarySkills = "At least one primary skill is required";

    setErrors(newErrors);
    if(Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields correctly");
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setLoading(true);
    try {
      const apiData = {
        name: formData.name,
        contactNumber: formData.contactNumber,
        personalEmail: formData.personalEmail,
        officeEmail: formData.officeEmail,
        employeeId: Number.parseInt(formData.employeeId),
        dateOfBirth: formatDateForAPI(formData.dateOfBirth),
        dateOfJoining: formatDateForAPI(formData.dateOfJoining),
        totalYrExp: Number.parseFloat(formData.totalYrExp),
        primarySkills: [...new Set(formData.primarySkills.map((skill) => skill.toUpperCase()))],
        secondarySkills: [...new Set(formData.secondarySkills.map((skill) => skill.toUpperCase()))],


        designation: formData.designation,
        department: formData.department,
        reportingManager: Number.parseInt(formData.reportingManager),
        status: formData.status
      };


      const url = isEditing
        ? `${import.meta.env.VITE_BACKEND_API_URL}employee/update?id=${formData.id}`
        : `${import.meta.env.VITE_BACKEND_API_URL}employee/add`;

        console.log("API Data", apiData);
      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      console.log("Response", response);

      if (!response.ok) {
        const errorData = await response.text();
        toast.error(errorData || `Failed to ${isEditing ? "update" : "add"} employee`);
        throw new Error(errorData || `Failed to ${isEditing ? "update" : "add"} employee`);
      }

      toast.success(
        isEditing
          ? `Employee ${formData.name} has been updated successfully`
          : `Employee ${formData.name} has been added successfully`
      );

      onSubmit(formData);
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "adding"} employee:`, error);
      toast.error(error.message || `Failed to ${isEditing ? "update" : "add"} employee`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold text-primary">
            {isEditing ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {isEditing ? "Update employee information below." : "Fill in the employee details below."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="px-6 py-4 max-h-[calc(90vh-130px)]">
          <form className="space-y-6">
            <PersonalInfoSection
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              isEditing={isEditing}
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
          <DialogFooter className="px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-input hover:border-neutral-400 transition-colors"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : isEditing ? "Update" : "Add"} Employee
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;