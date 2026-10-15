<script lang="ts">
	import { onMount } from 'svelte';
	import CommonQuestions from '$lib/sections/common-questions.svelte';
	import HeroDotsLogo from '$lib/sections/hero-dots-logo.svelte';
	import PlanSelection from '$lib/sections/plan-selection.svelte';
	import ScrollHorizontal from '$lib/sections/scroll-horizontal.svelte';
	import ScrollStack, { type ScrollStackProps } from '$lib/sections/scroll-stack.svelte';
	import WorkGallery, { type WorkGalleryProps } from '$lib/sections/work-gallery.svelte';
	import hero from '$lib/content/page_home/hero-dots-logo.json';
	import scrollHorizontal from '$lib/content/page_home/scroll-horizontal.json';
	import work from '$lib/content/page_home/work-gallery.json';
	import scrollStack from '$lib/content/page_home/scroll-stack.json';
	import plans from '$lib/content/page_home/plan-selection.json';
	import questions from '$lib/content/page_home/common-questions.json';
	import { hasIdentityToken, loadIdentity } from '$lib/utils/identity';

	// Netlify sends CMS invite and recovery links to the home page.
	onMount(() => {
		if (!hasIdentityToken()) return;
		loadIdentity().then((identity) => identity.on('login', () => location.assign('/admin/')));
	});
</script>

<HeroDotsLogo id="hero" {...hero} />
<ScrollHorizontal id="message" {...scrollHorizontal} />
<WorkGallery id="work" {...work as WorkGalleryProps} />
<ScrollStack id="benefits" {...scrollStack as ScrollStackProps} />
<PlanSelection id="plans" {...plans} />
<CommonQuestions id="faq" {...questions} />
