
export enum LogLevel {
	log = 1,
	info = 2,
	warn = 3,
	error = 5
}

export let debug = true;


const defaultConfig = {
	debug: true,
	markers: { defaultStyleTemplate: 'border: 1px solid {color};' },
	logger: LogLevel.log
};


export type Config = typeof defaultConfig;
export type PartalConfig = Partial<typeof defaultConfig>;

export const config = Object.assign({}, defaultConfig);

const callbacks = new Array<((config: Config) => void)>;
export function subscribe(callback: (config: Config) => void) {
	callbacks.push(callback);
}

export function reconfig(options: PartalConfig) {
	Object.assign(config, defaultConfig, options);
	debug = config.debug;
	callbacks.forEach(callback => callback(config));
}
