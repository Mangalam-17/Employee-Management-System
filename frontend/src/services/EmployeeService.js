import API from "./api";

export const fetchEmployees = async (params) => {
  const response = await API.get("/employees", { params });
  return response.data.data;
};

export const createEmployee = async (data) => {
  const response = await API.post("/employees", data);
  return response.data.data;
};

export const updateEmployee = async (id, data) => {
  const response = await API.put(`/employees/${id}`, data);
  return response.data.data;
};

export const deleteEmployee = async (id) => {
  const response = await API.delete(`/employees/${id}`);
  return response.data.data;
};
