// import React from "react";
// import { Badge } from "./ui/badge";

// const EmployeeSkillBadges = ({ skills, type }) => {
//   const visibleSkills = skills.slice(0, 2);
//   const remainingCount = skills.length - visibleSkills.length;

//   return (
//     <div className="flex flex-wrap gap-1 items-center">
//       {visibleSkills.map((skill, index) => (
//         <Badge
//           key={index}
//           variant={type === "primary" ? "default" : "secondary"}
//           className={
//             type === "primary"
//               ? "bg-blue-500 hover:bg-blue-600 transition-colors px-2 py-1 rounded-3xl"
//               : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors px-2 py-1 rounded-3xl"
//           }
//         >
//           {skill}
//         </Badge>
//       ))}
//       {remainingCount > 0 && (
//         <Badge 
//             variant={type === "primary" ? "default" : "secondary"}
//             className={
//                 type === "primary"
//                 ? "bg-blue-500 hover:bg-blue-600 transition-colors px-2 py-1 rounded-3xl"
//                 : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors px-2 py-1 rounded-3xl"
//             }
//         >
//           +{remainingCount}
//         </Badge>
//       )}
//     </div>
//   );
// };

// export default EmployeeSkillBadges;


import React from "react";
import { Badge } from "./ui/badge";

const EmployeeSkillBadges = ({ skills, type }) => {
  // Remove duplicates
  const uniqueSkills = [...new Set(skills)];
  const visibleSkills = uniqueSkills.slice(0, 2);
  const remainingCount = uniqueSkills.length - visibleSkills.length;

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {visibleSkills.map((skill, index) => (
        <Badge
          key={index}
          variant={type === "primary" ? "default" : "secondary"}
          className={
            type === "primary"
              ? "bg-blue-500 hover:bg-blue-600 transition-colors px-2 py-1 rounded-3xl"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors px-2 py-1 rounded-3xl"
          }
        >
          {skill}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge
          variant={type === "primary" ? "default" : "secondary"}
          className={
            type === "primary"
              ? "bg-blue-500 hover:bg-blue-600 transition-colors px-2 py-1 rounded-3xl"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors px-2 py-1 rounded-3xl"
          }
        >
          +{remainingCount}
        </Badge>
      )}
    </div>
  );
};

export default EmployeeSkillBadges;
