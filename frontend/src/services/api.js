const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchHealthCheck = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
};