import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
	notes: [],
};

export const getNotes = createAsyncThunk(
	"notes/getAll",
	async (id, thunkAPI) => {
		try {
			return await noteService.getNotes(id);
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

export const createNote = createAsyncThunk(
	"notes/create",
	async ({ ticketId, note }, thunkAPI) => {
		try {
			return await noteService.createNote(ticketId, note);
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

export const noteSlice = createSlice({
	name: "note",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
				state.notes = null;
			})
			.addCase(getNotes.fulfilled, (state, { payload }) => {
				state.notes = payload;
			});
	},
});

export default noteSlice.reducer;
