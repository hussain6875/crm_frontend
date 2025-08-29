// Base URL for your backend API
const API_BASE_URL = "http://localhost:8080/api";

export const getAllLeadsApi = `${API_BASE_URL}/leads`;
export const getLeadByIdApi = (id) => {
  return `${API_BASE_URL}/leads/${id}`;
};
export const createLeadApi = `${getAllLeadsApi}/create`;
export const editLeadApi = `${getAllLeadsApi}/edit/`;

