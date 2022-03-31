import { useIntervalFn } from "./useIntervalFn";
import { useWebSocket } from "./useWebSocket";

export default function (Vue) {
	Vue.provide("useIntervalFn", useIntervalFn);
	Vue.provide("useWebSocket", useWebSocket);
}
