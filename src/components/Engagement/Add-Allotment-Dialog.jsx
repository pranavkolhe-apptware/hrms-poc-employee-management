import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useProjectsAndEmployees } from '../../hooks/useProjectsAndEmployees';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AddAllotmentDialog = ({ open, onOpenChange, onSubmit }) => {
  const [formData, setFormData] = useState({
    projectId: '',
    id: '',
    workLocation: '',
    allocationPercent: '',
    projectJoiningDate: '',
    engagementStatus: '',
    shadowOf: ''
  });

  const { 
    projects, 
    employees,
    loading, 
    error 
  } = useProjectsAndEmployees(open);

  const [shadowCandidates, setShadowCandidates] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchShadowCandidates = async () => {
      if (formData.projectId && formData.engagementStatus === 'SHADOW') {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}employee/byProject?projectId=${formData.projectId}`
          );
          if (!res.ok) throw new Error('Failed to fetch deployed employees');
          const projectEmployees = await res.json();

          // for auto emp of projectEmployees if emp.employeeStatus === 'DEPLOYED' then only push to shadowCandidates
          const data = projectEmployees.filter(emp => emp.employeeStatus === 'DEPLOYED');

          setShadowCandidates(data);
        } catch (err) {
          console.error(err);
          setShadowCandidates([]);
        }
      } else {
        setShadowCandidates([]);
      }
    };

    fetchShadowCandidates();
  }, [formData.projectId, formData.engagementStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const payload = {
      projectId: parseInt(formData.projectId),
      id: parseInt(formData.id),
      workLocation: formData.workLocation,
      allocationPercent: parseFloat(formData.allocationPercent),
      projectJoiningDate: formData.projectJoiningDate,
      engagementStatus: formData.engagementStatus,
    };

    if (formData.engagementStatus === 'SHADOW' && formData.shadowOf) {
      payload.shadowOf = parseInt(formData.shadowOf);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/assignProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });


      console.log("Adding Employee Payload", JSON.stringify(payload));  

      if (!response.ok) throw new Error('Failed to add allotment');

      toast.success('Allotment added successfully');
      onSubmit();
      onOpenChange(false);
      setFormData({
        projectId: '',
        id: '',
        workLocation: '',
        allocationPercent: '',
        projectJoiningDate: '',
        engagementStatus: '',
        shadowOf: ''
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to add allotment');
    } finally {
      setSubmitting(false);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add New Allotment</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-180px)] px-1">
          <form onSubmit={handleSubmit} className="space-y-4 px-3 py-3">
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select
                value={formData.projectId}
                onValueChange={(value) => setFormData({ ...formData, projectId: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loading ? "Loading..." : "Select project"} />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.projectName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Select
                value={formData.id}
                onValueChange={(value) => setFormData({ ...formData, id: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loading ? "Loading..." : "Select employee"} />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="workLocation">Work Location</Label>
              <Input
                id="workLocation"
                value={formData.workLocation}
                onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                placeholder="Enter work location"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allocationPercent">Allocation Percentage</Label>
              <Input
                id="allocationPercent"
                type="number"
                min="0"
                max="100"
                value={formData.allocationPercent}
                onChange={(e) => setFormData({ ...formData, allocationPercent: e.target.value })}
                placeholder="Enter allocation percentage"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectJoiningDate">Project Joining Date</Label>
              <Input
                id="projectJoiningDate"
                type="date"
                value={formData.projectJoiningDate}
                onChange={(e) => setFormData({ ...formData, projectJoiningDate: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="engagementStatus">Engagement Status</Label>
              <Select
                value={formData.engagementStatus}
                onValueChange={(value) => setFormData({ ...formData, engagementStatus: value })}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loading ? "Loading..." : "Select status"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEPLOYED">Deployed</SelectItem>
                  <SelectItem value="SHADOW">Shadow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.engagementStatus === 'SHADOW' && (
              <div className="space-y-2">
                <Label htmlFor="shadowOf">Shadow Of</Label>
                <Select
                  value={formData.shadowOf}
                  onValueChange={(value) => setFormData({ ...formData, shadowOf: value })}
                  disabled={loading || shadowCandidates.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loading ? "Loading..." : "Select employee to shadow"} />
                  </SelectTrigger>
                  <SelectContent>
                    {shadowCandidates.map((employee) => (
                      <SelectItem key={employee.employeeId} value={employee.employeeId.toString()}>
                        {employee.employeeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading || submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Allotment'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAllotmentDialog;
