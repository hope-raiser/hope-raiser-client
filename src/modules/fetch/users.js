import useAuthStore from "../authStore";
import { instance } from "../axios/index.js";

async function registerUser(data) {
  try {
    const response = await instance.post("/users/register", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

// async function loginUser(data) {
//   try {
//     const response = await instance.post("/users/login", data);
//     localStorage.setItem("token", response.data.token);
//     return data;
//   } catch (error) {
//     throw new Error(error.response.data.message || "Something went wrong");
//   }
// }

async function loginUser(data) {
  try {
    const response = await instance.post("/users/login", data);
    const { token, email, name, id } = response.data;

    // Update the user's data in the Zustand store
    useAuthStore.setState((state) => ({
      user: {
        ...state.user,
        token,
        email,
        name,
        id,
      },
    }));

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllUsers() {
  try {
    const response = await instance.get("/users");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function updateUser(id, name, password) {
  try {
    const response = await instance.patch(`/users/update-user/${id}`, {
      name,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function updateProfile(id, name, password) {
  try {
    const response = await instance.patch(`/users/profile-user`, {
      id,
      name,
      password,
    });
    return response.data;
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
  getAllUsers,
  deleteUser,
  changePassword,
  updateUser,
  updateProfile,
};
