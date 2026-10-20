<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		/** An IANA time zone, e.g. `America/Denver`. */
		timeZone?: string;
		/** Text before the time. Empty for none. */
		label?: string;
		class?: string;
	};

	let { timeZone = 'America/Denver', label = 'Utah', class: className }: Props = $props();

	let now = $state<Date>();

	const time = $derived(
		now
			? new Intl.DateTimeFormat('en-US', {
					hour: 'numeric',
					minute: '2-digit',
					timeZoneName: 'short',
					timeZone
				}).format(now)
			: ''
	);

	onMount(() => {
		let timer: ReturnType<typeof setTimeout>;
		const tick = () => {
			now = new Date();
			timer = setTimeout(tick, 60000 - (Date.now() % 60000));
		};
		tick();
		return () => clearTimeout(timer);
	});
</script>

<p class="local-time {className ?? ''}" class:ready={!!now}>
	{#if label}<span class="label">{label}</span>{/if}
	<time datetime={now?.toISOString()}>{time}</time>
</p>

<style lang="scss">
	@use 'base/mixins';

	.local-time {
		display: flex;
		gap: 1ch;
		margin: 0;
		font-size: 14px;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		white-space: nowrap;
		opacity: 0;

		@include mixins.mq-motion-allow {
			transition: opacity 0.6s var(--ease);
		}

		&.ready {
			opacity: 1;
		}
	}

	.label {
		color: var(--color-text-muted);
	}
</style>
