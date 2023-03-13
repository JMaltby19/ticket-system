import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
	const auth = useSelector((state) => state.auth);

	return !auth.user ? <Navigate to={"/login"} /> : children;
};
