import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Account from "./views/Account.tsx";
import Empty from "./views/Empty.tsx";
import Layout from "./views/Layout.tsx";

const router = createBrowserRouter([
	{
		path: "",
		element: <Layout />,

		children: [
			{
				path: "*",
				element: <Navigate to="/" />,
			},
			{
				path: "",
				element: <Empty />,
			},
			{
				path: "accounts/:accountId",
				element: <Account />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
		<ToastContainer />
	</StrictMode>
);
