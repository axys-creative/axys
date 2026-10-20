<script module lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLAttributes, MouseEventHandler } from 'svelte/elements';

	export type ButtonProps = {
		text?: string;
		textDescription?: string;
		url?: string;
		newTab?: boolean;
		type?: 'solid' | 'outline' | 'underline' | 'text' | 'square';
		htmlType?: 'button' | 'submit' | 'reset';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		current?: boolean;
		expanded?: boolean;
		controls?: string;
		iconStart?: string;
		iconEnd?: string;
		/** Draws a ring around the end icon on hover. */
		iconCircle?: boolean;
		/** A CSS length. Slides the end icon this far to the right on hover. */
		iconShift?: string;
		/** An attachment for the end icon alone, e.g. `magnet()` to make only the icon follow the mouse. */
		iconEndAttach?: Attachment<HTMLElement>;
		class?: string;
		onclick?: MouseEventHandler<HTMLButtonElement>;
	} & Omit<HTMLAttributes<HTMLElement>, 'class' | 'children' | 'onclick'>;
</script>

<script lang="ts">
	import { cursorHide } from '$lib/attachments/cursor-hide';
	import { magnet } from '$lib/attachments/magnet';
	import { isCurrentPage, onCurrentPageClick } from '$lib/utils/current-page';
	import Icon from './icon.svelte';

	let {
		text,
		textDescription,
		url,
		newTab = false,
		type = 'solid',
		htmlType = 'button',
		size = 'md',
		disabled = false,
		current = false,
		expanded,
		controls,
		iconStart,
		iconEnd,
		iconCircle = false,
		iconShift,
		iconEndAttach,
		class: className,
		onclick,
		...rest
	}: ButtonProps = $props();

	const label = $derived(
		textDescription && newTab ? `${textDescription} (opens in a new tab)` : textDescription
	);
	const onCurrentPage = $derived(!newTab && isCurrentPage(url));
	const pullTile = magnet({ x: 0.5, y: 0.5, followDuration: 500, returnDuration: 350 });

	const classes = $derived(
		type === 'square'
			? 'button square-link'
			: `button ${type} ${size} ${text ? '' : 'icon-only'} ${className ?? ''}`
	);
</script>

