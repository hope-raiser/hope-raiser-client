import { instance } from "../axios/index.js";

async function getAllComment(id) {
    try {
        let path = "/comments"
        if(id) {
            path += `?campaign_id=${id}`
        }
        const response = await instance.get(path);
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

export {
    getAllComment,
    getCommentDetail,
    createNewComment,
    editComment,
    deleteCommentById
}