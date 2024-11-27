import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "@/types/transaction.type";

interface TransactionState {
	transactions: Record<string, Transaction[]>;
	lastTransactionId: string | null;
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
	lastTransactionId: null,
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
		togglePauseTransactions: (
			state,
			{ payload }: PayloadAction<{ accountId: string }>
		) => {
			state.isPaused = !state.isPaused;
			state.lastTransactionId =
				state.transactions[payload.accountId]?.[0].transactionId;
		},
		resetPauseTransactions: (state) => {
			state.lastTransactionId = null;
			state.isPaused = false;
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

export const {
	addTransaction,
	togglePauseTransactions,
	resetPauseTransactions,
} = transactionSlice.actions;
export default transactionSlice.reducer;
