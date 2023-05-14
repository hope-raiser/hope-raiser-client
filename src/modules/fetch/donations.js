import { instance } from "../axios/index.js";

async function getAllDonation(id) {
    try {
        let path = "/donations"
        if(id) {
            path += `?campaign_id=${id}`
        }
        const response = await instance.get(path);
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

export {
    getAllDonation,
    getDonationDetail,
    createNewDonation,
    editDonation,
    deleteDonationById
}