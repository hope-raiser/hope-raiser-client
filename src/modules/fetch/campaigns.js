import { instance } from "../axios/index.js";

async function getAllCampaign(category_id) {
    try {
        let path = "/campaigns"
        if(category_id) {
            path = `campaigns?category_id=${category_id}`
        }
        const response = await instance.get(path);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getCampaignDetail(id) {
    try {
        const response = await instance.get(`/campaigns/${id}`);
        return response.data;
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
    createNewCampaign,
    editCampaign,
    deleteCampaignById
}