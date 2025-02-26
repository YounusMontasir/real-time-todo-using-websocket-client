import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'

import Login from "./components/login.jsx";
import Comments from "./components/comments.jsx";
import Task from "./components/task.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/task",
    element: <Task/>,
  },
  {
    path: "/comments",
    element: <Comments/>,
  },
  {
    path: "/comments/:category/:id",
    element: <Comments/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <RouterProvider router={router}/>
 </AuthProvider>
 
)
