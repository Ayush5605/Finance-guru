import {createContext,useContext,useState,useEffect} from "react";
import axios from "axios";

const UserContext=createContext();

export const UserProvider=({children})=>{
    const[user,setUser]=useState(null);
    const[isPremium,setIsPremium]=useState(false);
    const[loading,setLoading]=useState(true);


    useEffect(()=>{
        const fetchUser=async()=>{
        try{
            const token=localStorage.getItem('token');
            if(!token){
                setLoading(false);
                return;
            }

            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );

            setUser(res.data.user);
            setIsPremium(res.data.user.isPremium===true);
            
        }catch(err){
            console.error("User fetch failed",err);

        }finally{
            setLoading(false);
        }
        };
        fetchUser();
    },[]);

    return(
        <UserContext.Provider value={{
            user,
            isPremium,
            setIsPremium,
            loading,
            setLoading
        }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser=()=>useContext(UserContext);