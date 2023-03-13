import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
	isLoading: false,
	message: "",
	userToken: "",
};

export const registerUser = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
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

export const loginUser = createAsyncThunk(
	"auth/login",
	async (user, thunkAPI) => {
		try {
			return await authService.login(user);
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

export const logoutUser = createAsyncThunk("auth/logout", async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, ({ isLoading }) => {
				isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = payload;
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.isLoading = false;
				state.message = payload;
				state.user = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.user = payload;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
			});
	},
	// extraReducers: {
	// 	[registerUser.pending]: (state) => {
	// 		state.isLoading = true;
	// 	},
	// 	[registerUser.fulfilled]: (state, { payload }) => {
	// 		state.isLoading = false;
	// 		state.isSuccess = true;
	// 		state.user = payload;
	// 	},
	// 	[registerUser.rejected]: (state, { payload }) => {
	// 		state.isLoading = false;
	// 		state.isError = true;
	// 		state.message = payload;
	// 		state.user = null;
	// 	},
	// },
});

export default authSlice.reducer;
export const { reset } = authSlice.actions;
