import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { PreviousButton } from "../components/PreviousButton";
import { createTicket } from "../features/tickets/ticketSlice";

export const NewTicket = () => {
	const { user } = useSelector((state) => state.auth);

	const { user_name, email } = user.payload[0];

	const [product, setProduct] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			dispatch(createTicket({ product, description })).unwrap();
			navigate("/tickets");
			toast.success("New ticket created");
		} catch (error) {
			toast.error;
		}
	};

	return (
		<div className="flex flex-col justify-center items-center mt-20">
			<div className=" rounded-lg w-4/6 bg-slate-200 p-2">
				<PreviousButton url={"/"} />
				<section>
					<h1>Create a new Ticket</h1>
					<p>Please fill in the form below to create you ticket</p>
				</section>
				<section className="flex flex-col gap-4">
					<div>
						<label className="text-slate-800" htmlFor="name">
							Customer Name:
						</label>
						<span className="text-slate-800"> {user_name}</span>
					</div>
					<div>
						<label className="text-slate-800" htmlFor="name">
							Customer Email:
						</label>
						<span className="text-slate-800"> {email}</span>
					</div>
					<form className="flex flex-col gap-8" onSubmit={onSubmit}>
						<div className=" flex flex-row justify-center items-center px-8 gap-4">
							<label className="text-slate-800" htmlFor="product">
								Product
							</label>
							<input
								type="text"
								name="product"
								id="product"
								onChange={(e) => setProduct(e.target.value)}
							/>
						</div>
						<div className=" flex flex-row justify-center items-center gap-4">
							<label className="text-slate-800" htmlFor="description">
								Description
							</label>
							{/* <input
							type="text"
							name="description"
							id="description"
							onChange={(e) => setDescription(e.target.value)}
						/> */}
							<textarea
								name="text"
								id="text"
								className=" relative h-20 flex justify-center items-center text-center rounded-md"
								onChange={(e) => setDescription(e.target.value)}
							></textarea>
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
