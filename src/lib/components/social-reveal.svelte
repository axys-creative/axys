<script module lang="ts">
	export type SocialRevealLink = {
		title: string;
		/** The short text shown for the link, e.g. `Ig`. */
		label: string;
		url: string;
	};

	export type SocialRevealProps = {
		/** The title that lifts to reveal the links on hover. Takes rich text, e.g. `Social [Media]{.secondary}`. */
		label?: string;
		links?: SocialRevealLink[];
		class?: string;
	};
</script>

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { cursorTarget } from '$lib/attachments/cursor-target';
	import { magnet } from '$lib/attachments/magnet';
	import Icon from './icon.svelte';
	import RichText from './rich-text.svelte';

	let {
		label = 'Social [Media]{.secondary}',
		links = [],
		class: className
	}: SocialRevealProps = $props();

	// The same pull as the menu button's burger.
	const pull = {
		x: 1.2,
		y: 1.2,
		followDuration: 500,
		returnDuration: 350,
		returnEase: 'cubic-bezier(0, 1.64, 0.63, 1.92)'
	};

	const toSelf: Attachment<HTMLElement> = (el) =>
		cursorTarget({ target: el, variant: 'icon', event: 'enter' })(el);
</script>

{#if links.length}
	<div class="social {className ?? ''}">
		<p class="social-title">
			<RichText text={label} />
			<span class="share"><Icon name="share" /></span>
		</p>
		<ul class="social-links">
			{#each links as link (link.url)}
				<li>
					<a
						class="social-link"
						href={link.url}
						{@attach toSelf}
						{@attach magnet(pull)}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="{link.title} (opens in a new tab)">{link.label}</a
					>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style lang="scss">
	@use 'base/mixins';

	.social {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	// The title sits low until the group is pointed at, then lifts to show the links. On touch and small screens the
	// links are always there.
	.social-title {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-block-end: 24px;
		color: var(--color-text);
		translate: 0 52px;

		@include mixins.mq-motion-allow {
			transition: translate 0.3s ease;
		}

		@include mixins.max-md {
			translate: 0 12px;
		}

		@media (hover: none) {
			translate: 0 12px;
		}
	}

	.social:hover .social-title,
	.social:focus-within .social-title {
		translate: 0 0;

		@include mixins.max-md {
			translate: 0 12px;
		}
	}

	.share {
		display: flex;
		color: var(--color-secondary);
	}

	// The legacy `*` rule gives every element its own color, so the icon would not inherit its wrapper's.
	.share :global(.icon) {
		color: inherit;
	}

	.social-links {
		display: flex;
		gap: 24px;
		margin: 0 -9px 0 0;
		padding: 0;
		list-style: none;

		@include mixins.max-xxl {
			gap: 16px;
		}

		@include mixins.max-lg {
			gap: 0;
		}
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border: 2px solid transparent;
		border-radius: 50%;
		color: var(--color-text);
		text-decoration: none;
		opacity: 0;
		pointer-events: none;

		@include mixins.mq-motion-allow {
			transition:
				border-color 0.3s ease,
				color 0.3s ease,
				opacity 0.3s ease;
		}

		&:focus-visible {
			color: var(--color-secondary);
			border-color: var(--color-secondary);
		}

		@include mixins.max-md {
			opacity: 1;
			pointer-events: auto;
		}

		@media (hover: none) {
			opacity: 1;
			pointer-events: auto;
		}
	}

	.social:hover .social-link,
	.social:focus-within .social-link {
		opacity: 1;
		pointer-events: auto;
	}
</style>
