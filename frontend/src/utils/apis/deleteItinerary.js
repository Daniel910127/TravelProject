import axios from "axios";
const deleteItineraryAPI = async (url, data) => {
  try {
    const response = await axios({
      method: "post",
      url: url,
      data: data,
    });

    console.log("deleteItinerary response ok", response);

    return response.data.data;
  } catch (err) {
    console.log("deleteItinerary error", err);
    throw err;
  }
};

export default deleteItineraryAPI;
