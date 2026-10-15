// @ts-nocheck
import { mqMouse, mqReduceMotion } from '../utility.js';

if (mqMouse && !mqReduceMotion) {
	// Magnets inside the template's own components (the menu button) run the `magnet` attachment instead.
	const magnets = () => document.querySelectorAll('.magnet:not(.site-nav-button .magnet)');

	const magnetEffect = () => {
		magnets().forEach((el) =>
			el.addEventListener('mousemove', function (e) {
				const pos = this.getBoundingClientRect();
				const mx = e.clientX - pos.left - pos.width / 2;
				const my = e.clientY - pos.top - pos.height / 2;

				this.style.transform = `translate(${mx * 0.48}px, ${my * 0.48}px)`;

				if (this.classList.contains('magnet-weak')) {
					this.style.transform = `translate(${mx * 0.12}px, ${my * 0.12}px)`;
				}

				if (this.classList.contains('magnet-strong')) {
					this.style.transform = `translate(${mx * 0.96}px, ${my * 0.96}px)`;
				}

				if (this.classList.contains('magnet-wide-btn')) {
					this.style.transform = `translate(${mx * 0.48}px, ${my * 0.96}px)`;
				}
			})
		);

		magnets().forEach((el) =>
			el.addEventListener('mouseleave', function () {
				this.style.transform = 'translate(0, 0)';
			})
		);
	};

	magnetEffect();
}
