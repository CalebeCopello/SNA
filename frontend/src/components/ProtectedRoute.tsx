import React from "react";
import { Navigate } from "react-router-dom";
import useIsLogged from "../hooks/useIsLogged";

const ProtectedRoute = ({children}) => {
    const {loaded, logged} = useIsLogged()
    if (!loaded) {
        return <div className="">Loading...</div>
    }
    if (!logged) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default ProtectedRoute