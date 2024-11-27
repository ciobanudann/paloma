export type Account = {
	accountId: string;
	accountName: string;
	currency: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "JPY";
	country: string;
	address: string;
	phoneNumber: string;
	email: string;
};

export type AccountOkResponse =
	| {
			data: Account[];
			error: null;
	  }
	| {
			data: null;
			error: string;
	  };

export type AccountErrorResponse = {
	data: null;
	error: "Something went wrong";
};
