import axios from "axios";

const restaurantApi = axios.create({
  baseURL: "https://example.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default restaurantApi;
//NODEJS BASE URL HERE
//SOMEENDPOINT HERE
//EMPTY END POINT WILL WORK
//SAID TEGEL