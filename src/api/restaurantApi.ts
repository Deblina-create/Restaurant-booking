import axios from "axios";

const restaurantApi = axios.create({
  baseURL: "https://example.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default restaurantApi;
