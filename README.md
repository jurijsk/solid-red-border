# What is that

This a a set of debugging tool I use to code that affects HTML. Things like:
 * Marker
 * Logger
 * Execution control

 The this is configuralble.

### Marker
 An easy way to highlight an element on the page (hence the name of lib). This is especially usefull if you have to fighlight something if there is no undelying HTML element, for example when you are dwarig on the canvas.

 ```
import { getMarker } from  "solid-red-border";


const marker = getMarker('name', parentHTMLElement?); 
marker.highlight(what, 'how', 'id?')


 ```
 
Logger 
`logger` that replaces `console`

## Acknowledgment

Based on [vite-vanilla-ts-lib-starter](https://github.com/kbysiec/vite-vanilla-ts-lib-starter)
