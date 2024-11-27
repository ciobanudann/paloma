import { Outlet } from "react-router-dom";
import SelectAccount from "./components/select-account";

const Layout = () => {
	return (
		<div className="flex flex-col gap-4 p-12">
			<SelectAccount />
			<Outlet />
		</div>
	);
};

export default Layout;
