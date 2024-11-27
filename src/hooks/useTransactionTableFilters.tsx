import { Transaction } from "@/types/transaction.type";
import { Table } from "@tanstack/react-table";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const useTransactionTableFilters = (table: Table<Transaction>) => {
	const { accountId } = useParams<{ accountId: string }>();

	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setSearchParams({});
		table.resetColumnFilters();
	}, [accountId]);

	useEffect(() => {
		if (searchParams.get("currency")) {
			table.getColumn("currency")?.setFilterValue(searchParams.get("currency"));
		}

		const minAmount = Number(searchParams.get("minAmount")) || 0;
		const maxAmount = Number(searchParams.get("maxAmount")) || 0;

		if (minAmount || maxAmount) {
			table.getColumn("amount")?.setFilterValue([minAmount, maxAmount]);
		}
	}, [searchParams]);

	return null;
};

export default useTransactionTableFilters;
