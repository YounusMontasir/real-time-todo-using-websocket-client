import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '../firebase/firebase.init';


export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const loginWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false)
        })
        return(()=>{
            unsubscribe();
        })
    }
        ,[])
    const info = {
        user,
        setUser,
        loginWithGoogle
    }

    return (
        <AuthContext.Provider value={info}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;