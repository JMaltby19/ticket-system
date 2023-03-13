import React from "react";
import { useSelector } from "react-redux";

export const Note = ({ note }) => {
	const { user } = useSelector((state) => state.auth);

	const options = { day: "numeric", month: "long", year: "numeric" };
	return (
		<div>
			<div className="grid grid-rows-2 text-lg my-4 gap-4 border-gray-50 border-solid border-2 rounded-lg">
				<h4 className=" bg-slate-400 text-slate-800">
					Posted by {user.payload[0].user_name} on{" "}
					{new Date(note.note_added_date).toLocaleString("en-UK")}
				</h4>
				<div className=" text-2xl">{note.note}</div>
				{/* <div className="">
					{new Date(note.note_added_date).toLocaleString("en-UK")}
				</div> */}
			</div>
		</div>
	);
};
