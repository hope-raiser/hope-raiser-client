import { instance } from "../axios/index.js";

async function getAllCampaign() {
    try {
        const response = await instance.get("/campaigns");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getCampaignDetail(id) {
    try {
        const response = await instance.get(`/campaigns/${id}`);
        return response;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function createNewCampaign(data) {
    try {
        const response = await instance.post("/campaigns", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function editCampaign(id, data) {
    try {
        const response = await instance.put(`/campaigns/${id}`, { data });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteCampaignById(id) {
    try {
        const response = await instance.delete(`/campaigns/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export{
    getAllCampaign,
    getCampaignDetail,
    deleteCampaignById,
    editCampaign
}