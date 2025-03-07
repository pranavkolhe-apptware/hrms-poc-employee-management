import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Button } from '../ui/button';

const ViewModal = ({ showModal, setShowModal, viewingEmployee, viewingAllotments }) => {
  if (!showModal || !viewingEmployee) return null;

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {viewingEmployee.name}'s Projects
          </DialogTitle>
          <DialogDescription>
            View all projects this employee is assigned to
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] overflow-auto pr-4">
          <div className="space-y-4">
            {viewingAllotments.length > 0 ? (
              viewingAllotments.map((project) => (
                <div key={project.id} className="border rounded-md p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{project.projectName}</h3>
                    <Badge variant={project.projectType === "BILLABLE" ? "default" : "secondary"}>
                      {project.projectType}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Client</p>
                      <p>{project.client.clientName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p>{project.projectStatus}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p>{project.startDate || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p>{project.endDate || 'Not set'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Client Contact</p>
                      <p>{project.client.clientContact}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-muted-foreground">No projects assigned to this employee</p>
            )}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;

















// import React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { ScrollArea } from "../ui/scroll-area";
// import { Badge } from "../ui/badge";
// import { Button } from '../ui/button';

// const ViewModal = ({ showModal, setShowModal, viewingEmployee, viewingAllotments }) => {
//   if (!showModal || !viewingEmployee) return null;

//   return (
//     <Dialog open={showModal} onOpenChange={setShowModal}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold">
//             {viewingEmployee.name}'s Projects
//           </DialogTitle>
//           <DialogDescription>
//             View all projects this employee is assigned to
//           </DialogDescription>
//         </DialogHeader>
//         <ScrollArea className="max-h-[400px] overflow-auto pr-4">
//           <div className="space-y-4">
//             {viewingAllotments.length > 0 ? (
//               viewingAllotments.map((allotment) => (
//                 <div key={allotment.allotmentId} className="border rounded-md p-4 space-y-3">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-medium">{allotment.employeeName}</h3>
//                     <Badge variant={allotment.employeeStatus === "DEPLOYED" ? "default" : "secondary"}>
//                       {allotment.employeeStatus}
//                     </Badge>
//                   </div>
//                   {allotment.listOfShadows?.length > 0 && (
//                     <div className="mt-2">
//                       <p className="text-sm text-muted-foreground mb-2">Shadow Employees:</p>
//                       {allotment.listOfShadows.map(shadow => (
//                         <div key={shadow.shadowId} className="ml-4 text-sm">
//                           <p>{shadow.employeeName} - {shadow.shadowProject} ({shadow.employeeAllocationPercent})</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-center py-4 text-muted-foreground">No projects assigned to this employee</p>
//             )}
//           </div>
//         </ScrollArea>
//         <DialogFooter>
//           <Button variant="outline" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ViewModal;