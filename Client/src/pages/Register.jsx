import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

export const Register = () => {
	const [formData, setFormData] = useState({
		user_name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { user_name, email, password, confirmPassword } = formData;

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

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			const userData = {
				user_name,
				email,
				password,
			};

			dispatch(registerUser(userData))
				.unwrap()
				.then((user) => {
					toast.success(`Registered new user - ${user.payload.user_name}`);
					navigate("/");
				})
				.catch(toast.error);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center mt-44">
			<div className=" rounded-lg w-2/6 bg-slate-200 ">
				<section>
					<h1 className="flex flex-row justify-center items-center gap-2">
						<FaUser />
						Register
					</h1>
					<h3>Please create an account</h3>
				</section>
				<section className="my-6">
					<form onSubmit={onSubmit} className="flex flex-col gap-6">
						<div>
							<input
								type="text"
								name="user_name"
								value={user_name}
								onChange={onChange}
								placeholder="Name"
								required
							/>
						</div>
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
							<input
								type="password"
								name="confirmPassword"
								value={confirmPassword}
								onChange={onChange}
								placeholder="Confirm Password"
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
