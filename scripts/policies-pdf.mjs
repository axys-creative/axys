import { createServer } from 'vite';
import puppeteer from 'puppeteer-core';

const CHROME =
	process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT = 'static/documents/policies-axys-creative.pdf';

const printCss = `
	header:not(.policies-page__header), footer, .axys-bg, .scroll-progress, .mouse-cursor, .cursor-layer, .header-text a { display: none !important; }
	html, body, main { background: #fff !important; color: #000 !important; }
	main { margin: 0 !important; padding: 0 !important; }
	article, article * { color: #000 !important; }
	a { text-decoration: underline; }
`;

const server = await createServer({ server: { port: 5199, strictPort: true } });
await server.listen();
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });

try {
	const page = await browser.newPage();
	await page.goto('http://localhost:5199/policies', { waitUntil: 'networkidle0' });
	await page.emulateMediaType('print');
	await page.addStyleTag({ content: printCss });
	await page.evaluate(() => document.fonts.ready);
	await page.pdf({
		path: OUTPUT,
		format: 'Letter',
		margin: { top: '0.75in', bottom: '0.75in', left: '0.75in', right: '0.75in' },
		printBackground: true
	});
	console.log(`Saved ${OUTPUT}`);
} finally {
	await browser.close();
	await server.close();
}
