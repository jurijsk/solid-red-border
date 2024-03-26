
import { config } from "./config";

type BoundingBox = {
	top: number;
	x?: number;
	left: number;
	y?:	number;
	width: number;
	height: number;
};

let markers = new Map<string, Marker>();

/**  Returns named or generic marker. 
Marker gives access to highlight, smudge (dehighlight) and erase methods.
Marker does not have set color or style. Style of color is pased to hightlight() method.
Marker keeps track of highlights so that when you have to erase highlights, you can do that */ 
export function getMarker(name: string = 'generic', canvasElement?: HTMLElement) {
	let marker = markers.get(name);
	if (marker) {
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
	if (!htmlStyle) {
		htmlStyle = document.createElement('style');
		document.head.appendChild(htmlStyle);
	}

	htmlStyle.sheet?.insertRule(`.${name} { ${style} }`);
}

class Marker {
	canvasElement: HTMLElement = document.body;
	constructor(public name: string, canvasElement?: HTMLElement) {
		this.canvasElement = canvasElement || document.body;
	}

	where(canvasElement: HTMLElement) {
		this.canvasElement = canvasElement || document.body;
		return this;
	}

	hightlightElements = new Array<HTMLElement>();

	highlight(what: BoundingBox | HTMLElement, styleName: string, id?: string) {
		let element: HTMLElement | null = null;
		if (what instanceof HTMLElement) {
			element = what;
		} else {
			element = this.smudge(id || '');
			if(!element){
				element = document.createElement('span');	

				this.hightlightElements.push(element);
				this.canvasElement.appendChild(element);
				element.id = id || makeid(8);
			}

			element.style.position = 'absolute';
			element.style.top = (what.top || what.x) + 'px';
			element.style.left = (what.left || what.y) + 'px';
			element.style.width = what.width + 'px';
			element.style.height = what.height + 'px';
		}

		if(styles.indexOf(styleName) === -1){
			setStyle(styleName, config.markers.defaultStyleTemplate.replaceAll('{color}', styleName));
		}

		element.classList.add(styleName);
		return element;
	}

	
	smudge(id: string){
		if(!id){
			return null;
		}
		const element = document.getElementById(id);
		if(!element){
			return null;
		}


		for (let rule of styles) {
			element.classList.remove(rule);
		}
		return element;
	}

	/** Removes all, or single higlights if id provide. Either removes the highlighting class or the the element itself if highliht was set using  for bounding boxes */
	erase(id?: string) {
		if(id){
			const element = document.getElementById(id);
			element?.remove();
			return;
		}
		this.hightlightElements.forEach(element => {
			element.remove();
		});
		this.hightlightElements.length = 0;
	}

	hide(){
		throw new Error('Not implemented');
	}

}

function makeid(length: number) {
	var result = '';
	var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
