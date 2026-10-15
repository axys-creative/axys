// @ts-nocheck
import { onWindowLoad } from '../utility.js';
gsap.registerPlugin(ScrollTrigger);

// Global - Easily toggle an 'animate' class on any element with 'gsap-animate' class
const globalGenerateAnimate = (() => {
	const targetElements = document.querySelectorAll('.gsap-animate');

	targetElements.forEach((targetElem) => {
		gsap.to(targetElem, {
			scrollTrigger: {
				trigger: targetElem,
				start: 'top 98%',
				end: 'bottom top',
				onEnter: () => targetElem.classList.add('in-view'),
				onLeave: () => targetElem.classList.remove('in-view'),
				onEnterBack: () => targetElem.classList.add('in-view'),
				onLeaveBack: () => targetElem.classList.remove('in-view')
			}
		});
	});

	onWindowLoad(() => {
		ScrollTrigger.refresh();
	});

	if (window.innerWidth > 520) {
		window.addEventListener('resize', () => {
			ScrollTrigger.refresh();
		});
	}
})();

// Global - Animate when scrolling away from the top of the page (also restore when scrolling up)
const scrollFromTop = (() => {
	let siteHeader = document.querySelector('.site-header');
	let lastScrollY = 0;

	window.addEventListener('scroll', () => {
		const currentScrollY = window.scrollY;

		if (currentScrollY > 120) {
			if (currentScrollY > lastScrollY) {
				// Scrolling down
				siteHeader?.classList.add('away-from-top');
			} else {
				// Scrolling up
				siteHeader?.classList.remove('away-from-top');
			}
		} else {
			siteHeader?.classList.remove('away-from-top'); // Restore on scroll up
		}

		lastScrollY = currentScrollY;
	});
})();

// Utility

// Greater than 520 so it doesn't refresh on  mobile(dvh)
if (window.innerWidth > 520) {
	window.addEventListener('resize', () => {
		ScrollTrigger.refresh();
	});
}
