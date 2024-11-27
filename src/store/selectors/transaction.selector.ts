import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectTransactions = (state: RootState) =>
	state.transactionSlice.transactions;

const selectAccountId = (_state: RootState, accountId: string) => accountId;

export const selectAccountTransactions = createSelector(
	[selectTransactions, selectAccountId],
	(transactions, accountId) => transactions[accountId] || []
);
export const selectIsPaused = (state: RootState) =>
	state.transactionSlice.isPaused;

export const selectTransactionCurrencyFilterValues = createSelector(
	(state: RootState) => state.transactionSlice.filters.currency,
	(currencyFilter) => Object.keys(currencyFilter)
);

export const selectTransactionAmountFilterValues = (state: RootState) =>
	state.transactionSlice.filters.amount;
