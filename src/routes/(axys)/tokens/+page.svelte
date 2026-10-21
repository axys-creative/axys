<script lang="ts">
	import Footer from '$lib/axys/footer.svelte';
	import { glitchScroll } from '$lib/attachments/glitch-scroll';

	import CopyButton from '$lib/components/copy-button.svelte';
	import RichText from '$lib/components/rich-text.svelte';

	type TokenRow = { code: string; description: string; example: string; plain?: boolean };

	// The table shows the token as the example uses it; the copy button keeps the `[words]` placeholder.
	const shown = (row: TokenRow) => row.example.match(/\[[^\]]*\]\{[^}]*\}/)?.[0] ?? row.code;

	const lineBreak: TokenRow[] = [
		{
			code: '{.br}',
			description: 'Starts a new line. Everything after it moves down.',
			example: 'First line{.br}Second line'
		}
	];

	const headings: TokenRow[] = [
		{
			code: '[words]{.h1}',
			description: 'The H1 size and font, without making the words a heading.',
			example: '[Heading 1]{.h1}',
			plain: true
		},
		{
			code: '[words]{.h2}',
			description: 'The H2 size and font, without making the words a heading.',
			example: '[Heading 2]{.h2}',
			plain: true
		},
		{
			code: '[words]{.h3}',
			description: 'The H3 size and font, without making the words a heading.',
			example: '[Heading 3]{.h3}',
			plain: true
		},
		{
			code: '[words]{.h4}',
			description: 'The H4 size and font, without making the words a heading.',
			example: '[Heading 4]{.h4}',
			plain: true
		},
		{
			code: '[words]{.h5}',
			description: 'The H5 size and font, without making the words a heading.',
			example: '[Heading 5]{.h5}',
			plain: true
		},
		{
			code: '[words]{.h6}',
			description: 'The H6 size and font, without making the words a heading.',
			example: '[Heading 6]{.h6}',
			plain: true
		}
	];

	const classes: TokenRow[] = [
		{
			code: '[words]{.primary}',
			description: 'Colors the words with the main accent color.',
			example: 'Make it [pop]{.primary}'
		},
		{
			code: '[words]{.secondary}',
			description: 'Colors the words with the secondary color.',
			example: 'Make it [pop]{.secondary}'
		},
		{
			code: '[words]{.strong}',
			description: 'Makes the words bold.',
			example: 'Make it [bold]{.strong}'
		},
		{
			code: '[words]{.highlight}',
			description: 'Puts a solid accent color behind the words.',
			example: 'Make it [count]{.highlight}'
		},
		{
			code: '[words]{.italic}',
			description: 'Slants the words.',
			example: 'Make it [slanted]{.italic}'
		},
		{
			code: '[words]{.strike}',
			description: 'Draws a line through the words.',
			example: 'Was [$100]{.strike} now $80'
		},
		{
			code: '[words]{.stroke}',
			description: 'Outlines the words and leaves the inside empty.',
			example: 'Make it [outlined]{.stroke}'
		},
		{
			code: '[words]{.nowrap}',
			description: 'Keeps the words together so they never split across two lines.',
			example: 'A [long phrase kept whole]{.nowrap}'
		},
		{
			code: '[words]{.glitch}',
			description: 'Scrambles the letters each time the words scroll into view.',
			example: 'Make it [glitch]{.glitch}'
		},
		{
			code: '[words]{.underline}',
			description: 'Underlines the words.',
			example: 'Make it [count]{.underline}'
		},
		{
			code: '[words]{.scribble}',
			description: 'Draws a hand-drawn underline beneath the words as they scroll into view.',
			example: 'Make it [count]{.scribble}'
		},
		{
			code: '[words]{.scribble-circle}',
			description: 'Draws a hand-drawn circle around the words as they scroll into view.',
			example: 'Make it [count]{.scribble-circle}'
		},
		{
			code: '[words]{.scribble-circle-tight}',
			description: 'A circle that sits closer to the words.',
			example: 'Make it [count]{.scribble-circle-tight}'
		},
		{
			code: '[words]{.scribble-circle-wide}',
			description: 'A circle that sits farther from the words.',
			example: 'Make it [count]{.scribble-circle-wide}'
		},
		{
			code: '[words]{.primary .scribble}',
			description: 'Combine classes by listing them in the same braces.',
			example: 'Make it [count]{.primary .scribble}'
		}
	];

	const titleGlitch = glitchScroll({ mono: false, start: 'top bottom', end: 'bottom top' });

	const schema = `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'AXYS Creative',
		url: 'https://axyscreative.com',
		logo: 'https://axyscreative.com/public/axys-logo-192.png',
		image: 'https://axyscreative.com/public/open-graph.png',
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
					<span class="scroll-glitch coral-text" data-title="Tokens" {@attach titleGlitch}
						>Tokens</span
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
				data-title="Tokens"
				{@attach titleGlitch}
			>
				Tokens
			</h2>
			<p class="tokens-header__description">
				Tokens work in any text field in the admin. Wrap the words in square brackets, then add one
				or more classes in curly braces:
				<span class="space"></span>
				<code>[words]&lbrace;.class&rbrace;</code>
			</p>
		</div>

		<div class="table" role="table">
			<div class="table-block" role="row">
				<div class="table-block__info" role="columnheader">Token</div>
				<div class="table-block__details" role="columnheader">Description</div>
			</div>
			{#each lineBreak as row (row.code)}
				{@render tokenRow(row)}
			{/each}
		</div>

		<div class="tokens-header">
			<!-- <h2 class="sub-title">Classes</h2> -->
			<h2
				class="sub-title scroll-glitch blue-text"
				aria-label="Classes"
				data-title="Classes"
				{@attach titleGlitch}
			>
				Classes
			</h2>
			<p class="tokens-header__description">
				Stack as many classes as you like inside the braces, separated by spaces. For example:
				<span class="space"></span>
				<code>[words]&lbrace;.primary .scribble&rbrace;</code>
			</p>
		</div>

		<div class="table" role="table">
			<div class="table-block" role="row">
				<div class="table-block__info" role="columnheader">Token</div>
				<div class="table-block__details" role="columnheader">Description</div>
			</div>
			{#each classes as row (row.code)}
				{@render tokenRow(row)}
			{/each}
		</div>

		<div class="tokens-header">
			<h2
				class="sub-title scroll-glitch yellow-text"
				aria-label="Headings"
				data-title="Headings"
				{@attach titleGlitch}
			>
				Headings
			</h2>
			<p class="tokens-header__description">
				Give any words the size and font of a heading. They are shown at body size here so the
				difference between levels is clear. This changes only how the words look, not the page's
				heading structure.
			</p>
		</div>

		<div class="table" role="table">
			<div class="table-block" role="row">
				<div class="table-block__info" role="columnheader">Token</div>
				<div class="table-block__details" role="columnheader">Description</div>
			</div>
			{#each headings as row (row.code)}
				{@render tokenRow(row)}
			{/each}
		</div>
	</section>
</main>

{#snippet tokenRow(row: TokenRow)}
	<div class="table-block" role="row">
		<div class="table-block__info" role="cell">
			<code>{shown(row)}</code>
			<CopyButton
				class="table-block__copy"
				text={row.code}
				label="Copy"
				copiedText="Copied"
				type="outline"
				size="sm"
			/>
		</div>
		<div class="table-block__details" role="cell">{row.description}</div>
		<div class="table-block__preview" class:table-block__preview--body={row.plain} role="cell">
			<RichText text={row.example} />
		</div>
	</div>
{/snippet}

<Footer email="hello@axyscreative.com" />
