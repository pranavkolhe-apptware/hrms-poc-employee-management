// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Badge } from "./ui/badge";
// import { X, Plus, AlertCircle } from "lucide-react";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "./ui/select";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
// import { cn } from "../lib/utils";

// const EmployeeForm = ({ employee, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState(
//     employee || {
//       id: Date.now(),
//       name: "",
//       personalEmail: "",
//       officeEmail: "",
//       dateOfJoining: new Date().toISOString().split('T')[0],
//       designation: "",
//       department: "TECHNOLOGY",
//       status: "Billable",
//       primarySkills: [],
//       secondarySkills: [],
//     }
//   );
  
//   const [newSkill, setNewSkill] = useState("");
//   const [skillType, setSkillType] = useState("primarySkills");
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }
    
//     if (!formData.personalEmail.trim()) {
//       newErrors.personalEmail = "Personal email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) {
//       newErrors.personalEmail = "Invalid email format";
//     }
    
//     if (!formData.officeEmail.trim()) {
//       newErrors.officeEmail = "Office email is required";
//     } else if (!/\S+@company\.com$/.test(formData.officeEmail)) {
//       newErrors.officeEmail = "Office email must end with @company.com";
//     }
    
//     if (!formData.dateOfJoining) {
//       newErrors.dateOfJoining = "Date of joining is required";
//     }
    
//     if (!formData.designation.trim()) {
//       newErrors.designation = "Designation is required";
//     }
    
//     if (formData.primarySkills.length === 0) {
//       newErrors.primarySkills = "At least one primary skill is required";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
    
//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       onSubmit(formData);
//     }
//   };

//   const addSkill = () => {
//     if (newSkill.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         [skillType]: [...prev[skillType], newSkill.trim()],
//       }));
//       setNewSkill("");
      
//       // Clear error if it exists
//       if (errors[skillType]) {
//         setErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors[skillType];
//           return newErrors;
//         });
//       }
//     }
//   };

