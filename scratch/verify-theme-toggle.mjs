import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'scratch/theme-audit';
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

  // 1. Load dashboard (default dark mode)
  await page.goto('http://localhost:5199/dashboard', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '01-dashboard-dark.png') });
  console.log('Captured 01-dashboard-dark.png');

  // 2. Click theme toggle switch in sidebar
  const toggleBtn = await page.$('div[aria-label="Switch to Light Mode"]');
  if (toggleBtn) {
    await toggleBtn.click();
    console.log('Clicked theme toggle switch in sidebar');
  } else {
    console.error('Theme toggle switch not found!');
  }

  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '02-dashboard-light.png') });
  console.log('Captured 02-dashboard-light.png');

  // 3. Navigate to Alerts page in light mode
  await page.goto('http://localhost:5199/dashboard/alerts', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '03-alerts-light.png') });
  console.log('Captured 03-alerts-light.png');

  // 4. Navigate to Readings page in light mode
  await page.goto('http://localhost:5199/dashboard/readings', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '04-readings-light.png') });
  console.log('Captured 04-readings-light.png');

  // 5. Navigate to Violations page in light mode
  await page.goto('http://localhost:5199/dashboard/reports/violations', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '05-violations-light.png') });
  console.log('Captured 05-violations-light.png');

  // 6. Click theme toggle to switch back to Dark Mode
  const toggleBackBtn = await page.$('div[aria-label="Switch to Dark Mode"]');
  if (toggleBackBtn) {
    await toggleBackBtn.click();
    console.log('Clicked theme toggle to switch back to Dark Mode');
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, '06-violations-dark.png') });
  console.log('Captured 06-violations-dark.png');

  await browser.close();
  console.log('Theme toggle audit completed successfully!');
}

run().catch(console.error);
