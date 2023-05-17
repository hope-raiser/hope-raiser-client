import { instance } from "../axios/index.js";
import Swal from "sweetalert2";

async function getAllCampaign(params) {
  try {
    let path = "/campaigns";
    const {category_id, limit, page} = params
    
    if (category_id) {
      path = `campaigns?category_id=${category_id}`;
    }
    path += `&page=${page}`;
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
      headers: { "Content-Type": "multipart/form-data" }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Something went wrong");
  }
}

async function editCampaign(id, data) {
  try {
    const response = await instance.put(`/campaigns/${id}`, { ...data });

    Swal.fire({
      position: "top",
      icon: "success",
      title: "Update Campaign Successfully.",
      showConfirmButton: false,
      timer: 1500
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.message || "Something went wrong"
    });
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

export { getAllCampaign, getCampaignDetail, createNewCampaign, editCampaign, deleteCampaignById };
