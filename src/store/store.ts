import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { accountsApi } from "./apis/accounts.api";
import transactionSlice from "./slices/transaction.slice";
import { enableMapSet } from "immer";
enableMapSet();

export const store = configureStore({
	reducer: {
		[accountsApi.reducerPath]: accountsApi.reducer,
		transactionSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(accountsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
