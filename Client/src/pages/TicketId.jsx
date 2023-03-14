import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Note } from "../components/Note";
import { PreviousButton } from "../components/PreviousButton";
import { createNote, getNotes } from "../features/notes/noteSlice";
import { closeTicket, getTicketById } from "../features/tickets/ticketSlice";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";

export const TicketId = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [note, setNote] = useState("");

	const { ticket } = useSelector((state) => state.tickets);
	const { notes } = useSelector((state) => state.note);
	const { user } = useSelector((state) => state.auth);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { ticketId } = useParams();

	useEffect(() => {
		dispatch(getTicketById(ticketId)).unwrap().catch(toast.error);
		dispatch(getNotes(ticketId)).unwrap().catch(toast.error);
	}, [dispatch, ticketId]);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	Modal.setAppElement("#root");

	const styles = {
		content: {
			width: "40vw",
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			position: "relative",
		},
	};

	const onChange = (e) => {
		setNote((note) => ({
			...note,
			[e.target.name]: e.target.value,
		}));
	};

	const ticketClose = () => {
		dispatch(closeTicket(ticketId, ticket.status))
			.unwrap()
			.then(() => {
				toast.success("Ticket Closed");
				navigate("/tickets");
			})
			.catch(toast.error);
	};

	const noteSubmit = async (e) => {
		e.preventDefault();
		try {
			await Promise.resolve();
			const response = dispatch(createNote({ ticketId, note }));
			console.log(response);
			window.location.reload();
			// return;
			setNote("");
			closeModal();
			return response;
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<div className=" max-w-screen-2xl">
			{ticket && (
				<div className=" bg-slate-200 rounded-lg p-2">
					<div className="grid grid-rows-2 grid-flow-col gap-4 min-h-screen bg-slate-200 rounded-lg p-4">
						<header className="grid row-span-2 divide-y divide-slate-700 ">
							<PreviousButton url={"/tickets"} />
							<h6>
								Ticket ID:
								<span className="font-normal"> {ticket.id}</span>
							</h6>
							<h6>
								Name:{" "}
								<span className="font-normal">{user.payload[0].user_name}</span>
							</h6>
							<h6>
								Date Submitted:{" "}
								<span className="font-normal">
									{new Date(ticket.ticket_added_date).toLocaleString("en-UK")}
								</span>
							</h6>
							<h6>
								Product: <span className="font-normal">{ticket.product}</span>
							</h6>
							<div className="">
								<h6>Description of Issue:</h6>
								<p className=" text-xl">{ticket.description}</p>
							</div>
						</header>

						{/* {ticket.status !== "Closed" && (
							<div className="grid justify-items-center">
								<button
									className="flex flex-row gap-1 justify-center items-center bg-blue-800 ring-offset-2 ring-2 px-4 py-4 rounded-lg w-56 h-20 hover:bg-blue-900"
									onClick={openModal}
								>
									<FaPlus />
									Add Note
								</button>
							</div>
						)} */}

						<Modal
							isOpen={modalOpen}
							onRequestClose={closeModal}
							contentLabel="Add Note"
							style={styles}
						>
							<div className=" top-1 flex flex-row justify-between">
								<h2 className=" text-black text-lg font-extrabold">Add Note</h2>
								<button className="text-black" onClick={closeModal}>
									X
								</button>
							</div>
							<form onSubmit={noteSubmit}>
								<div className="flex justify-center items-center">
									<textarea
										name="note"
										id="note"
										placeholder="Add a note"
										className=" relative w-3/4 h-44 flex justify-center items-center text-center rounded-md"
										onChange={onChange}
									></textarea>
								</div>
								<div className="flex flex-row justify-evenly my-2 ">
									<div className=" bg-slate-900 rounded-md px-2">
										Name: {user.payload[0].user_name}
									</div>
									<div className=" bg-slate-900 rounded-md px-2">
										email: {user.payload[0].email}
									</div>
								</div>
								<div className="flex justify-center items-center mt-3">
									<button
										className=" bg-slate-900 rounded-md px-2"
										type="submit"
									>
										Submit
									</button>
								</div>
							</form>
						</Modal>

						<div className="row-span-3">
							<h3>Notes</h3>

							{notes ? (
								notes.map((note) => <Note key={note.id} note={note} />)
							) : (
								<p>No notes available</p>
							)}
							{ticket.status !== "Closed" && (
								<div className="grid justify-items-center p-4">
									<button
										className="flex flex-row gap-2 justify-center items-center bg-blue-800 ring-offset-2 ring-2 px-4 py-4 rounded-lg w-56 h-20 hover:bg-blue-900"
										onClick={openModal}
									>
										<FaPlus />
										Add Note
									</button>
								</div>
							)}
						</div>
					</div>
					<div className="flex justify-center items-center">
						{ticket.status !== "Closed" && (
							<button
								className="w-1/4 bg-red-600 text-slate-200 rounded-lg p-2 hover:bg-red-700"
								onClick={ticketClose}
							>
								Close Ticket
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
