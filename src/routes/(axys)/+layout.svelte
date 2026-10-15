<script lang="ts">
	import '$lib/axys/styles/styles.scss';
	import { onMount } from 'svelte';
	import Header from '$lib/axys/header.svelte';
	import { bgDust } from '$lib/attachments/bg-dust';
	import MouseCursor from '$lib/components/mouse-cursor.svelte';
	import ScrollProgress from '$lib/components/scroll-progress.svelte';
	import SmoothScroll from '$lib/components/smooth-scroll.svelte';

	let { children } = $props();

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
<div data-sveltekit-reload style="display: contents">
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
			icon: { size: 44, opacity: 1, border: '2px solid #fff' },
			keyword: { size: 160, border: '2px solid transparent' }
		}}
	/>
	{@render children()}
</div>
