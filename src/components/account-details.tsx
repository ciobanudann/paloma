import { useParams } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { useGetAccountsQuery } from "@/store/apis/accounts.api";

const AccountDetails = () => {
	const { data } = useGetAccountsQuery();
	const accounts = data || {};

	const { accountId } = useParams<{ accountId: string }>();
	const account = accounts[accountId || ""];

	if (!account) {
		return;
	}

	return (
		<Card>
			<CardContent>
				<div className="grid grid-cols-3 gap-x-5">
					<div>
						<b>Name:</b> {account.accountName}
					</div>
					<div>
						<b>Country:</b> {account.country}
					</div>
					<div>
						<b>Phone Number:</b> {account.phoneNumber}
					</div>
					<div>
						<b>Email:</b> {account.email}
					</div>
					<div>
						<b>Currency:</b> {account.currency}
					</div>
					<div>
						<b>Address:</b> {account.address}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default AccountDetails;
