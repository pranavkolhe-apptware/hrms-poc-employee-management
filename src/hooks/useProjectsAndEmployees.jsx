import { useState, useEffect, useCallback } from 'react';

export const useProjectsAndEmployees = (isDialogOpen) => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = useCallback(async () => {
    if (isDialogOpen && !dataFetched) {
      try {
        setLoading(true);
        setError(null);

        const [projectsRes, employeesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_BACKEND_API_URL}project/listProjects`),
          fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/listEmployees`)
        ]);

        if (!projectsRes.ok || !employeesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [projectsData, employeesData] = await Promise.all([
          projectsRes.json(),
          employeesRes.json()
        ]);

        setProjects(projectsData);
        setEmployees(employeesData);
        setDataFetched(true);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [isDialogOpen, dataFetched]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    projects,
    employees,
    loading,
    error
  };
};

