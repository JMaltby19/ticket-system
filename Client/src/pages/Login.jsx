import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginUser } from "../features/auth/authSlice";

export const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading } = useSelector((state) => state.auth);

	const onChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		dispatch(loginUser(userData))
			.unwrap()
			.then((user) => {
				toast.success(`Welcome back ${user.payload[0].user_name}`);
				navigate("/");
			})
			.catch(toast.error);
	};

	return (
		<div className="flex flex-col justify-center items-center mt-44">
			<div className=" rounded-lg w-2/6 bg-slate-400 ">
				<section>
					<h1 className="flex flex-row justify-center items-center gap-2 text-slate-800">
						<FaSignInAlt />
						Login
					</h1>
					<h3 className="text-slate-800">Log into your account</h3>
				</section>
				<section className="my-6">
					<form onSubmit={onSubmit} className="flex flex-col gap-6">
						<div>
							<input
								type="text"
								name="email"
								value={email}
								onChange={onChange}
								placeholder="Email"
								required
							/>
						</div>
						<div>
							<input
								type="password"
								name="password"
								value={password}
								onChange={onChange}
								placeholder="Password"
								required
							/>
						</div>

						<div>
							<button className=" bg-blue-800 p-3 rounded-lg hover:bg-blue-900">
								Submit
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
};
