import { instance } from "../axios/index.js";


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

  export{
    getAllBookmark,
    getBookmarkDetail,
    createNewBookmark,
    deleteBookmarkById,
  }