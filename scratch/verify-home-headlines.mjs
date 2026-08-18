import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'scratch/home-audit';
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

  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await new Promise(res => setTimeout(res, 1200));

  await page.screenshot({ path: path.join(outDir, '01-home-headlines.png') });
  console.log('Saved 01-home-headlines.png');

  // Click next arrow to show next article headline (e.g. Electrocution kills over 200 elephants...)
  const nextBtn = await page.$('button[aria-label="Next article"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(res => setTimeout(res, 600));
    await page.screenshot({ path: path.join(outDir, '02-home-headlines-next.png') });
    console.log('Saved 02-home-headlines-next.png');

    await nextBtn.click();
    await new Promise(res => setTimeout(res, 600));
    await page.screenshot({ path: path.join(outDir, '03-home-headlines-assam.png') });
    console.log('Saved 03-home-headlines-assam.png');
  }

  await browser.close();
  console.log('Headlines verification completed!');
}

run().catch(console.error);
