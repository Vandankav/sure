import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout for file uploads
});

export const uploadStatement = async (file, selectedBank = null) => {
  const formData = new FormData();
  formData.append("statement", file);

  if (selectedBank) {
    formData.append("bank", selectedBank);
  }

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(
        error.response.data.error ||
          error.response.data.message ||
          "Upload failed"
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Network error. Please check if the server is running.");
    } else {
      // Something else happened
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};

export default api;