//   const removeSkill = (type, skillToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       [type]: prev[type].filter((skill) => skill !== skillToRemove),
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto border-neutral-200 focus:outline-none">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold text-primary">
//             {employee ? "Edit Employee" : "Add New Employee"}
//           </DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-6 pt-2">
//           {/* Personal Information Section */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-sm">Full Name</Label>
//                 <Input 
//                   id="name" 
//                   name="name" 
//                   value={formData.name} 
//                   onChange={handleChange} 
//                   className={cn(
//                     "transition-colors focus:border-primary",
//                     errors.name ? "border-destructive" : "border-input hover:border-neutral-400"
//                   )}
//                 />
//                 {errors.name && (
//                   <div className="flex items-center text-xs text-destructive mt-1">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     <p>{errors.name}</p>
//                   </div>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="id" className="text-sm">Employee ID</Label>
//                 <Input 
//                   id="id" 
//                   name="id" 
//                   value={formData.id} 
//                   onChange={(e) => setFormData(prev => ({ ...prev, id: parseInt(e.target.value) || 0 }))} 
//                   disabled={!!employee}
//                   className="bg-muted/50 border-input hover:border-neutral-400 transition-colors"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Contact Information Section */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="personalEmail" className="text-sm">Personal Email</Label>
//                 <Input 
//                   id="personalEmail" 
//                   name="personalEmail" 
//                   type="email" 
//                   value={formData.personalEmail} 
//                   onChange={handleChange} 
//                   className={cn(
//                     "transition-colors focus:border-primary",
//                     errors.personalEmail ? "border-destructive" : "border-input hover:border-neutral-400"
//                   )}
//                 />
//                 {errors.personalEmail && (
//                   <div className="flex items-center text-xs text-destructive mt-1">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     <p>{errors.personalEmail}</p>
//                   </div>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="officeEmail" className="text-sm">Office Email</Label>
//                 <Input 
//                   id="officeEmail" 
//                   name="officeEmail" 
//                   type="email" 
//                   value={formData.officeEmail} 
//                   onChange={handleChange} 
//                   className={cn(
//                     "transition-colors focus:border-primary",
//                     errors.officeEmail ? "border-destructive" : "border-input hover:border-neutral-400"
//                   )}
//                   placeholder="example@company.com"
//                 />
//                 {errors.officeEmail && (
//                   <div className="flex items-center text-xs text-destructive mt-1">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     <p>{errors.officeEmail}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Employment Details Section */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-medium text-muted-foreground">Employment Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="dateOfJoining" className="text-sm">Date of Joining</Label>
//                 <Input 
//                   id="dateOfJoining" 
//                   name="dateOfJoining" 
//                   type="date" 
//                   value={formData.dateOfJoining} 
//                   onChange={handleChange} 
//                   className={cn(
//                     "transition-colors focus:border-primary",
//                     errors.dateOfJoining ? "border-destructive" : "border-input hover:border-neutral-400"
//                   )}
//                 />
//                 {errors.dateOfJoining && (
//                   <div className="flex items-center text-xs text-destructive mt-1">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     <p>{errors.dateOfJoining}</p>
//                   </div>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="dateOfLeaving" className="text-sm">Date of Leaving (if applicable)</Label>
//                 <Input 
//                   id="dateOfLeaving" 
//                   name="dateOfLeaving" 
//                   type="date" 
//                   value={formData.dateOfLeaving || ""} 
//                   onChange={handleChange} 
//                   className="border-input hover:border-neutral-400 transition-colors focus:border-primary"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="designation" className="text-sm">Designation</Label>
//                 <Input 
//                   id="designation" 
//                   name="designation" 
//                   value={formData.designation} 
//                   onChange={handleChange} 
//                   className={cn(
//                     "transition-colors focus:border-primary",
//                     errors.designation ? "border-destructive" : "border-input hover:border-neutral-400"
//                   )}
//                 />
//                 {errors.designation && (
//                   <div className="flex items-center text-xs text-destructive mt-1">
//                     <AlertCircle className="h-3 w-3 mr-1" />
//                     <p>{errors.designation}</p>
//                   </div>
//                 )}
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="department" className="text-sm">Department</Label>
//                 <Select 
//                   value={formData.department} 
//                   onValueChange={(value) => handleSelectChange("department", value)}
//                 >
//                   <SelectTrigger className="border-input hover:border-neutral-400 transition-colors focus:border-primary">
//                     <SelectValue placeholder="Select department" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="HR">HR</SelectItem>
//                     <SelectItem value="SALES">Sales</SelectItem>
//                     <SelectItem value="DESIGN">Design</SelectItem>
//                     <SelectItem value="ACCOUNTS">Accounts</SelectItem>
//                     <SelectItem value="MARKETING">Marketing</SelectItem>
//                     <SelectItem value="OPERATIONS">Operations</SelectItem>
//                     <SelectItem value="TECHNOLOGY">Technology</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>
          
//           {/* Status Section */}
//           <div className="space-y-3 border border-input rounded-md p-4">
//             <Label className="text-sm font-medium">Employment Status</Label>
//             <RadioGroup 
//               value={formData.status} 
//               onValueChange={(value) => handleSelectChange("status", value)}
//               className="flex space-x-6 mt-2"
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="Billable" id="billable" />
//                 <Label htmlFor="billable" className="cursor-pointer text-sm">Billable</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="Non-Billable" id="non-billable" />
//                 <Label htmlFor="non-billable" className="cursor-pointer text-sm">Non-Billable</Label>
//               </div>
//             </RadioGroup>
//           </div>
          
//           {/* Skills Section */}
//           <div className="space-y-4 border border-input rounded-md p-4">
//             <div className="flex justify-between items-center">
//               <Label className="text-sm font-medium">Skills Management</Label>
//               <Select 
//                 value={skillType} 
//                 onValueChange={(value) => setSkillType(value)}
//               >
//                 <SelectTrigger className="w-[160px] border-input hover:border-neutral-400 transition-colors focus:border-primary h-8 text-xs">
//                   <SelectValue placeholder="Skill type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="primarySkills">Primary Skills</SelectItem>
//                   <SelectItem value="secondarySkills">Secondary Skills</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <div className="flex gap-2">
//               <Input 
//                 value={newSkill} 
//                 onChange={(e) => setNewSkill(e.target.value)} 
//                 placeholder={`Add a ${skillType === "primarySkills" ? "primary" : "secondary"} skill`}
//                 className="border-input hover:border-neutral-400 transition-colors focus:border-primary"
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     e.preventDefault();
//                     addSkill();
//                   }
//                 }}
//               />
//               <Button 
//                 type="button" 
//                 onClick={addSkill}
//                 variant="default"
//                 size="sm"
//                 className="px-3"
//               >
//                 <Plus className="h-4 w-4 mr-1" /> Add
//               </Button>
//             </div>
            
