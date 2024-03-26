import { debug } from "./config";

export function dbg(func: () => void) {
	debug && func();
}



export function halt(func: () => boolean) {
	if(debug){
		debugger;
		func();
	}
}