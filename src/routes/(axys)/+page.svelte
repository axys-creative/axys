<script lang="ts">
	import Footer from '$lib/axys/footer.svelte';
	import type { Attachment } from 'svelte/attachments';
	import { glitchCycle } from '$lib/attachments/glitch-cycle';
	import { cursorContent } from '$lib/attachments/cursor-content';
	import { loading } from '$lib/utils/loading.svelte';
	import { textReveal } from '$lib/attachments/text-reveal';
	import { cursorTarget } from '$lib/attachments/cursor-target';
	import { magnet } from '$lib/attachments/magnet';
	import { glitchHover } from '$lib/attachments/glitch-hover';
	import { gridFade } from '$lib/attachments/grid-fade';
	import { glitchScroll } from '$lib/attachments/glitch-scroll';
	import { textScale } from '$lib/attachments/text-scale';
	import Button from '$lib/components/button.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Marquee from '$lib/components/marquee.svelte';
	import CommonQuestions from '$lib/sections/common-questions.svelte';
	import PlanSelection from '$lib/sections/plan-selection.svelte';
	import plans from '$lib/content/page_home/plan-selection.json';
	import faq from '$lib/content/page_home/common-questions.json';

	const heroWords = ['Creative', 'Responsive', 'Accessible', 'Innovative', 'Engaging'];
	const heroColors = ['#E48C66', '#7EC1D4', '#A4D1A2', '#FBFAA2', '#E1A7B4'];

	const keywordCursor = (icon: string) =>
		cursorContent({
			icon,
			iconSize: 'xl',
			iconLayer: 'behind',
			iconColor: 'rgb(255 255 255 / 0.2)',
			variant: 'keyword',
			tilt: { max: 20 }
		});

	const subtitleReveal = (from: 'bottom' | 'top', delay: number) =>
		loading.done
			? textReveal({
					type: 'chars',
					from,
					once: true,
					duration: 0.4,
					stagger: 0.03,
					ease: 'power2.out',
					delay
				})
			: undefined;

	const workGlitch = glitchHover();

	const workCursor: Attachment<HTMLElement> = (el) =>
		cursorTarget({ target: () => el.querySelector('.end'), variant: 'icon', event: 'enter' })(el);

	const pull = {
		x: 1.2,
		y: 1.2,
		followDuration: 500,
		returnDuration: 350,
		returnEase: 'cubic-bezier(0, 1.64, 0.63, 1.92)'
	};

	const titleGlitch = glitchScroll({ mono: false, start: 'top bottom', end: 'bottom top' });

	const statementScale = textScale({
		type: 'words',
		style: 'random',
		scrub: true,
		start: 'top 96%',
		end: 'bottom 75%'
	});

	// Narrow screens watch the word itself; wider ones watch the whole benefits section.
	const benefitsGlitch: Attachment<HTMLElement> = (el) => {
		const narrow = matchMedia('(max-width: 1024px)').matches;
		return glitchScroll({
			mono: false,
			trigger: narrow ? undefined : '#benefits',
			start: narrow ? 'top bottom' : 'top 72%',
			end: narrow ? 'bottom top' : 'bottom 36%'
		})(el);
	};
	const schema = `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				name: 'AXYS Creative',
				url: 'https://axyscreative.com',
				logo: 'https://axyscreative.com/public/axys-logo-192.png',
				image: 'https://axyscreative.com/public/open-graph.png',
				sameAs: [
					'https://www.instagram.com/axyscreative/',
					'https://twitter.com/axyscreative',
					'https://dribbble.com/axyscreative'
				],
				contactPoint: {
					'@type': 'ContactPoint',
					email: 'info@axyscreative.com',
					contactType: 'Support'
				}
			},
			{
				'@type': 'Service',
				name: 'Designer Plan',
				description:
					'Unlimited web design services. One request at a time. Average 1-2 day delivery. Seamless management. Pause or cancel anytime.',
				provider: {
					'@type': 'Organization',
					name: 'AXYS Creative'
				},
				serviceType: 'Web Design',
				areaServed: 'Worldwide',
				offers: {
					'@type': 'Offer',
					price: '1995',
					priceCurrency: 'USD',
					availability: 'https://schema.org/InStock',
					url: 'https://axyscreative.com/#plans',
					eligibleQuantity: {
						'@type': 'QuantitativeValue',
						unitText: 'month'
					}
				}
			},
			{
				'@type': 'Service',
				name: 'Developer Plan',
				description:
					'Unlimited web development services. One request at a time. Average 1-2 day delivery. Seamless management. Pause or cancel anytime.',
				provider: {
					'@type': 'Organization',
					name: 'AXYS Creative'
				},
				serviceType: 'Web Development',
				areaServed: 'Worldwide',
				offers: {
					'@type': 'Offer',
					price: '2995',
					priceCurrency: 'USD',
					availability: 'https://schema.org/InStock',
					url: 'https://axyscreative.com/#plans',
					eligibleQuantity: {
						'@type': 'QuantitativeValue',
						unitText: 'month'
					}
				}
			},
			{
				'@type': 'Service',
				name: 'Premium Plan',
				description:
					'Unlimited web design and development services. Two requests at a time. Average 1-2 day delivery. Seamless management. Pause or cancel anytime.',
				provider: {
					'@type': 'Organization',
					name: 'AXYS Creative'
				},
				serviceType: 'Web Design and Development',
				areaServed: 'Worldwide',
				offers: {
					'@type': 'Offer',
					price: '3995',
					priceCurrency: 'USD',
					availability: 'https://schema.org/InStock',
					url: 'https://axyscreative.com/#plans',
					eligibleQuantity: {
						'@type': 'QuantitativeValue',
						unitText: 'month'
					}
				}
			}
		]
	})}</${'script'}>`;
