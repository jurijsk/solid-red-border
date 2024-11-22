import { debug } from "./config";

export function dbg<T>(func: () => T) {
	if(debug) {
		return func();
	}
	return undefined;
}

export function halt(func: () => void) {
	if(debug) {
		debugger;
		func();
	}
}