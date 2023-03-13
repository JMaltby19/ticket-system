import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NewTicket } from "./pages/NewTicket";
import { PrivateRoute } from "./hooks/PrivateRoute";
import { Tickets } from "./pages/Tickets";
import { TicketId } from "./pages/TicketId";

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<div>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/"
							element={
								<PrivateRoute>
									<Home />
								</PrivateRoute>
							}
						></Route>
						<Route
							path="/new-ticket"
							element={
								<PrivateRoute>
									<NewTicket />
								</PrivateRoute>
							}
						></Route>
						<Route
							path="/tickets"
							element={
								<PrivateRoute>
									<Tickets />
								</PrivateRoute>
							}
						></Route>
						<Route
							path="/tickets/:ticketId"
							element={
								<PrivateRoute>
									<TicketId />
								</PrivateRoute>
							}
						></Route>
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</div>
	);
}

export default App;
