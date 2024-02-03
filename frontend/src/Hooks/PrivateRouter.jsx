import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { DEFAULT_REDIRECT } from "@/lib/routes";


export default function PrivateRouter({children}){
    const state = useSelector((state)=>state.auth.isAuthenticated)
    console.log(state)
    if(state){
        return children;
    }
    return (<Navigate to={DEFAULT_REDIRECT} />)
}