//             {errors.primarySkills && (
//               <div className="flex items-center text-xs text-destructive mt-1">
//                 <AlertCircle className="h-3 w-3 mr-1" />
//                 <p>{errors.primarySkills}</p>
//               </div>
//             )}
            
//             <div className="space-y-2">
//               <Label className="text-xs font-medium text-primary">Primary Skills</Label>
//               <div className="flex flex-wrap gap-2 p-3 min-h-10 border border-input rounded-md hover:border-neutral-400 transition-colors">
//                 {formData.primarySkills.length > 0 ? (
//                   formData.primarySkills.map((skill, index) => (
//                     <Badge key={index} variant="default" className="text-xs bg-primary/90 hover:bg-primary transition-colors">
//                       {skill}
//                       <button 
//                         type="button" 
//                         onClick={() => removeSkill("primarySkills", skill)} 
//                         className="ml-1 rounded-full p-0.5 transition-colors"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))
//                 ) : (
//                   <span className="text-muted-foreground text-xs">No primary skills added</span>
//                 )}
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <Label className="text-xs font-medium text-muted-foreground">Secondary Skills</Label>
//               <div className="flex flex-wrap gap-2 p-3 min-h-10 border border-input rounded-md hover:border-neutral-400 transition-colors">
//                 {formData.secondarySkills.length > 0 ? (
//                   formData.secondarySkills.map((skill, index) => (
//                     <Badge key={index} variant="secondary" className="text-xs">
//                       {skill}
//                       <button 
//                         type="button" 
//                         onClick={() => removeSkill("secondarySkills", skill)} 
//                         className="ml-1 rounded-full p-0.5 transition-colors"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </Badge>
//                   ))
//                 ) : (
//                   <span className="text-muted-foreground text-xs">No secondary skills added</span>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           <DialogFooter className="pt-2">
//             <Button 
//               type="button" 
//               variant="outline" 
//               onClick={onClose} 
//               className="border-input hover:border-neutral-400 transition-colors"
//             >
//               Cancel
//             </Button>
//             <Button 
//               type="submit" 
//               variant="default"
//             >
//               {employee ? "Update" : "Add"} Employee
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EmployeeForm;













// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { X, Check, ChevronsUpDown, AlertCircle, Search } from "lucide-react";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

// // Predefined skills for the multiselect combobox
// const AVAILABLE_SKILLS = [
//   "JavaScript",
//   "TypeScript",
//   "React",
//   "Angular",
//   "Vue.js",
//   "Node.js",
//   "Express",
//   "MongoDB",
//   "SQL",
//   "PostgreSQL",
//   "AWS",
//   "Docker",
//   "Kubernetes",
//   "Python",
//   "Java",
//   "C#",
//   "PHP",
//   "Ruby",
//   "Go",
//   "Swift",
//   "Kotlin",
//   "Flutter",
//   "React Native",
//   "GraphQL",
//   "REST API",
//   "HTML",
//   "CSS",
//   "Sass",
//   "Tailwind CSS",
//   "UI/UX Design",
//   "Figma",
//   "Adobe XD",
//   "Git",
//   "CI/CD",
//   "Agile",
//   "Scrum",
//   "DevOps",
//   "Testing",
//   "Jest",
//   "Cypress"
// ];

// const EmployeeForm = ({ employee, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState(
//     employee || {
//       id: Date.now(),
//       name: "",
//       personalEmail: "",
//       officeEmail: "",
//       dateOfJoining: new Date().toISOString().split('T')[0],
//       designation: "",
//       department: "TECHNOLOGY",
//       status: "Non-Billable", // Default to Non-Billable as requested
//       primarySkills: [],
//       secondarySkills: [],
//     }
//   );
  
