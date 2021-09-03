import axios, { AxiosInstance } from "axios";
// const restaurantApi = axios;

const restaurantApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

//NODEJS BASE URL HERE
//SOMEENDPOINT HERE
//EMPTY END POINT WILL WORK
//SAID TEGEL
export default restaurantApi;
