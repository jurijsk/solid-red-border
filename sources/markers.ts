
import { config } from "./config";

type BoundingBox = {
	top?: number;
	x?: number;
	left?: number;
	y?: number;
	width?: number;
	height?: number;
};

let markers = new Map<string, Marker>();

/**  Returns named or generic marker. 
Marker gives access to highlight, dehighlight and erase methods.
Marker does not have set color or style. Style of color is pased to hightlight() method.
Marker keeps track of highlights so that when you have to erase highlights, you can do that */
export function getMarker(name: string = 'generic', canvasElement?: HTMLElement) {
	let marker = markers.get(name);
	if(marker) {
		canvasElement && marker.setCanvas(canvasElement);
		return marker;
	}

	marker = new Marker(name, canvasElement);
	markers.set(name, marker);
	return marker;
}

const styles = new Array<string>();
let htmlStyle: HTMLStyleElement | null = null;

export function setStyle(name: string, style: string) {
	styles.push(name);
	if(!htmlStyle) {
		htmlStyle = document.createElement('style');
		document.head.appendChild(htmlStyle);
	}

	htmlStyle.sheet?.insertRule(`.${name} { ${style} }`);
}

//let markersConfig = config.markers;
//function reconfig(config: Config) {
//	markersConfig = config.markers;
//}

//subscribe(reconfig);


const DEFAULT_STYLE_TEMPLATE_TOKEN = '<default>';
export class Marker {
	styleTemplate: string | null;

	constructor(public name: string, public canvasElement: HTMLElement = document.body) {
		this.styleTemplate = DEFAULT_STYLE_TEMPLATE_TOKEN;
	}

	setCssStyleTemplate(template: string | null | undefined) {
		this.styleTemplate = template || null;
	}

	setCanvas(element: HTMLElement | null) {
		this.canvasElement = element || document.body;
	}

	hightlightElements = new Array<HTMLElement>();


	highlightUnique(what: BoundingBox | HTMLElement, id: string) {
		this.highlight(what, id, id);
	}

	highlight(what: BoundingBox | HTMLElement, color?: string, id?: string) {
		let element: HTMLElement | null = null;
		if(what instanceof HTMLElement) {
			element = what;
		} else {
			element = this.delighlight(id || '');
			if(!element) {
				element = document.createElement('span');

				this.hightlightElements.push(element);
				element.id = id || makeid(8);
			}

			this.canvasElement.appendChild(element); //canvas might be different this time

			element.style.position = 'absolute';
			element.style.top = (what.top || what.x || 0) + 'px';
			element.style.left = (what.left || what.y || 0) + 'px';
			element.style.width = (what.width || 1) + 'px';
			element.style.height = (what.height || 1) + 'px';

			this.name && element.classList.add(this.name);
			this.name && element.setAttribute('rsb-marked', this.name);
		}

		if(color) {
			element.classList.add(color);
			if(styles.indexOf(color) === -1) {
				const template = this.styleTemplate === DEFAULT_STYLE_TEMPLATE_TOKEN
					? config.markers.defaultStyleTemplate
					: this.styleTemplate;

				if(template) {
					setStyle(color, template.replaceAll('{color}', color));
				}

			}
		}
		if(this.isEmpty) {
			element.classList.add('empty-marker');
		}
		return element;
	}

	delighlight(id: string) {
		if(!id) {
			return null;
		}
		const element = document.getElementById(id);
		if(!element) {
			return null;
		}

		for(let rule of styles) {
			element.classList.remove(rule);
		}
		return element;
	}

	/** Removes all, or single higlights if id provide. Either removes the highlighting class or the the element itself if highliht was set using  for bounding boxes */
	removeById(id: string) {
		const element = document.getElementById(id);
		element?.remove();
	}

	removeByClass(className: string) {
		const elements = document.getElementsByClassName(className);
		for(let i = elements.length - 1;i >= 0;i--) {
			elements[i].remove();
			const index = this.hightlightElements.indexOf(elements[i] as HTMLElement);
			if(index !== -1) {
				this.hightlightElements.splice(index, 1);
			}
		}
	}


	createClass(name: string, style: string) {
		let styleElement = <HTMLStyleElement> document.getElementById('marker-styles');
		if(!styleElement) {
			styleElement = document.createElement('style');
			styleElement.id = 'marker-styles';
			document.head.appendChild(styleElement);
			styleElement.innerHTML = '.empty-marker { background-color: #f00; }';
		}
		let sheet = styleElement.sheet;
		if(!sheet) {
			styleElement.innerHTML = `.${name} { ${style} }`;
		} else {
			sheet.insertRule(`.${name} { ${style} }`);
		}
	}

	removeAll() {
		this.hightlightElements.forEach(element => {
			element.remove();
		});
		this.hightlightElements.length = 0;
	}

	isEmpty = false;

	empty() {
		this.isEmpty = true;
	}
	refull() {
		this.isEmpty = false;
	}
}

function makeid(length: number) {
	var result = '';
	var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for(var i = 0;i < length;i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
