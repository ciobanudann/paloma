import useTransaction from "./hooks/useTransaction";
import TransactionTable from "./components/transaction-table";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import AccountDetails from "./components/account-details";

const Account = () => {
	useTransaction();

	return (
		<>
			<AccountDetails />
			<Card>
				<CardHeader className="pb-0">
					<CardTitle>Transactions</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">
					<TransactionTable />
				</CardContent>
			</Card>
		</>
	);
};

export default Account;
