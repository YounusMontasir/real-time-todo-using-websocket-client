import axios from "axios";

export const axiosInstance = axios.create({
     baseURL: "https://real-time-todo-using-websocket-server.onrender.com",
    // baseURL:`${process.env.NEXT_PUBLIC_API}/api`,
    withCredentials: true,
  });