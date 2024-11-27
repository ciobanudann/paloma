import SelectAccount from "@/components/select-account";
import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div className="flex flex-col gap-4 p-12">
			<SelectAccount />
			<Outlet />
		</div>
	);
};

export default Layout;
