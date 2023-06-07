import { api, authenticatedApi } from "./api_service";

async function fetchUserById(id, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.get(`user/search/${id}`);
}

async function createUser(data) {
  return await api.post("user/", data);
}

async function loginUser(email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.get("user/login/");
}

async function updateUser(id, data, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.put(`user/search/${id}/`, data);
}

async function partialUpdateUser(id, data, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.patch(`user/search/${id}/`, data);
}

async function deleteUser(id, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.delete(`user/search/${id}/`);
}

async function fetchUserOrders(id, email, password, offset) {
  const authApi = authenticatedApi(email, password);
  return await authApi.get(
    `user/search/${id}/orders/?limit=9&offset=${offset}`
  );
}

export {
  fetchUserById,
  createUser,
  updateUser,
  partialUpdateUser,
  deleteUser,
  fetchUserOrders,
  loginUser,
};
