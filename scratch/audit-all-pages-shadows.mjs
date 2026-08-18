import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'scratch/shadow-audit';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const routes = [
  { name: '01-dashboard', url: 'http://localhost:5199/dashboard' },
  { name: '02-readings', url: 'http://localhost:5199/dashboard/readings' },
  { name: '03-alerts', url: 'http://localhost:5199/dashboard/alerts' },
  { name: '04-violations', url: 'http://localhost:5199/dashboard/reports/violations' },
  { name: '05-summary', url: 'http://localhost:5199/dashboard/reports/summary' },
  { name: '06-device-map', url: 'http://localhost:5199/dashboard/device-map' },
  { name: '07-settings', url: 'http://localhost:5199/dashboard/settings' },
  { name: '08-team', url: 'http://localhost:5199/dashboard/team' },
  { name: '09-help', url: 'http://localhost:5199/dashboard/help' },
  { name: '10-feedback', url: 'http://localhost:5199/dashboard/feedback' }
];

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // 1. Dark Mode Audit
  console.log('--- Auditing Dark Mode ---');
  for (const r of routes) {
    await page.goto(r.url, { waitUntil: 'networkidle0' });
    await new Promise(res => setTimeout(res, 800));
    await page.screenshot({ path: path.join(outDir, `${r.name}-dark.png`) });
    console.log(`Saved ${r.name}-dark.png`);
  }

  // Switch to Light Mode
  await page.goto('http://localhost:5199/dashboard', { waitUntil: 'networkidle0' });
  const toggleBtn = await page.$('div[aria-label="Switch to Light Mode"]');
  if (toggleBtn) {
    await toggleBtn.click();
    console.log('Switched to Light Mode');
  }
  await new Promise(res => setTimeout(res, 800));

  // 2. Light Mode Audit
  console.log('--- Auditing Light Mode ---');
  for (const r of routes) {
    await page.goto(r.url, { waitUntil: 'networkidle0' });
    await new Promise(res => setTimeout(res, 800));
    await page.screenshot({ path: path.join(outDir, `${r.name}-light.png`) });
    console.log(`Saved ${r.name}-light.png`);
  }

  await browser.close();
  console.log('Full pages audit completed successfully!');
}

run().catch(console.error);
