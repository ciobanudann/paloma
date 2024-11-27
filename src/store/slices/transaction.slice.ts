import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/types/transaction.type";

interface TransactionState {
	transactions: Record<string, Transaction[]>;
	filters: {
		currency: Record<string, boolean>;
		amount: {
			min: number;
			max: number;
		};
	};
	isPaused: boolean;
}

const initialState = {
	transactions: {},
	isPaused: false,
	filters: {
		currency: {},
		amount: {
			min: Infinity,
			max: -Infinity,
		},
	},
} satisfies TransactionState as TransactionState;

const transactionSlice = createSlice({
	name: "transactionSlice",
	initialState,
	reducers: {
		togglePauseTransactions: (state) => {
			state.isPaused = !state.isPaused;
		},
		addTransaction: (
			state,
			action: PayloadAction<{
				accountId: string;
				transaction: Transaction;
			}>
		) => {
			const { accountId, transaction } = action.payload;

			if (state.transactions[accountId]) {
				state.transactions[accountId].unshift(transaction);
			} else {
				state.transactions[accountId] = [transaction];
			}

			// Need for unique values, since Set is not serializable, that's the easiest way
			if (!state.filters.currency[transaction.currency]) {
				state.filters.currency[transaction.currency] = true;
			}

			if (transaction.amount < state.filters.amount.min) {
				state.filters.amount.min = transaction.amount;
			}

			if (transaction.amount > state.filters.amount.max) {
				state.filters.amount.max = transaction.amount;
			}
		},
	},
});

export const { addTransaction, togglePauseTransactions } =
	transactionSlice.actions;
export default transactionSlice.reducer;