//   const [errors, setErrors] = useState({});
//   const [openPrimarySkills, setOpenPrimarySkills] = useState(false);
//   const [openSecondarySkills, setOpenSecondarySkills] = useState(false);
//   const [searchPrimary, setSearchPrimary] = useState("");
//   const [searchSecondary, setSearchSecondary] = useState("");
//   const [customSkill, setCustomSkill] = useState("");

//   // Filter skills based on search
//   const filteredPrimarySkills = AVAILABLE_SKILLS.filter(
//     (skill) => !formData.primarySkills.includes(skill) && 
//     skill.toLowerCase().includes(searchPrimary.toLowerCase())
//   );

//   const filteredSecondarySkills = AVAILABLE_SKILLS.filter(
//     (skill) => !formData.secondarySkills.includes(skill) && 
//     skill.toLowerCase().includes(searchSecondary.toLowerCase())
//   );

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }
    
//     if (!formData.personalEmail.trim()) {
//       newErrors.personalEmail = "Personal email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) {
//       newErrors.personalEmail = "Invalid email format";
//     }
    
//     if (!formData.officeEmail.trim()) {
//       newErrors.officeEmail = "Office email is required";
//     } else if (!/\S+@company\.com$/.test(formData.officeEmail)) {
//       newErrors.officeEmail = "Office email must end with @company.com";
//     }
    
//     if (!formData.dateOfJoining) {
//       newErrors.dateOfJoining = "Date of joining is required";
//     }
    
//     if (!formData.designation.trim()) {
//       newErrors.designation = "Designation is required";
//     }
    
//     if (formData.primarySkills.length === 0) {
//       newErrors.primarySkills = "At least one primary skill is required";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
    
//     // Clear error when field is edited
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleSelectChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       onSubmit(formData);
//     }
//   };

//   const addSkill = (type, skill) => {
//     if (skill && !formData[type].includes(skill)) {
//       setFormData((prev) => ({
//         ...prev,
//         [type]: [...prev[type], skill],
//       }));
      
//       // Clear error if it exists
//       if (errors[type]) {
//         setErrors((prev) => {
//           const newErrors = { ...prev };
//           delete newErrors[type];
//           return newErrors;
//         });
//       }
//     }
//   };

//   const addCustomSkill = (type) => {
//     if (customSkill.trim() && !formData[type].includes(customSkill.trim())) {
//       addSkill(type, customSkill.trim());
//       setCustomSkill("");
//     }
//   };

//   const removeSkill = (type, skillToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       [type]: prev[type].filter((skill) => skill !== skillToRemove),
//     }));
//   };

