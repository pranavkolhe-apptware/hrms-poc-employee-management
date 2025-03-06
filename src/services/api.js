
// All API's Here of Engagement Section

export const fetchEmployees = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/listEmployees`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    console.log(response.json());
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const fetchEngagements = async (employeeId) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/engagement/${employeeId}`);
    console.log(response.json());
    if (!response.ok) throw new Error('Failed to fetch engagements');
    return await response.json();
  } catch (error) {
    console.error('Error fetching engagements:', error);
    throw error;
  }
};