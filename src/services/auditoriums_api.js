import { api, authenticatedApi } from "./api_service";

async function fetchAuditoriums() {
  return await api.get("auditorium/");
}

async function createAuditorium(data) {
  return await api.post("auditorium/", data);
}

async function fetchAuditoriumById(id, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.get(`auditorium/search/${id}/`);
}

async function updateAuditorium(id, data, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.put(`auditorium/${id}/update/`, data);
}

async function deleteAuditorium(id) {
  return await api.delete(`auditorium/${id}/delete/`);
}

export {
  fetchAuditoriumById,
  fetchAuditoriums,
  createAuditorium,
  updateAuditorium,
  deleteAuditorium,
};
