import { debug } from "./config";

export function dbg(func: () => void) {
	debug && func();
}



export function halt(func: () => void) {
	if(debug){
		debugger;
		func();
	}
}