import React, { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Separator } from "../../ui/separator";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../../lib/utils";

const EmploymentDetailsSection = ({ formData, setFormData, errors, setErrors }) => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch("https://hrms-development.onrender.com/employee/listEmployees");
        if (!response.ok) throw new Error("Failed to fetch managers");
        const data = await response.json();
        setManagers(data || []);
      } catch (error) {
        console.error("Error fetching managers:", error);
        toast.error("Failed to load managers list");
      }
    };
    fetchManagers();
  }, []);

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

  const handleSelectChange = (name, value) => {
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
        <h3 className="text-sm font-medium text-muted-foreground">Employment Details</h3>
        <Separator className="flex-1 ml-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfJoining" className="text-sm">
            Date of Joining
          </Label>
          <Input
            id="dateOfJoining"
            name="dateOfJoining"
            type="date"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className={cn(
              "transition-colors focus:border-primary",
              errors.dateOfJoining ? "border-destructive" : "border-input hover:border-neutral-400"
            )}
          />
          {errors.dateOfJoining && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.dateOfJoining}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalYrExp" className="text-sm">
            Years of Experience
          </Label>
          <Input
            id="totalYrExp"
            name="totalYrExp"
            type="number"
            step="0.1"
            value={formData.totalYrExp}
            onChange={handleChange}
            className={cn(
              "transition-colors focus:border-primary",
              errors.totalYrExp ? "border-destructive" : "border-input hover:border-neutral-400"
            )}
          />
          {errors.totalYrExp && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.totalYrExp}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation" className="text-sm">
            Designation
          </Label>
          <Input
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className={cn(
              "transition-colors focus:border-primary",
              errors.designation ? "border-destructive" : "border-input hover:border-neutral-400"
            )}
          />
          {errors.designation && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.designation}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="department" className="text-sm">
            Department
          </Label>
          <Select
            value={formData.department}
            onValueChange={(value) => handleSelectChange("department", value)}
          >
            <SelectTrigger className="border-input hover:border-neutral-400 transition-colors focus:border-primary">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="SALES">Sales</SelectItem>
              <SelectItem value="DESIGN">Design</SelectItem>
              <SelectItem value="ACCOUNTS">Accounts</SelectItem>
              <SelectItem value="MARKETING">Marketing</SelectItem>
              <SelectItem value="OPERATIONS">Operations</SelectItem>
              <SelectItem value="TECHNOLOGY">Technology</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reportingManager" className="text-sm">
            Reporting Manager
          </Label>
          <Select
            value={String(formData.reportingManager || "")}
            onValueChange={(value) => handleSelectChange("reportingManager", value)}
          >
            <SelectTrigger
              className={cn(
                "border-input hover:border-neutral-400 transition-colors focus:border-primary",
                errors.reportingManager ? "border-destructive" : ""
              )}
            >
              <SelectValue placeholder="Select reporting manager" />
            </SelectTrigger>
            <SelectContent>
              {managers?.map((manager) => (
                <SelectItem key={manager.id} value={manager.id.toString()}>
                  {manager.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.reportingManager && (
            <div className="flex items-center text-xs text-destructive mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.reportingManager}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmploymentDetailsSection;










// import React, { useEffect, useState } from "react"
// import { Label } from "../../ui/label"
// import { Input } from "../../ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
// import { Separator } from "../../ui/separator"
// import { AlertCircle } from "lucide-react"
// import {cn} from "../../../lib/utils";

// const EmploymentDetailsSection = ({ formData, setFormData, errors, setErrors }) => {
//   const [managers, setManagers] = useState([])

//   useEffect(() => {
//     const fetchManagers = async () => {
//       try {
//         const response = await fetch("https://hrms-development.onrender.com/employee/listEmployees")
//         if (!response.ok) throw new Error("Failed to fetch managers")
//         const data = await response.json()
//         setManagers(data || [])
//       } catch (error) {
//         console.error("Error fetching managers:", error)
//       }
//     }
//     fetchManagers()
//   }, [])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev }
//         delete newErrors[name]
//         return newErrors
//       })
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center">
//         <h3 className="text-sm font-medium text-muted-foreground">Employment Details</h3>
//         <Separator className="flex-1 ml-3" />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="dateOfJoining" className="text-sm">
//             Date of Joining
//           </Label>
//           <Input
//             id="dateOfJoining"
//             name="dateOfJoining"
//             type="date"
//             value={formData.dateOfJoining}
//             onChange={handleChange}
//             className={cn(
//               "transition-colors focus:border-primary",
//               errors.dateOfJoining ? "border-destructive" : "border-input hover:border-neutral-400"
//             )}
//           />
//           {errors.dateOfJoining && (
//             <div className="flex items-center text-xs text-destructive mt-1">
//               <AlertCircle className="h-3 w-3 mr-1" />
//               <p>{errors.dateOfJoining}</p>
//             </div>
//           )}
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="totalYrExp" className="text-sm">
//             Years of Experience
//           </Label>
//           <Input
//             id="totalYrExp"
//             name="totalYrExp"
//             type="number"
//             step="0.1"
//             value={formData.totalYrExp}
//             onChange={handleChange}
//             className={cn(
//               "transition-colors focus:border-primary",
//               errors.totalYrExp ? "border-destructive" : "border-input hover:border-neutral-400"
//             )}
//           />
//           {errors.totalYrExp && (
//             <div className="flex items-center text-xs text-destructive mt-1">
//               <AlertCircle className="h-3 w-3 mr-1" />
//               <p>{errors.totalYrExp}</p>
//             </div>
//           )}
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="designation" className="text-sm">
//             Designation
//           </Label>
//           <Input
//             id="designation"
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//             className={cn(
//               "transition-colors focus:border-primary",
//               errors.designation ? "border-destructive" : "border-input hover:border-neutral-400"
//             )}
//           />
//           {errors.designation && (
//             <div className="flex items-center text-xs text-destructive mt-1">
//               <AlertCircle className="h-3 w-3 mr-1" />
//               <p>{errors.designation}</p>
//             </div>
//           )}
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="department" className="text-sm">
//             Department
//           </Label>
//           <Select
//             value={formData.department}
//             onValueChange={(value) => handleSelectChange("department", value)}
//           >
//             <SelectTrigger className="border-input hover:border-neutral-400 transition-colors focus:border-primary">
//               <SelectValue placeholder="Select department" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="HR">HR</SelectItem>
//               <SelectItem value="SALES">Sales</SelectItem>
//               <SelectItem value="DESIGN">Design</SelectItem>
//               <SelectItem value="ACCOUNTS">Accounts</SelectItem>
//               <SelectItem value="MARKETING">Marketing</SelectItem>
//               <SelectItem value="OPERATIONS">Operations</SelectItem>
//               <SelectItem value="TECHNOLOGY">Technology</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="reportingManager" className="text-sm">
//             Reporting Manager
//           </Label>
//           <Select
//             value={String(formData.reportingManager || "")}
//             onValueChange={(value) => handleSelectChange("reportingManager", value)}
//           >
//             <SelectTrigger
//               className={cn(
//                 "border-input hover:border-neutral-400 transition-colors focus:border-primary",
//                 errors.reportingManager ? "border-destructive" : ""
//               )}
//             >
//               <SelectValue placeholder="Select reporting manager" />
//             </SelectTrigger>
//             <SelectContent>
//               {managers?.map((manager) => (
//                 <SelectItem key={manager.id} value={manager.id.toString()}>
//                   {manager.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.reportingManager && (
//             <div className="flex items-center text-xs text-destructive mt-1">
//               <AlertCircle className="h-3 w-3 mr-1" />
//               <p>{errors.reportingManager}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EmploymentDetailsSection