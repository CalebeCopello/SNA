import React from "react";
import { Navigate } from "react-router-dom";
import useIsUserLogged from "../hooks/useIsUserLogged";

const ProtectedRoute = ({children}) => {
    const {isUserInfoloaded, isUserLogged} = useIsUserLogged()
    if (!isUserInfoloaded) {
        return <div className="">Loading...</div>
    }
    if (!isUserLogged) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default ProtectedRoute