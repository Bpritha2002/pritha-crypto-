// import axios from 'axios';

// let adminUrl = "https://api.coincap.io/v2"
// if(process.env?.REACT_APP_ENV === "production"){
//     adminUrl = "https://api.coincap.io/v2"

// }

// export const baseURL = adminUrl;

// let axiosInstance = axios.create({
//     baseURL
// })

// export default axiosInstance;

import axios from "axios";

const API_KEY =
  "1317a146ca92a69c6594d0ec72520980ffa863ac8de54ecdbce1b8e021ca54cd";

// Use new CoinCap v3 base URL
let adminUrl = "https://rest.coincap.io/v3";

if (process.env?.REACT_APP_ENV === "production") {
  adminUrl = "https://rest.coincap.io/v3";
}

export const baseURL = adminUrl;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
  params: {
    apiKey: API_KEY,
  },
});

export default axiosInstance;
