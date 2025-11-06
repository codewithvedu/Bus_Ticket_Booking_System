import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1234", // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically when present in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export // users
async function registerUser(data) {
  return api.post("/users/register", data);
}
export async function loginUser(data) {
  return api.post("/users/login", data);
}
// Get logged-in user's profile (requires token)
export async function getUserProfile() {
  return api.get("/users/profile");
}

// Add a new bus (admin only)
export async function addBus(data) {
  return api.post("/buses", data);
}

// Update existing bus (admin only)
export async function updateBus(id, data) {
  return api.put(`/buses/${id}`, data);
}

// Delete bus (admin only)
export async function deleteBus(id) {
  return api.delete(`/buses/${id}`);
}

// buses
export async function getAllBuses() {
  return api.get("/buses");
}
export async function getBusById(id) {
  return api.get(`/buses/${id}`);
}

// bookings (examples based on your backend docs)
export async function addBooking(data) {
  return api.post("/bookings/add", data);
}
export async function getBookingsByUser(userId) {
  return api.get(`/bookings/getByUser/${userId}`); // if backend supports this
}
export async function getAllBookings() {
  return api.get("/bookings/getAll");
}

export async function getBookingById(id) {
  return api.get(`/bookings/get/${id}`);
}

export async function updateBooking(id, data) {
  return api.put(`/bookings/update/${id}`, data);
}

export async function deleteBooking(id) {
  return api.delete(`/bookings/delete/${id}`);
}

// Admin login
export async function loginAdmin(data) {
  return api.post("/admin/login", data);
}

// Register another admin (only admin can)
export async function registerAdmin(data) {
  return api.post("/admin/register", data);
}

export default api;
