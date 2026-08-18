import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'scratch/solution-audit';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5199/solution', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: path.join(outDir, 'solution-page-full.png'), fullPage: false });
  console.log('Captured solution-page-full.png');

  // Hover over the System Overview button to test fill animation
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.innerText, b);
    if (text && text.includes('SYSTEM OVERVIEW')) {
      await b.hover();
      await new Promise(r => setTimeout(r, 300));
      await page.screenshot({ path: path.join(outDir, 'button-hover-fill.png') });
      console.log('Captured button-hover-fill.png');

      await b.click();
      console.log('Clicked System Overview button');
      break;
    }
  }

  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'modal-3d-model.png') });
  console.log('Captured modal-3d-model.png');

  await browser.close();
  console.log('Solution audit complete!');
}

run().catch(console.error);
