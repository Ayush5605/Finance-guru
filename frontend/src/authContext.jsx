import React from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import {auth} from './firebase.js';

const API_URL=import.meta.env.VITE_API_URL;

export const loginUser=async(email,password)=>{
    const userCred=await signInWithEmailAndPassword(auth,email,password);
    const token=await userCred.user.getIdToken();

    const res=await axios.post(`${API_URL}/api/auth/login`,{token});
    return res.data;

}

export const signupUser=async(email,password)=>{
    const userCred=await createUserWithEmailAndPassword(auth,email,password);
    const token=await userCred.user.getIdToken();

    const res=await axios.post(`${API_URL}/api/auth/signup`,{token});
    return res.data;
}
