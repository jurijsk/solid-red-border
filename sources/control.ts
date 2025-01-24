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
		debugger;
		func();
	}
}

export function assume(func: () => any) {
	let result = func();

	if(result === true) {
		return;
	}
	console.warn('false assumption', result);
	if(debug) {
		debugger;
	}
}