import type { Attachment } from 'svelte/attachments';
import './animate.scss';

export type AnimateOptions = {
	variant?: 'fade' | 'up' | 'down' | 'left' | 'right' | 'scale';
	/** Animate in once (default) or replay every time the element re-enters the viewport. */
	once?: boolean;
	/** Seconds to wait before animating in. */
	delay?: number;
	/** Seconds the transition lasts. */
	duration?: number;
	/** Pixels the element travels from, for the `up`, `down`, `left` and `right` variants. Defaults to `24`. */
	distance?: number;
	/** A CSS timing function, e.g. `cubic-bezier(0.22, 1.25, 0.36, 1)`. Defaults to the site's ease. */
	ease?: string;
	/** Seconds between each child. When set, the element's children animate in sequence. */
	stagger?: number;
	/** CSS selector of another element that triggers the animation. */
	trigger?: string;
	/** Percent of the viewport height the element must clear from the bottom edge. */
	offset?: number;
};

export function animate({
	variant = 'up',
	once = true,
	delay = 0,
	duration,
	distance,
	ease,
	stagger,
	trigger,
	offset = 2
}: AnimateOptions = {}): Attachment<HTMLElement> {
	return (el) => {
		const targets = stagger ? Array.from(el.children) : [el];
		const watched = (trigger && document.querySelector(trigger)) || el;

		targets.forEach((target, index) => {
			target.classList.add('animate', `animate--${variant}`);
			(target as HTMLElement).style.setProperty(
				'--animate-delay',
				`${delay + index * (stagger ?? 0)}s`
			);
			if (duration) (target as HTMLElement).style.setProperty('--animate-duration', `${duration}s`);
			if (distance)
				(target as HTMLElement).style.setProperty('--animate-distance', `${distance}px`);
			if (ease) (target as HTMLElement).style.setProperty('--animate-ease', ease);
		});

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					targets.forEach((target) => target.classList.add('animated'));
					if (once) observer.disconnect();
				} else if (!once) {
					targets.forEach((target) => target.classList.remove('animated'));
				}
			},
			{ rootMargin: `0px 0px -${offset}% 0px` }
		);
		observer.observe(watched);

		return () => {
			observer.disconnect();
			targets.forEach((target) => {
				target.classList.remove('animate', `animate--${variant}`, 'animated');
				(target as HTMLElement).style.removeProperty('--animate-delay');
				(target as HTMLElement).style.removeProperty('--animate-duration');
				(target as HTMLElement).style.removeProperty('--animate-distance');
				(target as HTMLElement).style.removeProperty('--animate-ease');
			});
		};
	};
}
