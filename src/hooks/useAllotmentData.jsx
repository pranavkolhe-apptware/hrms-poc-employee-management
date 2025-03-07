import { useState, useEffect, useCallback } from 'react';

export const useAllotmentData = () => {
  const [allotments, setAllotments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEngagement = async (employeeId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/engagement/${employeeId}`);
      if (!response.ok) return null;
      
      const text = await response.text();
      if (!text) return null;
      
      return JSON.parse(text);
    } catch (error) {
      console.error(`Error fetching engagement for employee ${employeeId}:`, error);
      return null;
    }
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch employees data
      const employeesResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/listEmployees`);
      if (!employeesResponse.ok) {
        throw new Error('Failed to fetch employees');
      }
      const employeesData = await employeesResponse.json();
      setEmployees(employeesData);
      
      // Fetch all engagements in parallel
      const engagementPromises = employeesData.map(employee => fetchEngagement(employee.id));
      const engagementResults = await Promise.all(engagementPromises);
      
      // Filter out null results and empty engagements
      const validEngagements = engagementResults.filter(
        engagement => engagement && Object.keys(engagement).length > 0
      );

      setAllotments(validEngagements);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    allotments,
    employees,
    loading,
    error,
    refreshData: loadData
  };
};









// import { useState, useEffect } from 'react';

// export const useAllotmentData = () => {
//   const [allotments, setAllotments] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       // Fetch employees data
//       const employeesResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/listEmployees`);
//       if (!employeesResponse.ok) {
//         throw new Error('Failed to fetch employees');
//       }
//       const employeesData = await employeesResponse.json();
//       setEmployees(employeesData);
      
//       // Fetch engagements for each employee
//       const engagements = [];
//       for (const employee of employeesData) {
//         try {
//           const engagementResponse = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/engagement/${employee.id}`);
//           if (engagementResponse.ok) {
//             const responseText = await engagementResponse.text();
//             if (responseText) {
//               try {
//                 const engagementData = JSON.parse(responseText);
//                 if (engagementData && Object.keys(engagementData).length > 0) {
//                   engagements.push(engagementData);
//                 }
//               } catch (parseError) {
//                 console.error(`Invalid JSON for employee ${employee.id}:`, parseError);
//               }
//             }
//           }
//         } catch (engagementError) {
//           console.error(`Failed to fetch engagement for employee ${employee.id}:`, engagementError);
//         }
//       }

//       setAllotments(engagements);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error loading data:', err);
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return {
//     allotments,
//     employees,
//     loading,
//     error,
//     refreshData: loadData
//   };
// };