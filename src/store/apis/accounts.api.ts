import { Account, AccountOkResponse } from "@/types/account.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const accountsApi = createApi({
	reducerPath: "accountsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `https://${import.meta.env.VITE_API_URL}/accounts`,
	}),

	endpoints: (builder) => ({
		getAccounts: builder.query<Record<string, Account>, void>({
			query: () => ({
				url: "",
			}),
			transformResponse: (response: AccountOkResponse) => {
				const accounts = response.data || [];

				return accounts.reduce((acc: Record<string, Account>, account) => {
					acc[account.accountId] = account;

					return acc;
				}, {});
			},

			transformErrorResponse() {
				toast.error("Failed to fetch accounts");

				return [];
			},
		}),
	}),
});

export const { useGetAccountsQuery } = accountsApi;
