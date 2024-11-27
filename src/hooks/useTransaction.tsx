import {
	selectIsPaused,
	selectLastTransactionId,
} from "@/store/selectors/transaction.selector";
import { addTransaction } from "@/store/slices/transaction.slice";
import { RootState } from "@/store/store";
import { Transaction } from "@/types/transaction.type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useWebSocket, { ReadyState } from "react-use-websocket";

const buildTransactionUrl = (accountId: string, since: string | null) => {
	let url = `wss://${
		import.meta.env.VITE_API_URL
	}/accounts/${accountId}/transactions`;

	if (since) {
		url += `?since=${since}`;
	}
	return url;
};

const useTransaction = () => {
	const isPaused = useSelector(selectIsPaused);
	const navigate = useNavigate();
	const { accountId } = useParams<{ accountId: string }>();
	const lastTransactionId = useSelector((state: RootState) =>
		selectLastTransactionId(state)
	);

	const dispatch = useDispatch();
	const socketUrl = buildTransactionUrl(accountId || "", lastTransactionId);

	const { lastMessage, lastJsonMessage, readyState } =
		useWebSocket<Transaction>(
			socketUrl,
			{
				shouldReconnect: () => !isPaused,
				reconnectAttempts: 10,
				reconnectInterval: 3000,
				onError() {
					toast.error("Server issues, please select another agent");
					navigate("/");
				},
			},
			!isPaused
		);

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
