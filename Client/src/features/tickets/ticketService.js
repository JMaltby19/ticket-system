import axios from "axios";

// const API_URL = "http://localhost:8001/api/tickets/";
const API_URL = "https://ticket-system-backend-alpha.vercel.app/api/tickets/";

const getTickets = async () => {
	const response = await axios.get(API_URL, {
		headers: { token: localStorage.getItem("token") },
	});

	console.log(response);

	return response.data.payload;
};

const getTicketById = async (id) => {
	const response = await axios.get(`${API_URL}${id}`, {
		headers: { token: localStorage.getItem("token") },
	});

	console.log(response);

	return response.data.payload[0];
};

const createTicket = async (ticketData) => {
	const response = await axios.post(API_URL, ticketData, {
		headers: { token: localStorage.getItem("token") },
	});

	console.log(response);

	// return response.data;
};

const closeTicket = async (id, status) => {
	const response = await axios.patch(`${API_URL}${id}`, status, {
		headers: { token: localStorage.getItem("token") },
	});

	console.log(response.data);
};

const ticketService = {
	createTicket,
	getTickets,
	getTicketById,
	closeTicket,
};

export default ticketService;