//   // Custom MultiSelect component
//   const MultiSelectSkills = ({ type, label, skills, filteredSkills, searchValue, setSearchValue, open, setOpen }) => {
//     return (
//       <div className="space-y-3">
//         <div className="flex justify-between items-center">
//           <Label className="text-sm font-medium">{label}</Label>
//           {type === "primarySkills" && errors.primarySkills && (
//             <div className="flex items-center text-xs text-destructive">
//               <AlertCircle className="h-3 w-3 mr-1" />
//               <p>{errors.primarySkills}</p>
//             </div>
//           )}
//         </div>
        
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={open}
//               className={cn(
//                 "w-full justify-between border-input hover:border-neutral-400 transition-colors",
//                 type === "primarySkills" && errors.primarySkills ? "border-destructive" : ""
//               )}
//             >
//               {skills.length > 0 
//                 ? `${skills.length} skill${skills.length > 1 ? 's' : ''} selected`
//                 : `Select ${type === "primarySkills" ? "primary" : "secondary"} skills`}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-full p-0" align="start">
//             <div className="flex items-center border-b px-3 py-2">
//               <Search className="mr-2 h-4 w-4 shrink-0 opacity-70" />
//               <input
//                 className="flex h-8 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
//                 placeholder="Search skills..."
//                 value={searchValue}
//                 onChange={(e) => setSearchValue(e.target.value)}
//               />
//             </div>
//             <ScrollArea className="h-60">
//               {filteredSkills.length > 0 ? (
//                 <div className="p-1">
//                   {filteredSkills.map((skill) => (
//                     <div
//                       key={skill}
//                       className={cn(
//                         "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
//                       )}
//                       onClick={() => {
//                         addSkill(type, skill);
//                         setSearchValue("");
//                       }}
//                     >
//                       <Check
//                         className={cn(
//                           "mr-2 h-4 w-4",
//                           skills.includes(skill) ? "opacity-100" : "opacity-0"
//                         )}
//                       />
//                       <span>{skill}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="py-6 px-4 text-center">
//                   <p className="text-sm text-muted-foreground mb-4">No skill found. Add a custom skill:</p>
//                   <div className="flex">
//                     <Input
//                       value={customSkill}
//                       onChange={(e) => setCustomSkill(e.target.value)}
//                       className="h-8 mr-2"
//                       placeholder="Enter custom skill"
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                           e.preventDefault();
//                           addCustomSkill(type);
//                         }
//                       }}
//                     />
//                     <Button 
//                       type="button" 
//                       size="sm"
//                       onClick={() => addCustomSkill(type)}
//                     >
//                       Add
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </ScrollArea>
//           </PopoverContent>
//         </Popover>
        
//         <div className="flex flex-wrap gap-2 min-h-10 p-2 border border-none rounded-md bg-background/50">
//           {skills.length > 0 ? (
//             skills.map((skill, index) => (
//               <Badge 
//                 key={index} 
//                 variant={type === "primarySkills" ? "default" : "secondary"} 
//                 className={cn(
//                   "text-xs",
//                   type === "primarySkills" && "bg-primary/90 hover:bg-primary transition-colors"
//                 )}
//               >
//                 {skill}
//                 <button 
//                   type="button" 
//                   onClick={() => removeSkill(type, skill)} 
//                   className="ml-1 rounded-full p-0.5 transition-colors"
//                 >
//                   <X className="h-3 w-3" />
//                 </button>
//               </Badge>
//             ))
//           ) : (
//             <span className="text-muted-foreground text-xs p-1.5">
//               No {type === "primarySkills" ? "primary" : "secondary"} skills added
//             </span>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 border-neutral-200 focus:outline-none">
//         <DialogHeader className="px-6 pt-6 pb-2">
//           <DialogTitle className="text-xl font-semibold text-primary">
//             {employee ? "Edit Employee" : "Add New Employee"}
//           </DialogTitle>
//           <DialogDescription className="text-sm text-muted-foreground">
//             Fill in the employee details below.
//           </DialogDescription>
//         </DialogHeader>
        
