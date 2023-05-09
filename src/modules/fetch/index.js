import { instance } from "../config/axiosConfig";

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

async function getAllBooks() {
  try {
    const response = await instance.get("/books");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getBookDetail(id) {
  try {
    const response = await instance.get(`/books/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createNewBook(data) {
  try {
    const response = await instance.post("/books", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editBook(id, data) {
  try {
    const response = await instance.put(`/books/${id}`, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteBookById(id) {
  try {
    const response = await instance.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllCategory() {
  try {
    const response = await instance.get("/categories");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getCategoryDetail(id) {
  try {
    const response = await instance.get(`/categories/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createNewCategory(data) {
  try {
    const response = await instance.post("/categories", data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editCategory(id, data) {
  try {
    const response = await instance.put(`/categories/${id}`, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteCategoryById(id) {
  try {
    const response = await instance.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllComment() {
  try {
    const response = await instance.get("/comments");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getCommentDetail(id) {
  try {
    const response = await instance.get(`/comments/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createNewComment(data) {
  try {
    const response = await instance.post("/comments", data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editComment(id, data) {
  try {
    const response = await instance.put(`/comments/${id}`, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteCommentById(id) {
  try {
    const response = await instance.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllDonation() {
  try {
    const response = await instance.get("/donations");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getDonationDetail(id) {
  try {
    const response = await instance.get(`/donations/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createNewDonation(data) {
  try {
    const response = await instance.post("/donations", data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editDonation(id, data) {
  try {
    const response = await instance.put(`/donations/${id}`, { data });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteDonationById(id) {
  try {
    const response = await instance.delete(`/donations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getAllBookmark() {
  try {
    const response = await instance.get("/bookmarks");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function getBookmarkDetail(id) {
  try {
    const response = await instance.get(`/bookmarks/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function createNewBookmark(data) {
  try {
    const response = await instance.post("/bookmarks", data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function deleteBookmarkById(id) {
  try {
    const response = await instance.delete(`/bookmarks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

export {
  getAllBooks,
  registerUser,
  loginUser,
  deleteUser,
  changePassword,
  createNewBook,
  getBookDetail,
  deleteBookById,
  editBook,
  getAllCategory,
  getCategoryDetail,
  createNewCategory,
  editCategory,
  deleteCategoryById,
  getAllComment,
  getCommentDetail,
  createNewComment,
  editComment,
  deleteCommentById,
  getAllDonation,
  getDonationDetail,
  createNewDonation,
  editDonation,
  deleteDonationById,
  getAllBookmark,
  getBookmarkDetail,
  createNewBookmark,
  deleteBookmarkById
};
