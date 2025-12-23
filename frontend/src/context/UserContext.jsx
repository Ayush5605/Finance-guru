import {createContext,useContext,useState} from "react";

const UserContext=createContext();

export const UserProvider=({children})=>{
    const[isPremium,setIsPremium]=useState(false);
    const[loading,setLoading]=useState(false);

    return(
        <UserContext.Provider value={{
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