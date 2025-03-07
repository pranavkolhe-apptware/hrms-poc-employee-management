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










// import { useState, useEffect } from 'react';

// export const useProjectsAndEmployees = (isDialogOpen) => {
//   const [projects, setProjects] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [deployedEmployees, setDeployedEmployees] = useState([]);
//   const [deployedEmployeesByProject, setDeployedEmployeesByProject] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [dataFetched, setDataFetched] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       // Only fetch if dialog is open and data hasn't been fetched yet
//       if (isDialogOpen && !dataFetched) {
//         try {
//           setLoading(true);
//           const [projectsRes, employeesRes] = await Promise.all([
//             fetch(`${import.meta.env.VITE_BACKEND_API_URL}project/listProjects`),
//             fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/listEmployees`)
//           ]);

//           if (!projectsRes.ok || !employeesRes.ok) {
//             throw new Error('Failed to fetch data');
//           }

//           const projectsData = await projectsRes.json();
//           const employeesData = await employeesRes.json();

//           setProjects(projectsData);
//           setEmployees(employeesData);

//           // Fetch engagements for each employee to determine who is deployed
//           const deployedEmps = [];
//           for (const employee of employeesData) {
//             try {
//               const engagementRes = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/engagement/${employee.id}`);
//               if (engagementRes.ok) {
//                 const engagementText = await engagementRes.text();
//                 if (engagementText) {
//                   const engagementData = JSON.parse(engagementText);
//                   if (engagementData && engagementData.employeeStatus === 'DEPLOYED') {
//                     deployedEmps.push({
//                       id: employee.id,
//                       name: employee.name
//                     });
            
//                   }
//                 }
//               }
//             } catch (error) {
//               console.error(`Error fetching engagement for employee ${employee.id}:`, error);
//             }
//           }
//           setDeployedEmployees(deployedEmps);
//           setDataFetched(true);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();
//   }, [isDialogOpen, dataFetched]);

//   return {
//     projects,
//     employees,
//     deployedEmployees,
//     loading,
//     error
//   };
// };