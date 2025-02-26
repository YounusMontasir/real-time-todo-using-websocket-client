import React, { useContext } from 'react';


import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {loading, user} = useContext(AuthContext)
    if(loading){
       return <p>Loading...</p>
    }
    if(user){
        return children
    }
    return (
        <Navigate state={location.pathname} to="/"></Navigate>
    );
};

export default PrivateRoute;