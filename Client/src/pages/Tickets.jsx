import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { PreviousButton } from "../components/PreviousButton";
import { getTickets } from "../features/tickets/ticketSlice";
import { Ticket } from "../components/Ticket";
import { getNotes } from "../features/notes/noteSlice";

export const Tickets = () => {
	const { tickets } = useSelector((state) => state.tickets);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTickets());
	}, [dispatch]);

	return (
		<div className="grid gap-4 h-4/6 bg-slate-200 rounded-lg p-2">
			<PreviousButton url={"/"} />
			<h1 className="text-slate-800">Tickets</h1>
			<div>
				<div className="grid grid-cols-4 my-2 border-solid border-gray-50 border-2 bg-slate-400">
					<h3 className=" text-slate-800">Date</h3>
					<h3 className=" text-slate-800">Product</h3>
					<h3 className=" text-slate-800">status</h3>
					<h3></h3>
				</div>
			</div>
			{tickets ? (
				tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} />)
			) : (
				<div></div>
			)}
		</div>
	);
};
