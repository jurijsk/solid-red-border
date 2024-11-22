
import { debug, subscribe, Config, LogLevel } from "./config";

const og = window.console;
const noop = () => {};
const shadow = {
	log: debug ? og.log : noop,
	info: debug ? og.info : noop,
	warn: debug ? og.warn : noop,
	error: debug ? og.error : noop
};

function reconfig(config: Config) {
	//logger severity levels from lowest to highest: log, info, warn, error
	shadow.log = config.debug && config.logger >= LogLevel.log ? og.log : noop;
	shadow.info = config.debug && config.logger >= LogLevel.info ? og.info : noop;
	shadow.warn = config.debug && config.logger >= LogLevel.warn ? og.warn : noop;
	shadow.error = config.debug && config.logger >= LogLevel.error ? og.error : noop;
}

subscribe(reconfig);


export const console = shadow;
