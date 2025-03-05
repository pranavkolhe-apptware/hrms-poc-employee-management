import React from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import { AlertCircle } from "lucide-react";
import { cn } from "../../../lib/utils";

const PersonalInfoSection = ({ formData, setFormData, errors, setErrors, isEditing }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
        <Separator className="flex-1 ml-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "transition-colors focus:border-primary",
              errors.name ? "border-destructive" : "border-input hover:border-neutral-400"
            )}
          />
          {errors.name && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.name}</p>
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

        <div className="space-y-2">
          <Label htmlFor="personalEmail" className="text-sm">
            Personal Email
          </Label>
          <Input
            id="personalEmail"
            name="personalEmail"
            type="personalEmail"
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
                type="officeEmail"
                value={formData.officeEmail || "NA"}
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

        {!isEditing && (
          <div className="space-y-2">
            <Label htmlFor="employeeId" className="text-sm">
              Employee ID
            </Label>
            <Input
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className={cn(
                "transition-colors focus:border-primary",
                errors.employeeId ? "border-destructive" : "border-input hover:border-neutral-400"
              )}
            />
            {errors.employeeId && (
              <div className="flex items-center text-xs text-destructive mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                <p>{errors.employeeId}</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm">
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={cn(
              "transition-colors focus:border-primary",
              errors.dateOfBirth ? "border-destructive" : "border-input hover:border-neutral-400"
            )}
          />
          {errors.dateOfBirth && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.dateOfBirth}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;