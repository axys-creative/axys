<script lang="ts">
	import Footer from '$lib/axys/footer.svelte';
	import { glitchScroll } from '$lib/attachments/glitch-scroll';

	const titleGlitch = glitchScroll({ mono: false, start: 'top bottom', end: 'bottom top' });

	const schema = `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'AXYS Creative',
		url: 'https://axyscreative.com',
		logo: 'https://axyscreative.com/public/axys-logo-192.png',
		image: 'https://axyscreative.com/public/axys-creative-og.png',
		sameAs: [
			'https://www.instagram.com/axyscreative/',
			'https://twitter.com/AXYSCreative',
			'https://dribbble.com/axyscreative'
		],
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'info@axyscreative.com',
			contactType: 'Support'
		}
	})}</${'script'}>`;
</script>

<svelte:head>
	<meta name="msvalidate.01" content="1C120B0CD18EE1FBFC57C15BDC93135A" />
	<meta name="twitter:site" content="@AXYSCreative" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html schema}
</svelte:head>

<main id="main">
	<section class="hero">
		<div class="tokens-header">
			<!-- <h1 class="page-title">CMS <span class="coral-text">Tokens</span></h1> -->
			<h1 class="page-title" aria-label="CMS Tokens">
				<span aria-hidden="true">
					CMS
					<span class="scroll-glitch coral-text" data-title="tokens" {@attach titleGlitch}
						>tokens</span
					>
				</span>
			</h1>
			<p class="page-description">
				As an admin, CMS tokens give you greater control
				<br class="md-screen-and-up" aria-hidden="true" />
				and customization over your site’s content.
			</p>
		</div>

		<div class="tokens-header">
			<!-- <h2 class="sub-title">Tokens</h2> -->
			<h2
				class="sub-title scroll-glitch green-text"
				aria-label="Tokens"
				data-title="tokens"
				{@attach titleGlitch}
			>
				tokens
			</h2>
			<p class="tokens-header__description">
				Tokens can be used anywhere text can be added. The syntax is as follows:
				<span class="space"></span>
				<code>[%%]</code>
			</p>
		</div>

		<div class="table">
			<div class="table-block">
				<div class="table-block__info">Token</div>
				<div class="table-block__details">Description</div>
			</div>

			<div class="table-block">
				<div class="table-block__info">[%br%]</div>
				<div class="table-block__details">
					Create a line break in the text. All content following this token will start on a new
					line.
				</div>
			</div>
			<div class="table-block">
				<div class="table-block__info">[%span%] [%span%]</div>
				<div class="table-block__details">
					Wrap text within an html span tag. Great for styling individual characters, words, or
					sentences.
				</div>
			</div>
		</div>

		<div class="tokens-header">
			<!-- <h2 class="sub-title">Classes</h2> -->
			<h2
				class="sub-title scroll-glitch blue-text"
				aria-label="Classes"
				data-title="classes"
				{@attach titleGlitch}
			>
				classes
			</h2>
			<p class="tokens-header__description">
				Classes can be added to any tokens using dot notation. For example:
				<span class="space"></span>
				<code> [%br.md-up%]</code>
				or
				<code> [%span.underline%]Your text[%span%]</code>
			</p>
		</div>

		<div class="table">
			<div class="table-block">
				<div class="table-block__info">Class</div>
				<div class="table-block__details">Description</div>
			</div>

			<div class="table-block">
				<div class="table-block__info">.underline</div>
				<div class="table-block__details">Add an underline beneath your text.</div>
			</div>
			<div class="table-block">
				<div class="table-block__info">.text-stroke</div>
				<div class="table-block__details">
					Add an outline stroke to your text, setting the inner fill to transparent.
				</div>
			</div>
			<div class="table-block">
				<div class="table-block__info">.md-up</div>
				<div class="table-block__details">
					Only display your token on screens 769px wide and larger.
				</div>
			</div>
			<div class="table-block">
				<div class="table-block__info">.lg-up</div>
				<div class="table-block__details">
					Only display your token on screens 1025px wide and larger.
				</div>
			</div>
		</div>
	</section>
</main>

<Footer email="hello@axyscreative.com" />
