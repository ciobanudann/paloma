import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { useGetAccountsQuery } from "@/store/apis/accounts.api";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const SelectAccount = () => {
	const { data, isError, refetch } = useGetAccountsQuery();
	const { accountId } = useParams<{ accountId: string }>();
	const [, setSearchParams] = useSearchParams();

	const accounts = data || {};
	const navigate = useNavigate();
	const selectOptions = Object.values(accounts).map((account) => {
		return {
			value: account.accountId,
			label: account.accountName,
		};
	});
	const handleAccountChange = (accountId: string) => {
		setSearchParams({});
		navigate(`accounts/${accountId}`);
	};

	return (
		<Card>
			<CardContent className="flex items-center">
				{isError ? (
					<Button onClick={refetch}>Refresh</Button>
				) : (
					<Select onValueChange={handleAccountChange} value={accountId}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select an account" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Accounts</SelectLabel>
								{selectOptions.map(({ value, label }) => {
									return (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
			</CardContent>
		</Card>
	);
};

export default SelectAccount;
