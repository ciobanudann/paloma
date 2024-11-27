import React from "react";

import {
	ColumnDef,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Transaction } from "@/types/transaction.type";
import { format } from "date-fns";
import { selectAccountTransactions } from "@/store/selectors/transaction.selector";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useParams } from "react-router-dom";

export const columns: ColumnDef<Transaction>[] = [
	{
		accessorKey: "transactionId",
		header: "ID",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("transactionId")}</div>
		),
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("amount")}</div>
		),
		meta: { filterVariant: "range" },
	},
	{
		accessorKey: "currency",
		header: "Currency",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("currency")}</div>
		),
	},
	{
		accessorKey: "timestamp",
		header: "Time",
		cell: ({ row }) => (
			<div className="capitalize">
				{format(row.getValue("timestamp"), "dd-mm-yyyy hh:mm:ss")}
			</div>
		),
	},
];

const useTransactionTable = () => {
	const { accountId } = useParams<{ accountId: string }>();

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);

	const data = useSelector((store: RootState) =>
		selectAccountTransactions(store, accountId || "")
	);

	const table = useReactTable({
		data,
		columns,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	return { table, data };
};

export default useTransactionTable;
