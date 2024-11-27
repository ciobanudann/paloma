"use client";

import { Button } from "@/components/ui/button";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	selectIsPaused,
	selectTransactionAmountFilterValues,
	selectTransactionCurrencyFilterValues,
} from "@/store/selectors/transaction.selector";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { togglePauseTransactions } from "@/store/slices/transaction.slice";

import CurrencyFilter from "./currency-filter";
import AmountFilter from "./amount-filter";

import useTransactionTable, { columns } from "@/hooks/useTransactionTable";
import useTransactionTableFilters from "@/hooks/useTransactionTableFilters";
import { flexRender } from "@tanstack/react-table";

const TransactionTable = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const currencyFilterOptions = useSelector(
		selectTransactionCurrencyFilterValues
	);
	const amountFilterOptions = useSelector(selectTransactionAmountFilterValues);

	const dispatch = useDispatch();
	const isPaused = useSelector(selectIsPaused);

	const { data, table } = useTransactionTable();

	const handlePauseTransactions = () => {
		dispatch(togglePauseTransactions());
	};

	const handleChangeCurrencyFilter = (currency: string) => {
		setSearchParams({ ...searchParams, currency });
	};
	const handleResetFilters = () => {
		table.resetColumnFilters();
	};
	const currencyFilterValue =
		(table.getColumn("currency")?.getFilterValue() as string) ?? "";

	const amountFilterValue = (table.getColumn("amount")?.getFilterValue() as [
		number,
		number
	]) || [0, 0];

	useTransactionTableFilters(table);

	return (
		<div className="w-full">
			<div className="flex items-center justify-between gap-4 py-4">
				<Button onClick={handlePauseTransactions}>
					{isPaused ? "Resume" : "Pause"}
				</Button>
				<div className="flex gap-4">
					{data.length ? (
						<>
							<CurrencyFilter
								onChange={handleChangeCurrencyFilter}
								value={currencyFilterValue}
								options={currencyFilterOptions}
							/>
							<AmountFilter
								defaultValue={amountFilterOptions}
								value={amountFilterValue}
								onChange={([min, max]) => {
									setSearchParams({
										...searchParams,
										minAmount: String(min || 0),
										maxAmount: String(max || 0),
									});
								}}
							/>
							<Button onClick={handleResetFilters}>Clear Filters</Button>
						</>
					) : null}
				</div>
			</div>
			<div className="border rounded-md">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end py-4 space-x-2">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TransactionTable;
