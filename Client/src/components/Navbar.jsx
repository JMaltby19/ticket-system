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
		<div className=" z-10 w-full h-full ">
			<nav className="absolute left-0 top-0 h-20 flex flex-row justify-between px-20 py-5 bg-slate-200 w-full max-w-screen-2xl">
				<h1 className=" text-2xl text-slate-800">
					<Link to="/">Ticket System</Link>
				</h1>
				<ul className="flex flex-row gap-8">
					{user ? (
						<ul className="flex flex-row gap-8">
							<li>
								{" "}
								<h3 className="text-slate-800">
									Hello {user.payload.user_name || user.payload[0].user_name}
								</h3>
							</li>
							<li>
								<button onClick={logout} className="flex flex-row">
									<FaSignOutAlt size={20} className="my-2 text-slate-800" />
									<h3 className="text-slate-800">Logout</h3>
								</button>
							</li>
						</ul>
					) : (
						<>
							{" "}
							<li>
								<Link to={"/login"} className="flex flex-row gap-2">
									<FaSignInAlt size={20} className="my-2 text-slate-800" />
									<h3 className="text-slate-800">Login</h3>
								</Link>
							</li>
							<li>
								<Link to={"/register"} className="flex flex-row gap-2">
									<FaUser size={20} className="my-2 text-slate-800" />
									<h3 className="text-slate-800">Register</h3>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};
