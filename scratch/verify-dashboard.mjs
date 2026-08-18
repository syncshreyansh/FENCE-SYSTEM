import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'scratch/dashboard-audit';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { width: 1920, height: 1080, name: 'desktop-1920' },
  { width: 1440, height: 900, name: 'desktop-1440' },
  { width: 1280, height: 800, name: 'desktop-1280' },
  { width: 1024, height: 768, name: 'tablet-1024' },
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5199/dashboard', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500)); // wait for animations

    const filePath = path.join(outDir, `${vp.name}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    console.log(`Captured ${filePath}`);
    await page.close();
  }

  // Also capture readings page
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5199/dashboard/readings', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, 'readings-1920.png') });
  console.log('Captured readings-1920.png');
  await page.close();

  await browser.close();
  console.log('Audit complete!');
}

run().catch(console.error);
