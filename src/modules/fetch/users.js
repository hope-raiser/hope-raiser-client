import { instance } from "../axios/index.js";

async function registerUser(data) {
  try {
    const response = await instance.post("/users/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function loginUser(data) {
  try {
    const response = await instance.post("/users/login", data);
    localStorage.setItem("token", response.data.token);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function changePassword(id, data) {
  try {
    const response = await instance.put(`/users/update/${id}`, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteUser(id) {
  try {
    const response = await instance.delete(`/users/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export {
  registerUser,
  loginUser,
  deleteUser,
  changePassword
};
