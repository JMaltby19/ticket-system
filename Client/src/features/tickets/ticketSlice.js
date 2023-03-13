import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
	tickets: null,
	ticket: null,
};

export const getTickets = createAsyncThunk(
	"tickets/getAll",
	async (_, thunkAPI) => {
		try {
			return await ticketService.getTickets();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getTicketById = createAsyncThunk(
	"tickets/getById",
	async (id, thunkAPI) => {
		try {
			return await ticketService.getTicketById(id);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const createTicket = createAsyncThunk(
	"tickets/create",
	async (ticketData, thunkAPI) => {
		try {
			return await ticketService.createTicket(ticketData);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const closeTicket = createAsyncThunk(
	"tickets/close",
	async (id, status, thunkAPI) => {
		try {
			return await ticketService.closeTicket(id, status);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const ticketSlice = createSlice({
	name: "ticket",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTickets.fulfilled, (state, { payload }) => {
				state.tickets = payload;
			})
			.addCase(getTicketById.fulfilled, (state, { payload }) => {
				state.ticket = payload;
			});
		// .addCase(closeTicket.fulfilled, (state, { payload }) => {
		// 	// state.ticket = payload;
		// 	state.tickets = state.tickets.map((ticket) =>
		// 		ticket.id === payload.id ? payload : ticket
		// 	);
		// });
	},
});

export default ticketSlice.reducer;