//         <ScrollArea className="px-6 py-4 max-h-[calc(90vh-130px)]">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Personal Information Section */}
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
//                 <Separator className="flex-1 ml-3" />
//               </div>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name" className="text-sm">Full Name</Label>
//                   <Input 
//                     id="name" 
//                     name="name" 
//                     value={formData.name} 
//                     onChange={handleChange} 
//                     className={cn(
//                       "transition-colors focus:border-primary",
//                       errors.name ? "border-destructive" : "border-input hover:border-neutral-400"
//                     )}
//                   />
//                   {errors.name && (
//                     <div className="flex items-center text-xs text-destructive mt-1">
//                       <AlertCircle className="h-3 w-3 mr-1" />
//                       <p>{errors.name}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information Section */}
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
//                 <Separator className="flex-1 ml-3" />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="personalEmail" className="text-sm">Personal Email</Label>
//                   <Input 
//                     id="personalEmail" 
//                     name="personalEmail" 
//                     type="email" 
//                     value={formData.personalEmail} 
//                     onChange={handleChange} 
//                     className={cn(
//                       "transition-colors focus:border-primary",
//                       errors.personalEmail ? "border-destructive" : "border-input hover:border-neutral-400"
//                     )}
//                   />
//                   {errors.personalEmail && (
//                     <div className="flex items-center text-xs text-destructive mt-1">
//                       <AlertCircle className="h-3 w-3 mr-1" />
//                       <p>{errors.personalEmail}</p>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="officeEmail" className="text-sm">Office Email</Label>
//                   <Input 
//                     id="officeEmail" 
//                     name="officeEmail" 
//                     type="email" 
//                     value={formData.officeEmail} 
//                     onChange={handleChange} 
//                     className={cn(
//                       "transition-colors focus:border-primary",
//                       errors.officeEmail ? "border-destructive" : "border-input hover:border-neutral-400"
//                     )}
//                     placeholder="example@company.com"
//                   />
//                   {errors.officeEmail && (
//                     <div className="flex items-center text-xs text-destructive mt-1">
//                       <AlertCircle className="h-3 w-3 mr-1" />
//                       <p>{errors.officeEmail}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Employment Details Section */}
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <h3 className="text-sm font-medium text-muted-foreground">Employment Details</h3>
//                 <Separator className="flex-1 ml-3" />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="dateOfJoining" className="text-sm">Date of Joining</Label>
//                   <Input 
//                     id="dateOfJoining" 
//                     name="dateOfJoining" 
//                     type="date" 
//                     value={formData.dateOfJoining} 
//                     onChange={handleChange} 
//                     className={cn(
//                       "transition-colors focus:border-primary",
//                       errors.dateOfJoining ? "border-destructive" : "border-input hover:border-neutral-400"
//                     )}
//                   />
//                   {errors.dateOfJoining && (
//                     <div className="flex items-center text-xs text-destructive mt-1">
//                       <AlertCircle className="h-3 w-3 mr-1" />
//                       <p>{errors.dateOfJoining}</p>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="dateOfLeaving" className="text-sm">Date of Leaving (if applicable)</Label>
//                   <Input 
//                     id="dateOfLeaving" 
//                     name="dateOfLeaving" 
//                     type="date" 
//                     value={formData.dateOfLeaving || ""} 
//                     onChange={handleChange} 
//                     className="border-input hover:border-neutral-400 transition-colors focus:border-primary"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="designation" className="text-sm">Designation</Label>
//                   <Input 
//                     id="designation" 
//                     name="designation" 
//                     value={formData.designation} 
//                     onChange={handleChange} 
//                     className={cn(
//                       "transition-colors focus:border-primary",
//                       errors.designation ? "border-destructive" : "border-input hover:border-neutral-400"
//                     )}
//                   />
//                   {errors.designation && (
//                     <div className="flex items-center text-xs text-destructive mt-1">
//                       <AlertCircle className="h-3 w-3 mr-1" />
//                       <p>{errors.designation}</p>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="department" className="text-sm">Department</Label>
//                   <Select 
//                     value={formData.department} 
//                     onValueChange={(value) => handleSelectChange("department", value)}
//                   >
//                     <SelectTrigger className="border-input hover:border-neutral-400 transition-colors focus:border-primary">
//                       <SelectValue placeholder="Select department" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="HR">HR</SelectItem>
//                       <SelectItem value="SALES">Sales</SelectItem>
//                       <SelectItem value="DESIGN">Design</SelectItem>
//                       <SelectItem value="ACCOUNTS">Accounts</SelectItem>
//                       <SelectItem value="MARKETING">Marketing</SelectItem>
//                       <SelectItem value="OPERATIONS">Operations</SelectItem>
//                       <SelectItem value="TECHNOLOGY">Technology</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
            
//             {/* Skills Management Section */}
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <h3 className="text-sm font-medium text-muted-foreground">Skills Management</h3>
//                 <Separator className="flex-1 ml-3" />
//               </div>
              
//               {/* Primary Skills */}
//               <MultiSelectSkills 
//                 type="primarySkills"
//                 label="Primary Skills"
//                 skills={formData.primarySkills}
//                 filteredSkills={filteredPrimarySkills}
//                 searchValue={searchPrimary}
//                 setSearchValue={setSearchPrimary}
//                 open={openPrimarySkills}
//                 setOpen={setOpenPrimarySkills}
//               />
              
