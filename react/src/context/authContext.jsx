import { useState,useEffect,useContext,createContext } from "react";

const AuthContext=createContext()
export const useAuth=()=>{
    const context=useContext(AuthContext)
    return context
}

export const AuthContextProvider=({children})=>{
    const [auth,setAuth]=useState(false)


    const value={
        auth,
        setAuth
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}