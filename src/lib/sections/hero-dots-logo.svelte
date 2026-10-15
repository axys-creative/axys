<script module lang="ts">
	import type { ComponentProps } from 'svelte';
	import type CtaGroup from '$lib/components/cta-group.svelte';

	export type HeroDotsLogoProps = {
		/** Small lines above the title, one per line. */
		eyebrowLines?: string[];
		/** The word that cycles at the start of the title. */
		words: string[];
		/** Colors the cycling word fades through, one per word. Any CSS color, including variables. */
		wordColors?: string[];
		/** The title's second line. */
		line?: string;
		/** The title's third line, shifted back to the left. */
		lineEnd?: string;
		cta?: ComponentProps<typeof CtaGroup>;
		fullScreen?: boolean;
		/** The section's anchor, so a link or the CMS preview can point to `#id`. */
		id?: string;
		class?: string;
	};
</script>

<script lang="ts">
	import CtaGroupComponent from '$lib/components/cta-group.svelte';
	import { dotsFill } from '$lib/attachments/dots-fill';
	import { glitchCycle } from '$lib/attachments/glitch-cycle';
	import { push } from '$lib/attachments/push';
	import { textReveal } from '$lib/attachments/text-reveal';
	import { tilt } from '$lib/attachments/tilt';

	// The icon from the favicon, cropped to its edges.
	const LOGO = [
		'M86.8713 85.2757C87.5837 84.2113 88.3231 83.1636 89.0042 82.0797C94.3014 73.6495 101.902 68.9439 111.892 68.0709C116.611 67.6585 121.34 67.844 126.059 67.936C128.788 67.9892 130.508 67.0583 131.839 64.6796C135.533 58.0773 139.411 51.5768 143.204 45.0289C144.833 42.2172 144.244 41.2678 140.88 41.2653C132.042 41.2586 123.203 41.1951 114.366 41.2805C103.533 41.3852 95.2931 46.1021 89.8097 55.396C85.2512 63.1223 80.8024 70.9124 76.2786 78.659C74.3914 81.891 71.9342 81.9015 70.0576 78.6909C63.3446 67.2056 56.6245 55.7242 49.978 44.201C48.764 42.0961 47.1455 41.2341 44.7414 41.2535C37.0085 41.316 29.2748 41.2622 21.5413 41.2593C18.3138 41.2581 17.7594 42.2003 19.3854 44.9986C26.5598 57.3456 33.759 69.6786 40.9287 82.0282C50.8739 99.1585 74.2506 100.929 86.8713 85.2757Z',
		'M93.861 94.2831C93.1534 95.3639 92.4189 96.4277 91.7424 97.5282C86.4808 106.088 78.931 110.866 69.0082 111.753C64.3212 112.171 59.6232 111.983 54.9367 111.89C52.2252 111.836 50.5167 112.781 49.1947 115.196C45.5256 121.9 41.6734 128.5 37.9063 135.149C36.2886 138.004 36.8729 138.968 40.2144 138.971C48.9933 138.977 57.7728 139.042 66.5509 138.955C77.3113 138.849 85.4957 134.059 90.9423 124.623C95.4703 116.777 99.8892 108.867 104.383 101.002C106.257 97.7199 108.698 97.7092 110.562 100.969C117.23 112.631 123.905 124.289 130.507 135.99C131.713 138.127 133.32 139.002 135.708 138.983C143.389 138.919 151.071 138.974 158.753 138.977C161.958 138.978 162.509 138.021 160.894 135.18C153.768 122.643 146.617 110.12 139.495 97.5805C129.617 80.1868 106.397 78.3892 93.861 94.2831Z'
	];

	let {
		eyebrowLines = [],
		words,
		wordColors,
		line,
		lineEnd,
		cta,
		fullScreen = true,
		id,
		class: className
	}: HeroDotsLogoProps = $props();

	const hasCta = $derived(!!cta?.primary?.text);
</script>

<section {id} class="hero-dots-logo {className ?? ''}" class:full-screen={fullScreen}>
	<div class="content">
		{#if eyebrowLines.length}
			<small class="eyebrow">
				{#each eyebrowLines as text (text)}<span>{text}</span>{/each}
			</small>
		{/if}

		<h1 class="title">
			<span class="word">
				<span {@attach glitchCycle({ words, colors: wordColors, interval: 2000, mono: false })}>
					{words[0]}
				</span>
			</span>
			{#if line}
				<span class="line" {@attach textReveal({ type: 'words', once: true, duration: 1 })}
					>{line}</span
				>
			{/if}
			{#if lineEnd}
				<span
					class="line shift"
					{@attach textReveal({ type: 'words', once: true, duration: 1, stagger: 0.12 })}
					>{lineEnd}</span
				>
			{/if}
		</h1>

		{#if hasCta && cta}
			<div class="cta"><CtaGroupComponent {...cta} /></div>
		{/if}
	</div>

	<div class="background" aria-hidden="true">
		<div
			class="tilt"
			{@attach tilt({
				reverse: true,
				max: 12,
				perspective: 2400,
				speed: 1250,
				reset: false,
				mouseEventElement: '.hero-dots-logo'
			})}
		>
			<div class="push" {@attach push({ strength: 0.75, restore: 0.05, maxRotate: 5 })}>
				<svg
					class="logo"
					viewBox="17 40 146 100"
					xmlns="http://www.w3.org/2000/svg"
					{@attach dotsFill({
						size: 0.9,
						gap: 3.6,
						restore: 0.99,
						sensitivity: 0.9,
						distance: 90,
						strength: 9,
						color: 'var(--color-text)',
						illuminate: true,
						grow: 0.5
					})}
				>
					{#each LOGO as d (d)}<path {d} />{/each}
				</svg>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@use 'base/mixins';

	.hero-dots-logo {
		--shift: 72px;
		--logo-size: min(40vw, 650px);

		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 80lvh;
		padding: var(--body-padding-double) var(--body-padding);
		overflow: hidden;

		@include mixins.max-lg {
			--logo-size: min(72vw, 650px);
		}

		@include mixins.max-md {
			--shift: 0px;
		}
	}

	.full-screen {
		min-height: 100lvh;
	}

	.content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: var(--logo-size);
		min-width: fit-content;
		gap: var(--space-title-paragraph);
	}

	.eyebrow {
		display: flex;
		flex-direction: column;
		padding-inline-start: 4px;
		font-size: 0.875rem;
	}

	.title {
		display: flex;
		flex-direction: column;
		font-size: clamp(44px, 9vw, 74px);
		font-weight: 300;
		line-height: 1.2;
	}

	.line:not(.shift) {
		padding-inline-start: var(--shift);
	}

	.background {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		pointer-events: none;
	}

	.tilt {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
	}

	.push {
		width: var(--logo-size);
		height: var(--logo-size);
		opacity: 0.8;
		filter: blur(7px) brightness(1.5);

		@include mixins.max-lg {
			filter: blur(5px) brightness(1.5);
		}

		@include mixins.max-sm {
			filter: blur(3px) brightness(1.5);
		}
	}

	.logo {
		display: block;
		width: 100%;
		height: 100%;
		color: var(--color-text);
	}

	@include mixins.mq-motion-allow {
		.background {
			animation: logo-in 1.5s var(--ease) 0.36s both;
		}
	}

	@keyframes logo-in {
		from {
			opacity: 0;
		}
	}
</style>