//               {/* Secondary Skills */}
//               <MultiSelectSkills 
//                 type="secondarySkills"
//                 label="Secondary Skills"
//                 skills={formData.secondarySkills}
//                 filteredSkills={filteredSecondarySkills}
//                 searchValue={searchSecondary}
//                 setSearchValue={setSearchSecondary}
//                 open={openSecondarySkills}
//                 setOpen={setOpenSecondarySkills}
//               />
//             </div>
//           </form>

//           <DialogFooter className="px-6 py-4 border-t">
//           <Button 
//             type="button" 
//             variant="outline" 
//             onClick={onClose} 
//             className="border-input hover:border-neutral-400 transition-colors"
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleSubmit} 
//             variant="default"
//           >
//             {employee ? "Update" : "Add"} Employee
//           </Button>
//         </DialogFooter>

//         </ScrollArea>

        
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EmployeeForm;








"use client"

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Check, ChevronsUpDown, AlertCircle, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Predefined skills for the multiselect combobox
const AVAILABLE_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "GraphQL",
  "REST API",
  "HTML",
  "CSS",
  "Sass",
  "Tailwind CSS",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Git",
  "CI/CD",
  "Agile",
  "Scrum",
  "DevOps",
  "Testing",
  "Jest",
  "Cypress",
];