</script>

<svelte:head>
	<meta name="msvalidate.01" content="1C120B0CD18EE1FBFC57C15BDC93135A" />
	<meta name="twitter:site" content="@AXYSCreative" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html schema}
</svelte:head>

{#snippet secondary(text: string, url: string, newTab = false)}
	<Button
		{text}
		{url}
		{newTab}
		type="text"
		iconEnd="chevron-right"
		iconShift="16px"
		iconEndAttach={magnet(pull)}
		{@attach workGlitch}
		{@attach workCursor}
	/>
{/snippet}

<main id="main" aria-label="Main website content">
	<section class="hero-section" id="hero-section">
		<div class="section-headline">
			<h1
				class="section-headline__title"
				aria-label="Creative, Responsive, Accessible, Innovative, and Engaging Web design + development"
			>
				<span class="line">
					<span
						class="dynamic-text"
						aria-hidden="true"
						{@attach glitchCycle({ words: heroWords, colors: heroColors, mono: false })}
						>Creative</span
					>
					<span class="no-motion coral-text" aria-hidden="true"> Creative </span>
				</span>
				<span class="line"><span aria-hidden="true">Web design +</span></span>
				<span class="line"><span class="development" aria-hidden="true">Development</span></span>
			</h1>

			<small class="section-headline__subtitle">
				<span {@attach subtitleReveal('bottom', 1.15)}>Unlimited services.</span><br />
				<span {@attach subtitleReveal('top', 1.3)}>One basic subscription.</span>
			</small>
		</div>

		<div class="cta-wrapper">
			<Button text="View plans" url="#plans" type="square" />
			{@render secondary('Our work', '#work')}
		</div>
	</section>

	<div
		class="presentation-content"
		role="region"
		aria-label="You request it. We build it. Make something worth scrolling for."
	>
		<Marquee
			class="axys-marquee"
			label="You request it. We build it."
			speed={120}
			scrub={0.5}
			reverse
		>
			<Icon name="arrow-right" class="marquee-flip" />
			You <span class="pink-text">request</span> it. We <span class="yellow-text">build</span> it.
		</Marquee>
		<Marquee
			class="axys-marquee"
			label="Make something worth scrolling for."
			speed={120}
			scrub={0.5}
			reverse
			opposite
		>
			<Icon name="arrow-right" class="marquee-flip" />
			Make something <span class="pink-text">worth</span>
			<span class="yellow-text">scrolling</span> for.
		</Marquee>
	</div>

	<section class="work-section" id="work">
		<div class="section-headline">
			<h2 class="section-headline__heading" aria-label="Our work">
				<span aria-hidden="true">
					Our
					<span class="scroll-glitch" data-title="work" {@attach titleGlitch}>work</span>
				</span>
			</h2>
			<p class="headline-description">
				<span class="md-screen-and-above">
					We diligently collaborate with our clients to create
				</span>
				<span class="md-screen-and-above"> exceptional experiences for their audiences. </span>
			</p>
		</div>

		<div class="work-showcase">
			<div class="showcase-link">
				<figure class="showcase-item">
					<div class="showcase-frame">
						<a
							class="showcase-cover"
							href="https://joinsunder.com/"
							target="_blank"
							rel="noopener noreferrer"
							tabindex="-1"
							aria-hidden="true"
							><div
								class="showcase-media"
								{@attach gridFade({ size: 'md', sequence: 'random', scrub: false, duration: 0.8 })}
							>
								<img
									class="showcase-img"
									src="/assets/images/showcase-1.webp"
									alt="Join Sunder showcase"
									loading="lazy"
									width="400"
									height="250"
								/>
							</div></a
						>
					</div>
					<div class="showcase-visit">
						<Button
							type="square"
							text="Visit site"
							textDescription="Visit Join Sunder"
							url="https://joinsunder.com/"
							newTab
						/>
					</div>
					<figcaption class="showcase-caption gsap-animate">
						Join Sunder &nbsp;&nbsp;•&nbsp;&nbsp; Development
					</figcaption>
				</figure>
			</div>
			<div class="showcase-link">
				<figure class="showcase-item">
					<div class="showcase-frame">
						<a
							class="showcase-cover"
							href="https://flavorsofalchemy.netlify.app/"
							target="_blank"
							rel="noopener noreferrer"
							tabindex="-1"
							aria-hidden="true"
							><div
								class="showcase-media"
								{@attach gridFade({ size: 'md', sequence: 'random', scrub: false, duration: 0.8 })}
							>
								<img
									class="showcase-img"
									src="/assets/images/showcase-2.webp"
									alt="Work item - Flavors of Alchemy, click to visit site"
									loading="lazy"
									width="400"
									height="200"
								/>
							</div></a
						>
					</div>
					<div class="showcase-visit">
						<Button
							type="square"
							text="Visit site"
							textDescription="Visit Flavors of Alchemy"
							url="https://flavorsofalchemy.netlify.app/"
							newTab
						/>
					</div>
					<figcaption class="showcase-caption gsap-animate">
						Flavors of Alchemy &nbsp;&nbsp;•&nbsp;&nbsp; Design + Development
					</figcaption>
				</figure>
			</div>
			<div class="showcase-link">
				<figure class="showcase-item">
					<div class="showcase-frame">
						<a
							class="showcase-cover"
							href="https://essentialism.netlify.app"
							target="_blank"
							rel="noopener noreferrer"
							tabindex="-1"
							aria-hidden="true"
							><div
								class="showcase-media"
								{@attach gridFade({ size: 'md', sequence: 'random', scrub: false, duration: 0.8 })}
							>
								<img
									class="showcase-img"
									src="/assets/images/showcase-3.webp"
									alt="Essence showcase"
									loading="lazy"
									width="400"
									height="200"
								/>
							</div></a
						>
					</div>
					<div class="showcase-visit">
						<Button
							type="square"
							text="Visit site"
							textDescription="Visit Essence"
							url="https://essentialism.netlify.app"
							newTab
						/>
					</div>
					<figcaption class="showcase-caption gsap-animate">
						Essence &nbsp;&nbsp;•&nbsp;&nbsp; Design + Development
					</figcaption>
				</figure>
			</div>
			<div class="showcase-link">
				<figure class="showcase-item">
					<div class="showcase-frame">
						<a
							class="showcase-cover"
							href="https://coreapp.netlify.app/"
							target="_blank"
							rel="noopener noreferrer"
							tabindex="-1"
							aria-hidden="true"
							><div
								class="showcase-media"
								{@attach gridFade({ size: 'md', sequence: 'random', scrub: false, duration: 0.8 })}
							>
								<img
									class="showcase-img"
									src="/assets/images/showcase-4.webp"
									alt="Core showcase"
									loading="lazy"
									width="400"
									height="200"
								/>
							</div></a
						>
					</div>
					<div class="showcase-visit">
						<Button
							type="square"
							text="Visit site"
							textDescription="Visit Core"
							url="https://coreapp.netlify.app/"
							newTab
						/>
					</div>
					<figcaption class="showcase-caption gsap-animate">
						Core &nbsp;&nbsp;•&nbsp;&nbsp; Design + Development
					</figcaption>
				</figure>
			</div>
		</div>

		<small class="made-with-care">
			[ Made with care
			<svg
				class="heart-svg"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M3.11562 8.89813L7.35078 12.7511C7.52656 12.9109 7.75859 13 8 13C8.24141 13 8.47344 12.9109 8.64922 12.7511L12.8844 8.89813C13.5969 8.25179 14 7.34508 14 6.39727V6.2648C14 4.66836 12.8164 3.30716 11.2016 3.04452C10.1328 2.87094 9.04531 3.21124 8.28125 3.95579L8 4.22986L7.71875 3.95579C6.95469 3.21124 5.86719 2.87094 4.79844 3.04452C3.18359 3.30716 2 4.66836 2 6.2648V6.39727C2 7.34508 2.40312 8.25179 3.11562 8.89813Z"
					fill="#E1A7B4"
				/>
			</svg>
			]
		</small>
	</section>

	<section class="statement-section" id="statement-section">
		<p class="mission-statement gsap-animate" role="region" {@attach statementScale}>
			<span>
				<span class="text">We</span>
				<span class="text">are</span>
				<span class="text">committed</span>
				<span class="text">to</span>
				<span class="text">building</span>
				<span class="text">timeless,</span>
				<span class="text">responsive,</span>
				<br class="md-screen-and-up" aria-hidden="true" />
				<span class="text">and</span>
				<span class="text">performant</span>
				<span class="text coral-text statement-websites" {@attach keywordCursor('globe')}
					>websites</span
				>
				<span class="text">optimized</span>
				<span class="text">for</span>
				<span class="text green-text statement-a11y" {@attach keywordCursor('icon-accessible')}>
					user <br class="md-screen-and-up" aria-hidden="true" />
					accessibility
				</span>
				<span class="text">and </span>
				<span class="text blue-text statement-seo" {@attach keywordCursor('icon-search')}
					>search engines.</span
				>
			</span>
		</p>
	</section>

	<section class="benefits-section" id="benefits">
		<div class="headline-full benefits-headline-full">
			<div class="section-headline">
				<h2 class="section-headline__heading" aria-label="Member Benefits">
					<span aria-hidden="true">
						Member<br />
						<span data-title="benefits" {@attach benefitsGlitch}> benefits </span>
					</span>
				</h2>
				<p class="headline-description">Unlock these perks and so much more.</p>
			</div>
			<div class="cta-wrapper lg-screen-and-up">
				<Button text="View plans" url="#plans" type="square" />
				{@render secondary('Our work', '#work')}
			</div>
		</div>
		<div class="benefit-list gsap-animate">
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-infinity" />
					Unlimited services
				</h3>
				<p>
					Gain access to endless design and development services. Simply put in a ticket in
					<a
						class="classic-link yellow-text tab-element-page"
						href="https://trello.com/"
						target="_blank"
					>
						Trello
					</a>
					to get started. Please be aware that each request is worked on and delivered one by one.
				</p>
			</div>
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-refresh" />
					Swift turnaround
				</h3>
				<p>
					Get designs or sections of your website generally within 1-2 business days
					<span class="business-days" role="group" aria-label="Monday through Friday">
						<span aria-hidden="true">(M-F)</span>
					</span>. Please be aware that some websites can take weeks or even months to complete
					depending on their size and complexity.
				</p>
			</div>
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-user-manage" />
					Seamless management
				</h3>
				<p>
					Keeping track of progress is made easy with
					<a
						class="classic-link yellow-text tab-element-page"
						href="https://trello.com/"
						target="_blank"
					>
						Trello
					</a>. Simply sign in from your computer or phone to create and manage tasks, then watch as
					your requests are completed and delivered.
				</p>
			</div>
			<div class="benefit-block discount-highlight gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-price-tag" />
					Fixed monthly rate
				</h3>
				<p>
					Don’t worry about inconsistent pricing that fluctuates throughout the year. Once signed
					up, your prices are locked in, ensuring you always know what to expect month to month.
					<br data-discount aria-hidden="true" />
					<br data-discount aria-hidden="true" />
					<span class="discount-benefit-text">
						Take advantage of our end-of-year sale and lock in 15% off your rate, even after the
						sale ends! Offer ends
						<time datetime="2024-12-31">December 31st, 2024</time>.
					</span>
				</p>
			</div>
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-user-add" />
					Unlimited team members
				</h3>
				<p>
					Need to add a team member to collaborate with? Just let us know and we can get them added
					to the
					<a
						class="classic-link yellow-text tab-element-page"
						href="https://trello.com/"
						target="_blank"
					>
						Trello
					</a>
					board. Then they’ll have access to submitting and tracking tickets.
				</p>
			</div>
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-edit-text" />
					Copywriting
				</h3>
				<p>
					Need the words too? We write clear, on-brand copy for your pages, from headlines to calls
					to action, so your site says what it should and sounds like you.
				</p>
			</div>
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-photos" />
					Image assets
				</h3>
				<p>
					We take care of the visuals as well. Photos, icons and graphics are sourced, edited and
					sized for every screen, then compressed so your pages stay sharp and load fast.
				</p>
			</div>
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-search" />
					SEO built in
				</h3>
				<p>
					Every page is built with search in mind: clean semantic markup, meta titles and
					descriptions, structured data, fast load times and a sitemap, so search engines can find
					and understand your site.
				</p>
			</div>
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-accessible" />
					Accessible by default
				</h3>
				<p>
					Sites are built to accessibility best practices: keyboard navigation, readable contrast,
					descriptive alt text and screen reader support, so everyone can use what we make for you.
				</p>
			</div>
			<div class="benefit-block gsap-animate">
				<h3 class="benefit-heading">
					<Icon name="icon-pause" />
					Pause or cancel anytime
				</h3>
				<p>
					No contracts, ever. We understand that your workload may change, so feel free to pause or
					cancel anytime. "Pausing" stops all charges and allows for quick start up again while
					keeping your rate locked in.
				</p>
			</div>
		</div>
		<div class="cta-wrapper lg-screen-and-below">
			<Button text="View plans" url="#plans" type="square" />
			{@render secondary('Our work', '#work')}
		</div>
	</section>

	<div class="client-logos presentation-content" aria-hidden="true">
		<div class="marquee">
			<div class="marquee-inner-logos"></div>
			<div class="marquee-inner-logos"></div>
		</div>
	</div>

	<PlanSelection id="plans" {...plans} title={'Member [Plans]{.primary}'} />

	<CommonQuestions
		id="faq"
		{...faq}
		title={'The [FAQs]{.primary}'}
		description="Any questions? We’ve got answers."
	/>

	<section class="pre-footer" id="pre-footer">
		<div class="pre-footer-title">
			<h2 aria-label="Unlock access">
				<span aria-hidden="true">
					Unlock <span data-title="access" {@attach titleGlitch}>access</span>
				</span>
			</h2>
		</div>

		<p class="headline-description">
			<span class="md-screen-and-above">
				Gain access to unlimited design and development services,
			</span>
			<span class="md-screen-and-above">
				and free up your time for more urgent business needs.
			</span>
		</p>

		<div class="cta-wrapper">
			<Button text="View plans" url="#plans" type="square" />
			{@render secondary('Book call', 'https://calendly.com/axyscreativeagency/15-min-intro', true)}
		</div>
	</section>
</main>

<Footer email="hello@axyscreative.com" />
