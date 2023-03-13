import React from "react";
import { Link } from "react-router-dom";

export const Ticket = ({ ticket }) => {
	const options = { day: "numeric", month: "long", year: "numeric" };
	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-4 gap-8 hover:bg-slate-500">
				<p className="text-slate-800">
					{new Date(ticket.ticket_added_date).toLocaleString("en-UK")}
				</p>
				<p className="text-slate-800">{ticket.product}</p>
				<p className="text-slate-800">{ticket.status}</p>
				<Link to={`/tickets/${ticket.id}`}>
					<p className="text-slate-800 hover:text-slate-400">View</p>
				</Link>
			</div>
		</div>
	);
};