const EmployeeForm = ({ employee, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    employee || {
      id: Date.now(),
      name: "",
      personalEmail: "",
      officeEmail: "",
      dateOfJoining: new Date().toISOString().split("T")[0],
      designation: "",
      department: "TECHNOLOGY",
      status: "Non-Billable", // Default to Non-Billable as requested
      primarySkills: [],
      secondarySkills: [],
      yoe: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [openPrimarySkills, setOpenPrimarySkills] = useState(false);
  const [openSecondarySkills, setOpenSecondarySkills] = useState(false);
  const [searchPrimary, setSearchPrimary] = useState("");
  const [searchSecondary, setSearchSecondary] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  // Filter skills based on search
  const filteredPrimarySkills = AVAILABLE_SKILLS.filter(
    (skill) =>
      !formData.primarySkills.includes(skill) &&
      skill.toLowerCase().includes(searchPrimary.toLowerCase())
  );

  const filteredSecondarySkills = AVAILABLE_SKILLS.filter(
    (skill) =>
      !formData.secondarySkills.includes(skill) &&
      skill.toLowerCase().includes(searchSecondary.toLowerCase())
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.personalEmail.trim()) {
      newErrors.personalEmail = "Personal email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) {
      newErrors.personalEmail = "Invalid email format";
    }

    if (!formData.officeEmail.trim()) {
      newErrors.officeEmail = "Office email is required";
    } else if (!/\S+@company\.com$/.test(formData.officeEmail)) {
      newErrors.officeEmail = "Office email must end with @company.com";
    }

    if (!formData.dateOfJoining) {
      newErrors.dateOfJoining = "Date of joining is required";
    }

    if (!formData.yoe) {
      newErrors.yoe = "Years of experience is required";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (formData.primarySkills.length === 0) {
      newErrors.primarySkills = "At least one primary skill is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addSkill = (type, skill) => {
    if (skill && !formData[type].includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], skill],
      }));
      // Clear error if it exists
      if (errors[type]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[type];
          return newErrors;
        });
      }
    }
  };

  const addCustomSkill = (type) => {
    if (customSkill.trim() && !formData[type].includes(customSkill.trim())) {
      addSkill(type, customSkill.trim());
      setCustomSkill("");
    }
  };

  const removeSkill = (type, skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((skill) => skill !== skillToRemove),
    }));
  };

  // Custom MultiSelect component
  const MultiSelectSkills = ({
    type,
    label,
    skills,
    filteredSkills,
    searchValue,
    setSearchValue,
    open,
    setOpen,
  }) => {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">{label}</Label>
          {type === "primarySkills" && errors.primarySkills && (
            <div className="flex items-center text-xs text-destructive">
              <AlertCircle className="h-3 w-3 mr-1" />
              <p>{errors.primarySkills}</p>
            </div>
          )}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between border-input hover:border-neutral-400 transition-colors",
                type === "primarySkills" && errors.primarySkills
                  ? "border-destructive"
                  : ""
              )}
            >
              {skills.length > 0
                ? `${skills.length} skill${skills.length > 1 ? "s" : ""} selected`
                : `Select ${type === "primarySkills" ? "primary" : "secondary"} skills`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <div className="flex items-center border-b px-3 py-2">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-70" />
              <input
                type="text"
                className="flex h-8 w-full rounded-md bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Search skills..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <ScrollArea className="h-60">
              {filteredSkills.length > 0 ? (
                <div className="p-1">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                      )}
                      onClick={() => {
                        addSkill(type, skill);
                        setSearchValue("");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          skills.includes(skill) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 px-4 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    No skill found. Add a custom skill:
                  </p>
                  <div className="flex">
                    <Input
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      className="h-8 mr-2"
                      placeholder="Enter custom skill"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCustomSkill(type);
                        }
                      }}
                    />
                    <Button type="button" size="sm" onClick={() => addCustomSkill(type)}>
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <div className="flex flex-wrap gap-2 min-h-10 p-2 rounded-md bg-background/50">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <Badge
                key={index}
                variant={type === "primarySkills" ? "default" : "secondary"}
                className={cn(
                  "text-xs",
                  type === "primarySkills" &&
                    "bg-primary/90 hover:bg-primary transition-colors"
                )}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(type, skill)}
                  className="ml-1 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-xs p-1.5">
              No {type === "primarySkills" ? "primary" : "secondary"} skills added
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] p-0 border-neutral-200 focus:outline-none">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold text-primary">
            {employee ? "Edit Employee" : "Add New Employee"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Fill in the employee details below.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-6 py-4 max-h-[calc(90vh-130px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Personal Information
                </h3>
                <Separator className="flex-1 ml-3" />
              </div>
              <div className="space-y-4">
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
                      errors.name
                        ? "border-destructive"
                        : "border-input hover:border-neutral-400"
                    )}
                  />
                  {errors.name && (
                    <div className="flex items-center text-xs text-destructive mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      <p>{errors.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Contact Information
                </h3>
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
                      errors.personalEmail
                        ? "border-destructive"
                        : "border-input hover:border-neutral-400"
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
                      errors.officeEmail
                        ? "border-destructive"
                        : "border-input hover:border-neutral-400"
                    )}
                    placeholder="example@company.com"
                  />
                  {errors.officeEmail && (
                    <div className="flex items-center text-xs text-destructive mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      <p>{errors.officeEmail}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Employment Details Section */}
            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Employment Details
                </h3>
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
                      errors.dateOfJoining
                        ? "border-destructive"
                        : "border-input hover:border-neutral-400"
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
                  <Label htmlFor="yoe" className="text-sm">
                    Years of Experience
                  </Label>
                  <Input
                    id="yoe"
                    name="yoe"
                    type="float"
                    value={formData.yoe || ""}
                    onChange={handleChange}
                    className="border-input hover:border-neutral-400 transition-colors focus:border-primary"
                  />
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
                      errors.designation
                        ? "border-destructive"
                        : "border-input hover:border-neutral-400"
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
              </div>
            </div>

            {/* Skills Management Section */}
            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Skills Management
                </h3>
                <Separator className="flex-1 ml-3" />
              </div>

              {/* Primary Skills */}
              <MultiSelectSkills
                type="primarySkills"
                label="Primary Skills"
                skills={formData.primarySkills}
                filteredSkills={filteredPrimarySkills}
                searchValue={searchPrimary}
                setSearchValue={setSearchPrimary}
                open={openPrimarySkills}
                setOpen={setOpenPrimarySkills}
              />

              {/* Secondary Skills */}
              <MultiSelectSkills
                type="secondarySkills"
                label="Secondary Skills"
                skills={formData.secondarySkills}
                filteredSkills={filteredSecondarySkills}
                searchValue={searchSecondary}
                setSearchValue={setSearchSecondary}
                open={openSecondarySkills}
                setOpen={setOpenSecondarySkills}
              />
            </div>
          </form>

          <DialogFooter className="px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-input hover:border-neutral-400 transition-colors"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="default">
              {employee ? "Update" : "Add"} Employee
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;