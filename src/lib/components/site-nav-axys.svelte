<script module lang="ts">
	export type SiteNavAxysAccent = 'pink' | 'green' | 'blue' | 'coral' | 'yellow';

	export type SiteNavAxysLink = {
		text: string;
		url: string;
		newTab?: boolean;
		/** Icon name from `static/icons`, in the footer links. */
		icon?: string;
		/** The color the link takes when it is hovered or focused. */
		accent?: SiteNavAxysAccent;
	};

	export type SiteNavAxysSocialLink = {
		title: string;
		/** The short text shown for the link, e.g. `Ig`. */
		label: string;
		url: string;
	};

	export type SiteNavAxysProps = {
		id: string;
		open: boolean;
		links?: SiteNavAxysLink[];
		/** Small links along the bottom left. */
		footerLinks?: SiteNavAxysLink[];
		/** The title that lifts to reveal the social links on hover. Takes rich text, e.g. `Social [Media]{.secondary}`. */
		socialLabel?: string;
		socialLinks?: SiteNavAxysSocialLink[];
		/** Called when a link inside is chosen. */
		onlink?: () => void;
	};
</script>

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { cursorTarget } from '$lib/attachments/cursor-target';
	import { cursor } from '$lib/utils/cursor.svelte';
	import { magnet } from '$lib/attachments/magnet';
	import { glitchHover } from '$lib/attachments/glitch-hover';
	import Icon from './icon.svelte';
	import SocialReveal from './social-reveal.svelte';

	let {
		id,
		open,
		links = [],
		footerLinks = [],
		socialLabel = 'Social Media',
		socialLinks = [],
		onlink
	}: SiteNavAxysProps = $props();

	const colors: Record<SiteNavAxysAccent, string> = {
		pink: 'var(--color-pink)',
		green: 'var(--color-tertiary)',
		blue: 'var(--color-secondary)',
		coral: 'var(--color-accent)',
		yellow: 'var(--color-yellow)'
	};
	const accent = (name?: SiteNavAxysAccent) => (name ? colors[name] : 'var(--color-accent)');

	// While the navigation is open, everything behind it is out of reach for keyboards and screen readers, and the page
	// does not scroll.
	$effect(() => {
		if (!open) return;

		const behind = document.querySelectorAll<HTMLElement>('main, footer');
		behind.forEach((el) => (el.inert = true));
		document.body.style.overflow = 'hidden';

		return () => {
			behind.forEach((el) => (el.inert = false));
			document.body.style.overflow = '';
		};
	});

	// The cursor settles on the link's icon while the pointer is over the link.
	const toIcon: Attachment<HTMLElement> = (el) =>
		cursorTarget({
			target: () => el.querySelector('.icon-ring'),
			variant: 'icon',
			event: 'enter'
		})(el);

	// The cursor becomes a thin bar beside the hovered link and slides from link to link without letting go.
	const slider: Attachment<HTMLElement> = (list) => {
		const owner = Symbol('nav-slider');
		let current: HTMLElement | null = null;

		const claim = (link: HTMLElement) => {
			current = link;
			cursor.claim(owner, {
				variant: 'bar',
				target: () => {
					const rect = current?.getBoundingClientRect();
					const text = current?.querySelector('.label')?.getBoundingClientRect();
					return rect && text
						? { x: text.left - 16, y: rect.top + rect.height / 2, width: 2, height: rect.height }
						: null;
				}
			});
		};

		const release = () => {
			current = null;
			cursor.release(owner);
		};

		// The bar holds between two links, but lets go once the pointer is off the link's column or over empty space beside it.
		const update = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			const link = (event.target as Element).closest<HTMLElement>('a');
			if (link && list.contains(link)) {
				if (link !== current) claim(link);
				return;
			}
			if (!current) return;
			const rect = current.getBoundingClientRect();
			const inColumn = event.clientX >= rect.left && event.clientX <= rect.right;
			const between = event.target === list || (event.target as Element).tagName === 'LI';
			if (!(between && inColumn)) release();
		};

		list.addEventListener('pointerover', update);
		list.addEventListener('pointermove', update);
		list.addEventListener('pointerleave', release);
		return () => {
			list.removeEventListener('pointerover', update);
			list.removeEventListener('pointermove', update);
			list.removeEventListener('pointerleave', release);
			release();
		};
	};

	// The same pull as the menu button's burger.
	const pull = {
		x: 1.2,
		y: 1.2,
		followDuration: 500,
		returnDuration: 350,
		returnEase: 'cubic-bezier(0, 1.64, 0.63, 1.92)'
	};

	const onclick = (event: MouseEvent) => {
		if ((event.target as Element).closest('a')) onlink?.();
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<nav
	{id}
	class="axys-nav"
	class:open
	aria-label="Site navigation"
	inert={!open}
	data-lenis-prevent
	{onclick}
>
	<div class="constraint">
		<ul class="links" {@attach slider}>
			{#each links as link (link.url)}
				<li style="--accent: {accent(link.accent)}">
					<a
						class="link"
						href={link.url}
						target={link.newTab ? '_blank' : undefined}
						rel={link.newTab ? 'noopener noreferrer' : undefined}
						{@attach glitchHover({ duration: 0.4, lockWidth: false })}
					>
						<span class="label">{link.text}</span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="footer">
			<ul class="footer-links">
				{#each footerLinks as link (link.url)}
					<li style="--accent: {accent(link.accent)}">
						<a
							class="footer-link"
							href={link.url}
							{@attach toIcon}
							target={link.newTab ? '_blank' : undefined}
							rel={link.newTab ? 'noopener noreferrer' : undefined}
						>
							{#if link.icon}<span class="icon-ring" {@attach magnet(pull)}
									><Icon name={link.icon} /></span
								>{/if}
							<span class="label">{link.text}</span>
						</a>
					</li>
				{/each}
			</ul>

			{#if socialLinks.length}
				<div class="social-wrap"><SocialReveal label={socialLabel} links={socialLinks} /></div>
			{/if}
		</div>
	</div>
</nav>

<style lang="scss">
	@use 'base/mixins';

	// A rounded panel that fills the screen, tipping forward as it fades in.
	.axys-nav {
		position: fixed;
		inset: calc(var(--body-padding) / 4);
		z-index: var(--z-nav);
		min-height: 520px;
		overflow: auto;
		border-radius: var(--radius);
		background: rgb(30 30 30 / 0.95);
		backdrop-filter: blur(4px);
		opacity: 0;
		pointer-events: none;
		transform-origin: top;

		@include mixins.mq-motion-allow {
			transition: opacity 0.4s ease;
		}

		&.open {
			opacity: 1;
			pointer-events: auto;

			// An animation, not a resting transform, so the links measure at their true size while it is closed.
			@include mixins.mq-motion-allow {
				animation: nav-in 0.5s ease;
			}

			.links li,
			.footer-links li,
			.social-wrap {
				opacity: 1;
			}
		}
	}

	@keyframes nav-in {
		from {
			opacity: 0;
			transform: perspective(500px) rotateX(-5deg);
		}
	}

	.constraint {
		position: relative;
		height: 100%;
		min-height: inherit;
		width: min(var(--content-width), 100% - var(--body-padding) * 1.5);
		margin-inline: auto;
	}

	.links,
	.footer {
		position: absolute;
		inset-inline: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.links {
		--indent: 20px;

		top: 50%;
		translate: 0 -50%;

		@include mixins.max-md {
			--indent: 12px;
		}

		@include mixins.max-sm {
			--indent: 0px;
		}

		li {
			margin-inline-start: calc(var(--indent) * -1);
			padding-block: 6px;
			line-height: 1;
			opacity: 0;

			@include mixins.max-md {
				padding-block: 4px;
			}

			@include mixins.mq-motion-allow {
				transition: opacity 0.2s ease;
			}

			@for $i from 1 through 5 {
				&:nth-child(#{$i}) {
					transition-delay: 0.12s + 0.04s * $i;
				}
			}
		}
	}

	.link {
		position: relative;
		display: inline-block;
		padding-block: 6px;
		padding-inline-start: 20px;
		color: var(--color-text);
		font-size: 40px;
		line-height: 1;
		text-decoration: none;

		@include mixins.mq-motion-allow {
			transition: padding 0.3s ease;
		}

		@include mixins.max-md {
			padding-block: 8px;
			padding-inline-start: 12px;
			font-size: 28px;
		}

		@include mixins.max-sm {
			padding-inline-start: 0;
		}

		&:hover,
		&:focus-visible {
			padding-inline-start: 36px;

			@include mixins.max-md {
				padding-inline-start: 24px;
			}

			@include mixins.max-sm {
				padding-inline-start: 0;
			}

			.label {
				color: var(--accent);
			}
		}
	}

	.label {
		color: inherit;
		transition: color 0.3s ease;
	}

	.footer {
		bottom: 36px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		@include mixins.max-md {
			flex-direction: row-reverse;
		}
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 56px;
		margin: 0;
		padding: 0;
		list-style: none;
		translate: -14px 0;

		@include mixins.max-xxl {
			gap: 24px;
		}

		@include mixins.max-lg {
			gap: 4px;
		}

		@include mixins.max-md {
			flex-direction: column;
			align-items: flex-start;
			gap: 6px;
			translate: 0 8px;
		}

		li {
			opacity: 0;

			@include mixins.mq-motion-allow {
				transition: opacity 0.2s ease 0.28s;
			}
		}
	}

	.footer-link {
		display: flex;
		align-items: center;
		gap: 4px;
		color: var(--color-text);
		font-size: 16px;
		text-decoration: none;

		@include mixins.max-md {
			font-size: 14px;
		}

		.label {
			@include mixins.mq-motion-allow {
				transition:
					translate 0.3s ease,
					color 0.3s ease;
			}
		}

		&:hover,
		&:focus-visible {
			.label {
				translate: 12px 0;

				@include mixins.max-md {
					translate: 0 0;
				}
			}
		}

		&:focus-visible .icon-ring {
			border-color: var(--color-text);
		}
	}

	.icon-ring {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border: 2px solid transparent;
		border-radius: 50%;
		color: var(--accent);
		font-size: 20px;

		@include mixins.max-md {
			width: 32px;
			height: 32px;
		}
	}

	// The social links fade in with the panel; the group itself is the shared SocialReveal.
	.social-wrap {
		opacity: 0;
		translate: 0 -8px;

		@include mixins.mq-motion-allow {
			transition:
				translate 0.3s ease,
				opacity 0.3s ease 0.4s;
		}
	}

	// The legacy `*` rule gives every element its own color, so the icons would not inherit their wrapper's.
	.icon-ring :global(.icon) {
		color: inherit;
	}
</style>
