import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

export const Home = () => {
	return (
		<div className=" flex flex-col justify-center items-center gap-20 mt-20">
			<section>
				<h1 className="text-slate-100">What help do you need?</h1>
				<h5 className="text-slate-100">Please choose from an option below</h5>
			</section>

			<Link
				to={"/new-ticket"}
				className="flex flex-row justify-center items-center gap-4 bg-slate-400 ring-offset-2 ring-2 outline-offset-2 px-4 py-4 rounded-lg w-96 hover:bg-slate-600"
			>
				<FaQuestionCircle className="mt-2 text-slate-800" />
				<h3 className=" text-slate-800">Create new ticket</h3>
			</Link>
			<Link
				to={"/tickets"}
				className="flex flex-row justify-center items-center gap-4 bg-slate-400 ring-offset-2 ring-2 px-4 py-4 rounded-lg w-96 hover:bg-slate-600"
			>
				<FaTicketAlt className="mt-2 text-slate-200" />
				<h3 className=" text-slate-200"> View my tickets</h3>
			</Link>
		</div>
	);
};
