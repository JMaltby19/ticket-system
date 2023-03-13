import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

export const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const logout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<heade className=" w-full h-20 flex flex-row justify-between my-0">
			<h1 className=" text-2xl text-slate-100">
				<Link to="/">Ticket System</Link>
			</h1>
			<ul className="flex flex-row gap-8">
				{user ? (
					<ul className="flex flex-row gap-8">
						<li>
							{" "}
							<h3 className="text-slate-100">
								Hello {user.payload[0].user_name}
							</h3>
						</li>
						<li>
							<button onClick={logout} className="flex flex-row">
								<FaSignOutAlt size={20} className="my-2 " />
								<h3 className="text-slate-100">Logout</h3>
							</button>
						</li>
					</ul>
				) : (
					<>
						{" "}
						<li>
							<Link to={"/login"} className="flex flex-row gap-2">
								<FaSignInAlt size={20} className="my-2" />
								<h3>Login</h3>
							</Link>
						</li>
						<li>
							<Link to={"/register"} className="flex flex-row gap-2">
								<FaUser size={20} className="my-2" />
								<h3>Register</h3>
							</Link>
						</li>
					</>
				)}
			</ul>
		</heade>
	);
};
