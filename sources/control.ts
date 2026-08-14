import { debug } from "./config";

export function dbg<T>(func: () => T) {
	if(debug) {
		return func();
	}
	return undefined;
}

export function dbg_dummy<T>(_func: () => T) {
	return undefined;
}

export function halt(func: () => void) {
	if(debug) {
		// oxlint-disable-next-line no-debugger
		debugger;
		func();
	}
}

export function assume(assumption: () => any, message?: string) {
	let result = assumption();

	if(result === true) {
		return;
	}
	console.warn('false assumption', message, result);
	if(debug) {
		// oxlint-disable-next-line no-debugger
		debugger;
	}
}