<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { cursorTarget } from '$lib/attachments/cursor-target';
	import { magnet } from '$lib/attachments/magnet';
	import SocialReveal, { type SocialRevealLink } from '$lib/components/social-reveal.svelte';
	import nav from '$lib/content/global/navigation-axys.json';

	type Props = {
		/** Where the return link goes. `#` scrolls to the top of the page. */
		returnHref?: string;
		returnText?: string;
		/** Shows the "Email us" block (small screens only) with this address. */
		email?: string;
		/** Shows the social links, the same component as the menu's. */
		social?: boolean;
	};

	let { returnHref = '#', returnText = 'To Top', email, social = true }: Props = $props();

	const year = new Date().getFullYear();

	// The cursor settles on the arrow while the pointer is anywhere on the link.
	const toIcon: Attachment<HTMLElement> = (el) =>
		cursorTarget({
			target: () => el.querySelector('.return-icon'),
			variant: 'icon',
			event: 'enter'
		})(el);

	// The same pull as the menu button's burger.
	const pull = {
		x: 1.2,
		y: 1.2,
		followDuration: 500,
		returnDuration: 350,
		returnEase: 'cubic-bezier(0, 1.64, 0.63, 1.92)'
	};
</script>

<footer>
	<a class="return-to-top tab-element-page" href={returnHref} {@attach toIcon}>
		<span class="return-icon" {@attach magnet(pull)}>
			<svg
				class="return-to-top-icon green-text"
				width="18"
				height="28"
				viewBox="0 0 18 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M8.685 8.87031C8.76375 8.79922 8.88188 8.75 9 8.75C9.11812 8.75 9.23625 8.79375 9.315 8.87031L16.0762 15.0773C16.155 15.1484 16.2 15.2523 16.2 15.3617C16.2 15.575 16.02 15.75 15.8006 15.75H2.19937C1.98 15.75 1.8 15.575 1.8 15.3617C1.8 15.2523 1.845 15.1539 1.92375 15.0773L8.685 8.87031ZM7.4475 7.59609L0.691875 13.8031C0.2475 14.2078 0 14.7711 0 15.3617C0 16.543 0.984375 17.5 2.19937 17.5H15.8006C17.0156 17.5 18 16.543 18 15.3617C18 14.7711 17.7525 14.2078 17.3081 13.8086L10.5525 7.59609C10.1363 7.21328 9.57937 7 9 7C8.42062 7 7.86937 7.21328 7.4475 7.59609Z"
					fill="#A4D1A2"
				/>
			</svg>
		</span>
		<span><span class="green-text">Return</span> {returnText}</span>
	</a>

	{#if email}
		<div class="email-us">
			<p class="email-us-text">
				Email <span class="green-text">us</span><svg
					class="email-us-icon green-text"
					xmlns="http://www.w3.org/2000/svg"
					height="16"
					width="16"
					viewBox="0 0 512 512"
					aria-hidden="true"
				>
					<path
						opacity="1"
						fill="#1E3050"
						d="M32 159.2l224 154 224-154V96H32v63.2zM480 198L256 352 32 198V416H480V198zM0 416V176 96 64H32 480h32V96v80V416v32H480 32 0V416z"
					/>
				</svg>
			</p>
			<a class="email-us-link classic-link tab-element-page" href="mailto:{email}">{email}</a>
		</div>
	{/if}

	<small class="copyright">
		<span>&copy;<span class="year-text">{year}</span> axys creative</span>
		<span>•</span>
		<span>All Rights Reserved</span>
	</small>

	{#if social}
		<div class="footer-social">
			<SocialReveal label={nav.socialLabel} links={nav.socialLinks as SocialRevealLink[]} />
		</div>
	{/if}
</footer>

<style lang="scss">
	// Lined up with the header and the page's content width.
	footer {
		width: min(var(--content-width), 100% - var(--body-padding) * 2);
		margin-inline: auto;
		padding-inline: 0;
	}

	// The ring that appears on hover or focus sits on the icon itself, so the magnet moves it together with the arrow.
	.return-icon {
		display: inline-flex;
	}
</style>
