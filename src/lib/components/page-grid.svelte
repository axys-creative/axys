<script module lang="ts">
	import type { TilesOptions } from '$lib/utils/page-transition';

	export type PageGridProps = TilesOptions;
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { loading } from '$lib/utils/loading.svelte';
	import { coverPage, prefersReducedMotion, uncoverPage } from '$lib/utils/page-transition';
	import { onMount } from 'svelte';

	let {
		tileSize = 64,
		sequence = 'wave',
		duration = 250,
		spread = 950,
		color = 'var(--color-surface)'
	}: PageGridProps = $props();

	const arriving = browser && document.documentElement.hasAttribute('data-covered');
	if (arriving) loading.done = false;

	onMount(() => {
		const options = { tileSize, sequence, duration, spread, color };
		let leaving = false;
		let removeCover: (() => void) | undefined;

		if (arriving) uncoverPage(options, () => (loading.done = true));

		const onClick = (event: MouseEvent) => {
			if (event.defaultPrevented || event.button !== 0 || leaving) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
			if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

			const url = new URL(link.href, location.href);
			if (url.origin !== location.origin) return;
			if (url.pathname === location.pathname && url.search === location.search) return;
			if (prefersReducedMotion()) return;

			event.preventDefault();
			leaving = true;
			coverPage({ ...options, spread: spread / 2 }).then((remove) => {
				removeCover = remove;
				try {
					sessionStorage.setItem('page-cover', '1');
				} catch {
					// Without storage the next page just loads normally.
				}
				location.href = url.href;
			});
		};

		// A page restored by the back button keeps the cover it left with.
		const onShow = (event: PageTransitionEvent) => {
			if (!event.persisted) return;
			removeCover?.();
			leaving = false;
		};

		document.addEventListener('click', onClick);
		addEventListener('pageshow', onShow);
		return () => {
			document.removeEventListener('click', onClick);
			removeEventListener('pageshow', onShow);
		};
	});
</script>
