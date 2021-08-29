import axios from "axios";

const restaurantApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const runASecondFunction = () => {
  console.log("second")
};

//NODEJS BASE URL HERE
//SOMEENDPOINT HERE
//EMPTY END POINT WILL WORK
//SAID TEGEL
export default restaurantApi;
