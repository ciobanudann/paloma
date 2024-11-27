import { Card, CardContent } from "@/components/ui/card";
import { useGetAccountsQuery } from "@/store/apis/accounts.api";

const Empty = () => {
	const { isError } = useGetAccountsQuery();

	return (
		<Card>
			<CardContent className="flex items-center justify-center w-full">
				{isError
					? "An Error Occured Please Refresh"
					: "Please Select An Account"}
			</CardContent>
		</Card>
	);
};

export default Empty;
