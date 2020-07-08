import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 10000,
  responseType: "json",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
    'Content-type': 'application/json',
  },
  validateStatus: (_status) => true
})

export const createCancelRequest = axios.CancelToken.source