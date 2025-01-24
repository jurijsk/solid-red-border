import { getMarker, setStyle } from "./sources/markers";
import { reconfig } from "./sources/config";

//debugger;

reconfig({ 'debug': true, markers: { defaultStyleTemplate: 'background-color: {color}; opacity: 0.5;' } });



let marker = getMarker('one');

marker.setCanvas(document.getElementById('app'));

setStyle('red', 'border: 1px solid red');
setStyle('green', 'border: 1px solid green');
setStyle('blue', 'border: 1px solid blue');

marker.highlight({ top: 0, left: 0, width: 100, height: 100 }, 'red');
marker.highlight({ top: 25, left: 25, width: 100, height: 100 }, 'green', 'current');
marker.highlight({ top: 50, left: 50, width: 100, height: 100 }, 'blue', 'next');
marker.highlight({ top: 75, left: 75, width: 100, height: 100 }, 'red', 'current');
marker.highlight({ top: 75, left: 75, width: 100, height: 100 }, 'aqua', 'current');
marker.highlight({ top: 100, left: 100, width: 100, height: 100 }, 'green', 'next');

marker.delighlight('current');

marker.removeByClass('next');

marker.removeAll();



function experiment() {

	const iamgeElements = document.querySelectorAll('img');


	for(let i = 0;i < iamgeElements.length;i++) {
		const img = iamgeElements[i];
		const request = new Request(img.currentSrc || img.src);

		fetch(request)
			.then((response) => response.blob())
			.then((data) => {
				const reader = new FileReader();


				reader.addEventListener('load', () => {
					let dataUrl = <string> reader.result;
					//dataUrl = dataUrl.replace('data:text/html', 'data:image/webp');

					console.log(img);
					const newImg = document.createElement('img');
					newImg.src = dataUrl;
					document.body.appendChild(newImg);

					img.src = dataUrl;
					//'data:text/html;base64,PCFET0NUWVBFIGh0bWw+DQo8aHRtbCBsYW5nPSJlbiI+DQogIDxoZWFkPgogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiIHNyYz0iL0B2aXRlL2NsaWVudCI+PC9zY3JpcHQ+Cg0KICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04IiAvPg0KICAgIDxsaW5rIHJlbD0iaWNvbiIgdHlwZT0iaW1hZ2Uvc3ZnK3htbCIgaHJlZj0iZmF2aWNvbi5zdmciIC8+DQogICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIC8+DQogICAgPHRpdGxlPlZpdGUgQXBwPC90aXRsZT4NCiAgPC9oZWFkPg0KICA8Ym9keT4NCiAgICA8ZGl2IGlkPSJhcHAiIHN0eWxlPSJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMzAwcHg7IGxlZnQ6IDMwMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxOyI+PC9kaXY+DQoNCg0KDQogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiIHNyYz0iL2RlbW8udHM/dD0xNzExNjI4NjU5Mzc1Ij48L3NjcmlwdD4NCgk8aW1nIGFsdD0iQSBkZWNheWluZyBidWlsZGluZyBpcyBjb3ZlcmVkIGluIHZpbmVzLiIgZGVjb2Rpbmc9ImFzeW5jIiBzcmM9Imh0dHBzOi8vc3RhdGljMDEubnl0aW1lcy5jb20vbmV3c2dyYXBoaWNzLzIwMjQtMDItMjYtcGFyYy1zcmkvX2ltYWdlcy9wYXJjLWJ1aWxkaW5nLXBsYWNlaG9sZGVyLUBALTMwMC53ZWJwIj4NCjwvYm9keT4NCjwvaHRtbD4NCg==';
					//console.log('Image loaded', dataUrl);
				}, false);

				reader.readAsDataURL(data);
			});
	}
}
experiment();