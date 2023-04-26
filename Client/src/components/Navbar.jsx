import React, { useState } from "react";
import {
	FaSignInAlt,
	FaSignOutAlt,
	FaUser,
	FaBars,
	FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavBarBtn } from "./NavBarBtn";

export const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [open, setOpen] = useState(false);
	const logout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<div className=" w-full h-full ">
			<nav className="absolute left-0 top-0 h-30 md:h-20 flex flex-row justify-between px-20 py-5 bg-slate-200 w-full max-w-screen-2xl">
				<h1 className=" text-xl lg:text-2xl text-slate-800">
					<Link to="/">Ticket System</Link>
				</h1>
				<div onClick={() => setOpen(!open)}>
					{open ? (
						<FaTimes
							size={20}
							className="absolute my-2 right-8 text-slate-800 md:hidden"
						/>
					) : (
						<FaBars
							size={20}
							className="absolute my-2 right-8 text-slate-800 md:hidden"
						/>
					)}

					{/* <FaBars
						size={20}
						className="absolute my-2 right-8 text-slate-800 md:hidden"
					/> */}
				</div>
				<ul
					className={`flex flex-col absolute bg-slate-200 w-full md:w-auto left-0 pl-20 pb-4 text-left md:z-20  md:static mt-10 md:mt-0 md:flex-row gap-8 
          transition-all duration-400 ease-in 
          ${open ? "opacity-100" : "top-[-490px]"}`}
				>
					{user ? (
						<>
							<li>
								{" "}
								<h3 className=" text-xl lg:text-2xl text-slate-800">
									Hello {user.payload.user_name || user.payload[0].user_name}
								</h3>
							</li>
							<li>
								<button onClick={logout} className="flex flex-row">
									<FaSignOutAlt size={20} className="my-2 text-slate-800" />
									<h3 className=" text-xl lg:text-2xl text-slate-800">
										Logout
									</h3>
								</button>
							</li>
						</>
					) : (
						<>
							{" "}
							<li>
								<Link to={"/login"} className="flex flex-row gap-2">
									<FaSignInAlt size={20} className="my-2 text-slate-800" />
									<h3 className=" text-xl lg:text-2xl text-slate-800">Login</h3>
								</Link>
							</li>
							<li>
								<Link to={"/register"} className="flex flex-row gap-2">
									<FaUser size={20} className="my-2 text-slate-800" />
									<h3 className=" text-xl lg:text-2xl text-slate-800">
										Register
									</h3>
								</Link>
							</li>
						</>
					)}
					{/* <NavBarBtn></NavBarBtn> */}
				</ul>
			</nav>
		</div>
	);
};
