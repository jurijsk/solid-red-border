
export let debug = true;


const defaultConfig =  {
	debug: debug,
	markers: { defaultStyleTemplate: 'border: 1x solid {color};' }
};

export const config = Object.assign({}, defaultConfig);

export function reconfig(options: {debug: boolean, markers?: { defaultStyleTemplate?: string }}) {
	Object.assign(config, defaultConfig, options);
	
	debug = config.debug;
}