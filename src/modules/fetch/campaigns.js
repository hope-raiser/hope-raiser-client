import { instance } from "../axios/index.js";
import Swal from "sweetalert2";

async function getAllCampaign(params) {
  try {
    let path = "/campaigns";
    let { category_id, limit, page } = params;

    limit = 5;
    // let hapus = ""
    // filter length 1
    let filter = "?";

    if (category_id) {
      if (filter.length > 1) {
        filter += "&";
      }
      filter += `category_id=${category_id}`;
    }
    if (limit) {
      if (filter.length > 1) {
        filter += "&";
      }
      filter += `limit=${limit}`;
    }
    if (page) {
      if (filter.length > 1) {
        filter += "&";
      }
      filter += `page=${page}`;
    }
    if (filter.length > 1) {
      path += filter;
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
