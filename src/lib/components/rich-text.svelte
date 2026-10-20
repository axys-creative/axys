<script module lang="ts">
	export type RichTextProps = {
		/** Plain text. `[words]{.primary .scribble}` styles words, `{.br}` is a line break. Classes: `glitch`, `h1` to `h6`, `highlight`, `italic`, `nowrap`, `primary`, `scribble`, `secondary`, `strike`, `stroke`, `strong`, `underline`. */
		text: string;
		class?: string;
	};
</script>

<script lang="ts">
	import { richTextBehaviors } from '$lib/attachments/rich-text';
	import { richText } from '$lib/utils/rich-text';

	let { text, class: className }: RichTextProps = $props();
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<span class={className} {@attach richTextBehaviors(text)}>{@html richText(text)}</span>