{#snippet content()}
	{#if type === 'square'}
		<span class="tile" aria-hidden="true" {@attach pullTile}
			><Icon name={iconStart ?? 'arrow-right'} /></span
		>
		<span class="label">{text}</span>
	{:else}
		{#if iconStart}<Icon name={iconStart} />{/if}
		{#if text}<span class="label">{text}</span>{/if}
		{#if newTab && !textDescription}
			<span class="visually-hidden">(opens in a new tab)</span>
		{/if}
		{#if iconEnd}
			<span
				class="end"
				style={iconShift ? `--icon-shift: ${iconShift}` : undefined}
				{@attach iconEndAttach}
			>
				<Icon name={iconEnd} />
				{#if iconCircle}
					<svg class="circle" viewBox="0 0 48 48" fill="none" aria-hidden="true">
						<path
							pathLength="1"
							d="M24.014 1C36.7101 1.00759 47 11.3021 47 24C47 36.7025 36.7025 47 24 47C11.2975 47 1 36.7025 1 24C1 11.3021 11.2899 1.00759 23.986 1"
						/>
					</svg>
				{/if}
			</span>
		{/if}
	{/if}
{/snippet}

{#snippet control()}
	{#if url}
		<a
			{...rest}
			class={classes}
			href={url}
			aria-label={label}
			aria-current={current || onCurrentPage ? 'page' : undefined}
			onclick={onCurrentPage ? onCurrentPageClick : undefined}
			aria-expanded={expanded}
			aria-controls={controls}
			target={newTab ? '_blank' : undefined}
			rel={newTab ? 'noopener noreferrer' : undefined}
		>
			{@render content()}
		</a>
	{:else}
		<button
			{...rest}
			class={classes}
			type={htmlType}
			aria-label={label}
			aria-current={current ? 'true' : undefined}
			aria-expanded={expanded}
			aria-controls={controls}
			{disabled}
			{onclick}
		>
			{@render content()}
		</button>
	{/if}
{/snippet}

{#if type === 'square'}
	<span class="square-wrap {size} {className ?? ''}" {@attach cursorHide()}>
		<span class="plate" aria-hidden="true"></span>
		{@render control()}
	</span>
{:else}
	{@render control()}
{/if}

<style lang="scss">
	@use 'base/mixins';

	.button {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		gap: var(--btn-gap);
		padding: 0;
		border: 0;
		border-radius: var(--radius-btn);
		background: none;
		font-family: var(--font-body);
		font-size: var(--btn-font-size);
		font-weight: var(--btn-font-weight);
		line-height: 1.2;
		text-decoration: none;
		cursor: pointer;

		@include mixins.mq-motion-allow {
			transition:
				background var(--duration) var(--ease),
				color var(--duration) var(--ease),
				border-color var(--duration) var(--ease),
				scale var(--duration) var(--ease);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	.solid,
	.outline {
		padding: var(--btn-padding);
		border: 1px solid var(--color-accent);
	}

	.solid {
		background: var(--color-accent);
		color: var(--color-on-accent);

		@include mixins.desktop-hover {
			background: transparent;
			color: var(--color-accent-text);
		}
	}

	@mixin engaged {
		.plate {
			translate: 0 90%;
			rotate: 28deg;
			scale: 0.25 1;
			opacity: 0;
		}

		.tile {
			translate: 0 0;
			rotate: 0deg;
			opacity: 1;
			pointer-events: auto;
		}

		.square-link {
			color: var(--color-accent-text);
		}

		.label {
			translate: var(--sq-x) 0;
		}
	}

	.square-wrap {
		--sq-y: 8px;
		--sq-size: calc(var(--btn-font-size) * 1.2 + var(--sq-y) * 2);
		--sq-gap: 4px;
		--sq-x: 16px;
		--sq-left: calc(var(--sq-size) + var(--sq-gap) - var(--sq-x) * 2);
		--sq-shift: 12px;
		--sq-start: calc((var(--sq-left) + var(--sq-shift)) * -1);

		position: relative;
		display: inline-flex;
		flex-shrink: 0;

		&.sm {
			--sq-y: 6px;
			--sq-x: 12px;
			--sq-gap: 4px;
		}

		&.lg {
			--sq-y: 12px;
			--sq-x: 24px;
			--sq-gap: 6px;
		}

		&:has(:focus-visible)::after {
			content: '';
			position: absolute;
			inset: 0 0 0 var(--sq-start);
			border-radius: var(--radius-btn);
			outline: 2px solid var(--color-accent-text);
			outline-offset: 2px;
			pointer-events: none;
		}

		.plate,
		.tile {
			position: absolute;
			border-radius: var(--radius-btn);
			background: var(--color-accent);
			color: var(--color-on-accent);
			pointer-events: none;

			@include mixins.mq-motion-allow {
				transition:
					translate 0.5s var(--ease),
					rotate 0.5s var(--ease),
					scale 0.5s var(--ease),
					opacity 0.4s var(--ease);
			}
		}

		.plate {
			inset: 0;
			transform-origin: 100% 100%;
		}

		.tile {
			inset: 0 auto 0 var(--sq-start);
			display: grid;
			place-items: center;
			width: var(--sq-size);
			translate: -40% 90%;
			rotate: -40deg;
			opacity: 0;
		}

		.square-link {
			position: static;
			padding: var(--sq-y) var(--sq-x);
			color: var(--color-on-accent);

			&:focus-visible {
				outline: none;
			}

			@include mixins.mq-motion-allow {
				transition: color var(--duration) var(--ease);
			}

			&::before {
				content: '';
				position: absolute;
				inset: 0;
			}
		}

		.label {
			@include mixins.mq-motion-allow {
				transition: translate 0.5s var(--ease);
			}
		}

		&:has(:focus-visible) {
			@include engaged;
		}

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				@include engaged;
			}
		}
	}

	.outline {
		color: var(--color-text);

		@include mixins.desktop-hover {
			color: var(--color-accent-text);

			@include mixins.mq-motion-allow {
				scale: 0.96;
			}
		}
	}

	.label {
		position: relative;
	}

	.end {
		position: relative;
		display: inline-flex;

		@include mixins.mq-motion-allow {
			transition: translate var(--duration) var(--ease);
		}
	}

	.button {
		@include mixins.desktop-hover {
			.end {
				translate: var(--icon-shift, 0) 0;
			}
		}
	}

	.circle {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 1.5em;
		height: 1.5em;
		translate: -50% -50%;
		pointer-events: none;

		path {
			stroke: currentColor;
			stroke-width: 2px;
			stroke-dasharray: 1;
			stroke-dashoffset: 1;

			@include mixins.mq-motion-allow {
				transition: stroke-dashoffset 1.2s var(--ease);
			}
		}
	}

	.button {
		@include mixins.desktop-hover {
			.circle path {
				stroke-dashoffset: 0;
			}
		}
	}

	.button > :global(.icon),
	.end > :global(.icon) {
		@include mixins.mq-motion-allow {
			transition: scale var(--duration) var(--ease);
		}
	}

	.button[aria-expanded='true'] > :global(.icon:last-child),
	.button[aria-expanded='true'] > .end:last-child > :global(.icon) {
		scale: 1 -1;
	}

	.underline {
		color: var(--color-text);

		.label::before {
			content: '';
			position: absolute;
			inset: auto auto 0 0;
			width: 100%;
			height: 1px;
			background: currentColor;

			@include mixins.mq-motion-allow {
				transition:
					width var(--duration) var(--ease),
					inset var(--duration) var(--ease);
			}
		}

		@include mixins.desktop-hover {
			.label::before {
				inset: auto 0 0 auto;
				width: 0;
			}
		}
	}

	.text {
		color: var(--color-accent-text);

		@include mixins.desktop-hover {
			color: var(--color-text);
		}
	}

	.sm {
		--btn-font-size: 13px;
	}

	.lg {
		--btn-font-size: 18px;
	}

	.solid.sm,
	.outline.sm {
		padding: var(--btn-padding-sm);
	}

	.solid.lg,
	.outline.lg {
		padding: var(--btn-padding-lg);
	}

	.button.icon-only {
		padding: var(--btn-padding-icon);
	}
</style>
