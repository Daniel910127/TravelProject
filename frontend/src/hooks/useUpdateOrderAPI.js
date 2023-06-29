import { useState, useEffect } from "react";
import axios from "axios";

const updateOrderAPI = (url, data) => {
  return axios({
    method: "post",
    url: url,
    data: data,
  })
    .then((response) => {
      return response.data;
      // setTravelInfo(response.data);
      // setTravelInfo({ ...travelInfo, travelList: items });
    })
    .catch((error) => {
      return error.data;
    });
};

const useUpdateOrderAPI = () => {
  const [updatedOrderData, setUpdatedData] = useState(null);

  const updateOrder = async (url, data) => {
    const newData = await updateOrderAPI(url, data);
    setUpdatedData(newData);
  };
  /* useEffect(() => {
    updateData();
  }, []); */
  return [updatedOrderData, updateOrder];
  // const [data, setData] = useState(initialData);
};

export default useUpdateOrderAPI;
