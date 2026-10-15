<script lang="ts">
	import Footer from '$lib/axys/footer.svelte';
	import Button from '$lib/components/button.svelte';
</script>

<svelte:head>
	<meta name="msvalidate.01" content="1C120B0CD18EE1FBFC57C15BDC93135A" />
	<meta name="twitter:site" content="@AXYSCreative" />
</svelte:head>

<div class="page-not-found">
	<main id="main" aria-label="404 Page Not Found">
		<section class="not-found-section" id="not-found-section">
			<div class="not-found-title">
				<h2 class="bold-text">404</h2>
				<h1>page <span class="bold-text">not found</span></h1>
			</div>
			<p class="headline-description">The page you're looking for doesn't exist.</p>
			<div class="cta-wrapper">
				<Button text="return home" url="/" type="solid" />
			</div>
		</section>
	</main>

	<Footer returnHref="/" returnText="Home" social={false} />
</div>
