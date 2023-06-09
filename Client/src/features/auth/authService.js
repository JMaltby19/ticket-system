import axios from "axios";

// const API_URL = "http://localhost:8001/api/users";
const API_URL = "https://ticket-system-backend-alpha.vercel.app/api/users";

const register = async (userData) => {
	const response = await axios.post(API_URL, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
	}

	return response.data;
};

const login = async (userData) => {
	const response = await axios.post(`${API_URL}/login`, userData);

	if (response.data) {
		localStorage.setItem("user", JSON.stringify(response.data));
		localStorage.setItem("token", response.data.token);
	}

	return response.data;
};

const logout = () => {
	localStorage.removeItem("user");
};

const authService = {
	register,
	login,
	logout,
};

export default authService;
