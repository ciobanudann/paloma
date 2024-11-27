export type Transaction = {
	transactionId: string;
	direction: "inflow" | "outflow";
	amount: number;
	currency: "USD" | "CAD" | "EUR" | "GBP" | "AUD" | "JPY";
	destinationId: string;
	destinationName: string;
	sourceId: string;
	sourceName: string;
};
