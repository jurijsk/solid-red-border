import { getMarker, setStyle } from "./sources/markers";
import { reconfig } from "./sources/config";

debugger;

reconfig({'debug': true, markers: { defaultStyleTemplate: 'background-color: {color}; opacity: 0.5;' } });



let marker = getMarker('one');

setStyle('red', 'border: 1px solid red');
setStyle('green', 'border: 1px solid green');
setStyle('blue', 'border: 1px solid blue');

marker.highlight({ top: 0, left: 0, width: 100, height: 100 }, 'red');
marker.highlight({ top: 25, left: 25, width: 100, height: 100 }, 'green', 'current');
marker.highlight({ top: 50, left: 50, width: 100, height: 100 }, 'blue', 'next');
marker.highlight({ top: 75, left: 75, width: 100, height: 100 }, 'red', 'current');
marker.highlight({ top: 75, left: 75, width: 100, height: 100 }, 'aqua', 'current');
marker.highlight({ top: 100, left: 100, width: 100, height: 100 }, 'green', 'next');

marker.smudge('current');

marker.erase('next');

marker.erase();