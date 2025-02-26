import axios from "axios";

export const axiosInstance = axios.create({
     baseURL: "http://localhost:5000",
    // baseURL:`${process.env.NEXT_PUBLIC_API}/api`,
    withCredentials: true,
  });