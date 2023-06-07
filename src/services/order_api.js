import { authenticatedApi } from "./api_service";

async function fetchOrderById(id, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.get(`order/${id}/`);
}

async function createOrder(data, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.post(`order/`, data);
}

async function updateOrder(id, data, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.put(`order/${id}/`, data);
}

async function partialUpdateOrder(id, data, email, password) {
  const authApi = authenticatedApi(email, password);
  return await authApi.patch(`order/${id}/`, data);
}

async function deleteOrder(orderId, email, password) {
  const authApi = authenticatedApi(email, password);
  authApi.delete(`order/${orderId}/`);
}

export {
  fetchOrderById,
  createOrder,
  updateOrder,
  partialUpdateOrder,
  deleteOrder,
};
