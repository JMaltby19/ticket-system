import React from "react";
import { Link } from "react-router-dom";

export const Ticket = ({ ticket }) => {
	const options = { day: "numeric", month: "long", year: "numeric" };
	return (
		<div className="flex flex-col">
			<div className="grid grid-cols-4 gap-8 hover:bg-slate-500">
				<p className="text-slate-800 text-base md:text-xl">
					{new Date(ticket.ticket_added_date).toLocaleString("en-UK")}
				</p>
				<p className="text-slate-800 text-base md:text-xl">{ticket.product}</p>
				<p
					className={`${
						ticket.status === "Open"
							? "text-green-600 text-base md:text-xl"
							: "text-red-700 text-base md:text-xl"
					}`}
				>
					{ticket.status}
				</p>
				<Link to={`/tickets/${ticket.id}`}>
					<p className="text-slate-800 text-base md:text-xl hover:text-slate-400">
						View
					</p>
				</Link>
			</div>
		</div>
	);
};
