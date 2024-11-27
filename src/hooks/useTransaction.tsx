import { selectIsPaused } from "@/store/selectors/transaction.selector";
import { addTransaction } from "@/store/slices/transaction.slice";
import { Transaction } from "@/types/transaction.type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

const useTransaction = () => {
	const isPaused = useSelector(selectIsPaused);

	const { accountId } = useParams<{ accountId: string }>();
	const dispatch = useDispatch();
	const socketUrl = `wss://${
		import.meta.env.VITE_API_URL
	}/accounts/${accountId}/transactions`;

	const { lastMessage, lastJsonMessage, readyState } =
		useWebSocket<Transaction>(socketUrl, {
			shouldReconnect: () => !isPaused,
			reconnectAttempts: 10,
			reconnectInterval: 3000,
		});

	useEffect(() => {
		if (!accountId || isPaused) return;

		if (lastMessage !== null) {
			dispatch(addTransaction({ accountId, transaction: lastJsonMessage }));
		}
	}, [lastMessage, isPaused]);

	const status = {
		[ReadyState.CONNECTING]: "Connecting",
		[ReadyState.OPEN]: "Open",
		[ReadyState.CLOSING]: "Closing",
		[ReadyState.CLOSED]: "Closed",
		[ReadyState.UNINSTANTIATED]: "Uninstantiated",
	}[readyState];

	return { status };
};

export default useTransaction;
