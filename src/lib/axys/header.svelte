<script lang="ts">
	import { createAttachmentKey } from 'svelte/attachments';
	import { cursorTarget } from '$lib/attachments/cursor-target';
	import { glitchHover } from '$lib/attachments/glitch-hover';
	import HeaderAbsolute from '$lib/components/header-absolute.svelte';
	import SiteNavAxys, {
		type SiteNavAxysLink,
		type SiteNavAxysSocialLink
	} from '$lib/components/site-nav-axys.svelte';
	import nav from '$lib/content/global/navigation-axys.json';
</script>

<HeaderAbsolute
	logo={nav.logo}
	desktopLayout="controls"
	showCtas={false}
	mobileNav="overlay"
	navButton={{
		symbol: 'burger',
		type: 'icon',
		text: 'menu',
		class: 'axys-menu',
		[createAttachmentKey()]: cursorTarget({
			target: '.axys-menu .icon',
			variant: 'menu',
			event: 'enter'
		}),
		[createAttachmentKey()]: glitchHover({ target: '.text', duration: 0.4 })
	}}
>
	{#snippet navigation({ id, open, close })}
		<SiteNavAxys
			{id}
			{open}
			links={nav.links as SiteNavAxysLink[]}
			footerLinks={nav.footerLinks as SiteNavAxysLink[]}
			socialLabel={nav.socialLabel}
			socialLinks={nav.socialLinks as SiteNavAxysSocialLink[]}
			onlink={close}
		/>
	{/snippet}
</HeaderAbsolute>
