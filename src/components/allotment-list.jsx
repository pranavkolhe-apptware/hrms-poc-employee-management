import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PlusCircle } from "lucide-react";
import AllotmentTable from './AllotmentTable';
import Pagination from './Pagination';
import ViewModal from './Engagement/view-modal';
import AddAllotmentDialog from './Engagement/Add-Allotment-Dialog';
import { useAllotmentData } from '../hooks/useAllotmentData';

const ITEMS_PER_PAGE = 7;

const AllotmentList = () => {
  const { allotments, employees, loading, error, refreshData } = useAllotmentData();
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingAllotment, setEditingAllotment] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [viewingAllotments, setViewingAllotments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState({});

  const handleDelete = async (allotmentId) => {
    // After successful deletion, refresh the data
    await refreshData();
  };

  const handleEdit = (allotment) => {
    setEditingAllotment(allotment);
    setShowForm(true);
  };

  const handleView = async (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/projectsById?employeeId=${employeeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee projects');
        }
        const projects = await response.json();
        setViewingEmployee(employee);
        setViewingAllotments(projects);
        setShowViewModal(true);
      } catch (error) {
        console.error('Error fetching employee projects:', error);
      }
    }
  };

  const toggleRowExpansion = (allotmentId) => {
    setExpandedRows(prev => ({
      ...prev,
      [allotmentId]: !prev[allotmentId]
    }));
  };

  // Filter allotments based on status
  const filteredAllotments = filter === "all" 
    ? allotments 
    : allotments.filter(a => a.employeeStatus === filter);

  // Calculate total pages
  const totalPages = Math.ceil(filteredAllotments.length / ITEMS_PER_PAGE);
  
  // Get current page items
  const currentItems = filteredAllotments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-lg text-red-600">Error: {error}</div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Employee Allotments</h2>
        <div className="flex space-x-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] border-input hover:border-neutral-400 transition-colors">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="DEPLOYED">Deployed</SelectItem>
              <SelectItem value="SHADOW">Shadow</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setShowForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Allotment
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <AllotmentTable 
          currentItems={currentItems}
          expandedRows={expandedRows}
          toggleRowExpansion={toggleRowExpansion}
          handleView={handleView}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <ViewModal 
        showModal={showViewModal}
        setShowModal={setShowViewModal}
        viewingEmployee={viewingEmployee}
        viewingAllotments={viewingAllotments}
      />

      <AddAllotmentDialog 
        open={showForm}
        onOpenChange={setShowForm}
        onSubmit={refreshData}
      />
    </div>
  );
};

export default AllotmentList;