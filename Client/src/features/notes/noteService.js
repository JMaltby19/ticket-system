import axios from "axios";

// const API_URL = "http://localhost:8001/api/tickets";
const API_URL = "https://ticket-system-backend-alpha.vercel.app/api/tickets";

const getNotes = async (id) => {
	const response = await axios.get(`${API_URL}/${id}/notes`, {
		headers: { token: localStorage.getItem("token") },
	});

	console.log(response);

	return response.data.payload;
};

const createNote = async (ticketId, note) => {
	const response = await axios.post(`${API_URL}/${ticketId}/notes`, note, {
		headers: { token: localStorage.getItem("token") },
	});

	console.log(response);

	return response.data.payload;
};

const noteService = {
	createNote,
	getNotes,
};

export default noteService;
