import { onWindowLoad } from '../utility.js';

// The hero's entrance plays once the page has loaded.
onWindowLoad(() => document.querySelector('#hero-section')?.classList.add('load-complete'));
