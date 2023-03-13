import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const PreviousButton = ({ url }) => {
	return (
		<div className="w-30">
			<Link to={url} className="flex flex-row gap-2 text-slate-800">
				<FaArrowCircleLeft size={20} className="my-1" />{" "}
				<h3 className="text-slate-800"> Previous</h3>
			</Link>
		</div>
	);
};
