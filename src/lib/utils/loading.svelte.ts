export const loading = $state({ done: true });

export function trackLoad(update: (progress: number) => void): () => void {
	const pictures = [...document.images].filter((img) => {
		if (img.loading === 'lazy') return false;
		const { top, width, height } = img.getBoundingClientRect();
		return top < innerHeight && (width > 0 || height > 0);
	});
	const total = pictures.length + 1;
	const cleanups: (() => void)[] = [];
	let done = 0;
	let stopped = false;

	const step = () => {
		if (stopped) return;
		update(++done / total);
	};

	for (const img of pictures) {
		if (img.complete) {
			done++;
			continue;
		}
		img.addEventListener('load', step, { once: true });
		img.addEventListener('error', step, { once: true });
		cleanups.push(() => {
			img.removeEventListener('load', step);
			img.removeEventListener('error', step);
		});
	}

	document.fonts.ready.then(step);
	update(done / total);

	return () => {
		stopped = true;
		cleanups.forEach((cleanup) => cleanup());
	};
}
