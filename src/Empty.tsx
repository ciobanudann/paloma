import { Card, CardContent } from "./components/ui/card";
import { useGetAccountsQuery } from "./store/apis/accounts.api";

const Empty = () => {
	const { isError } = useGetAccountsQuery();

	return (
		<Card>
			<CardContent className="flex w-full justify-center items-center">
				{isError
					? "An Error Occured Please Refresh"
					: "Please Select An Account"}
			</CardContent>
		</Card>
	);
};

export default Empty;
