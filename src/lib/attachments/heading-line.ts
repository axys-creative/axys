import type { Attachment } from 'svelte/attachments';
import './heading-line.scss';

export type HeadingLineOptions = {
	/** Share of the heading that must be on screen before the line draws in, from `0` to `1`. */
	threshold?: number;
};

/** Draws a line under the element, fading out at both ends, that grows from the center when it scrolls into view. */
export function headingLine({ threshold = 0.5 }: HeadingLineOptions = {}): Attachment<HTMLElement> {
	return (el) => {
		el.classList.add('heading-line');

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			el.classList.add('heading-line--in');
			return () => el.classList.remove('heading-line', 'heading-line--in');
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				el.classList.add('heading-line--in');
				observer.disconnect();
			},
			{ threshold }
		);
		observer.observe(el);

		return () => {
			observer.disconnect();
			el.classList.remove('heading-line', 'heading-line--in');
		};
	};
}
