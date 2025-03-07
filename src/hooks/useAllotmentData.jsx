
import { useState, useEffect, useCallback } from 'react';

export const useAllotmentData = () => {
  const [allotments, setAllotments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}employee/engagement`);
      if (!response.ok) {
        throw new Error('Failed to fetch allotments');
      }
      
      const data = await response.json();
      setAllotments(data);
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
    loading,
    error,
    refreshData: loadData
  };
};
