import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'scratch/horizontal-alerts-audit';
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

  // Dark mode
  await page.goto('http://localhost:5199/dashboard', { waitUntil: 'networkidle0' });
  await new Promise(res => setTimeout(res, 800));
  await page.screenshot({ path: path.join(outDir, 'dashboard-dark-horizontal.png') });
  console.log('Saved dashboard-dark-horizontal.png');

  // Switch to Light mode
  const toggleBtn = await page.$('div[aria-label="Switch to Light Mode"]');
  if (toggleBtn) {
    await toggleBtn.click();
    console.log('Switched to Light Mode');
    await new Promise(res => setTimeout(res, 800));
    await page.screenshot({ path: path.join(outDir, 'dashboard-light-horizontal.png') });
    console.log('Saved dashboard-light-horizontal.png');
  }

  await browser.close();
  console.log('Verification completed!');
}

run().catch(console.error);
