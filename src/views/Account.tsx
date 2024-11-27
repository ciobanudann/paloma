import AccountDetails from "@/components/account-details";
import TransactionTable from "@/components/transaction-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useTransaction from "@/hooks/useTransaction";

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
