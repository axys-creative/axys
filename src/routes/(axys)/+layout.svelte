<script lang="ts">
	import '$lib/axys/styles/styles.scss';
	import { onMount } from 'svelte';
	import Header from '$lib/axys/header.svelte';
	import type { Attachment } from 'svelte/attachments';
	import { animate } from '$lib/attachments/animate';
	import { textScale } from '$lib/attachments/text-scale';
	import { headingLine } from '$lib/attachments/heading-line';
	import { bgDust } from '$lib/attachments/bg-dust';
	import LoaderGrid from '$lib/components/loader-grid.svelte';
	import PageGrid from '$lib/components/page-grid.svelte';
	import MouseCursor from '$lib/components/mouse-cursor.svelte';
	import ScrollProgress from '$lib/components/scroll-progress.svelte';
	import SmoothScroll from '$lib/components/smooth-scroll.svelte';
	import { loading } from '$lib/utils/loading.svelte';

	let { children } = $props();

	const descriptionScale = textScale({
		type: 'words',
		style: 'random',
		scrub: true,
		start: 'top 96%',
		end: 'bottom 75%'
	});

	const questionIn = animate({ variant: 'right', once: false });

	const headings: Attachment<HTMLElement> = (root) => {
		const stops = [
			...[...root.querySelectorAll<HTMLElement>('h2')]
				.filter((heading) => !heading.closest('.toast'))
				.map((heading) => headingLine()(heading)),
			...[
				...root.querySelectorAll<HTMLElement>(
					'.headline-description, .description, .tokens-header__description'
				)
			].map((description) => descriptionScale(description)),
			...[...root.querySelectorAll<HTMLElement>('#faq .item')].map((item) => questionIn(item))
		];
		return () => stops.forEach((stop) => typeof stop === 'function' && stop());
	};

	$effect(() => {
		if (loading.done) document.querySelector('#hero-section')?.classList.add('load-complete');
	});

	// The site's scripts expect `gsap` and `ScrollTrigger` as globals, as when they came from a CDN.
	onMount(async () => {
		const [{ gsap }, { ScrollTrigger }] = await Promise.all([
			import('gsap'),
			import('gsap/ScrollTrigger')
		]);
		Object.assign(window, { gsap, ScrollTrigger });
		await import('$lib/axys/scripts/index.js');
	});
</script>

<!-- Its scripts bind to the page's markup once, so every link is a full page load. -->
<div data-sveltekit-reload style="display: contents" {@attach headings}>
	<PageGrid />
	<LoaderGrid />
	<Header />
	<div
		class="axys-bg"
		aria-hidden="true"
		{@attach bgDust({
			fixed: true,
			theme: 'dark',
			colors: { dark: { base: '#101010', highlight: '#c27757' } },
			lobes: { drift: 0.6 },
			crease: { angle: 20, offset: -0.5 },
			vignette: { strength: 0.62 }
		})}
	></div>
	<SmoothScroll />
	<ScrollProgress placement="right" />
	<MouseCursor
		elastic
		variants={{
			menu: { size: 72 },
			bar: {
				opacity: 1,
				background: 'var(--color-accent)',
				border: '0',
				radius: '1px',
				elastic: false
			},
			icon: { size: 44, opacity: 1, border: '2px solid #fff' },
			keyword: { size: 160, border: '2px solid transparent' }
		}}
	/>
	{@render children()}
</div>
