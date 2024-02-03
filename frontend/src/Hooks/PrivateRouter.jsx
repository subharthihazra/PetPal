import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { useEffect } from "react";
import Loading from "@/pages/Loading";


export default function PrivateRouter({children}){
    const auth = useSelector((state)=>state.auth.isAuthenticated)
    const isLoading = useSelector((state)=>state.auth.isLoading)
    useEffect(()=>{},[isLoading])
    if(isLoading){
        return (<Loading />)
    }
    if(auth){
        return children;
    }
    return (<Navigate to={DEFAULT_REDIRECT} />)
}