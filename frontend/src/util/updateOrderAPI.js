import axios from "axios";
const updateOrderAPI = async (url, data) => {
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: data,
    });

    console.log("order response ok", response);

    return response.data.data
  } catch (err) {
    console.log("order update error", err);
    throw err;
  }
};

export default updateOrderAPI;
