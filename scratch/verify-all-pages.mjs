import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'scratch/dashboard-audit-all';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const routes = [
    { url: 'http://localhost:5199/dashboard', name: 'main-dashboard' },
    { url: 'http://localhost:5199/dashboard/alerts', name: 'alerts-page' },
    { url: 'http://localhost:5199/dashboard/reports/violations', name: 'violations-page' },
    { url: 'http://localhost:5199/dashboard/reports/summary', name: 'summary-page' },
    { url: 'http://localhost:5199/dashboard/readings', name: 'readings-page' },
    { url: 'http://localhost:5199/dashboard/team', name: 'team-page' },
    { url: 'http://localhost:5199/dashboard/settings', name: 'settings-page' },
    { url: 'http://localhost:5199/dashboard/help', name: 'help-page' },
    { url: 'http://localhost:5199/dashboard/feedback', name: 'feedback-page' },
    { url: 'http://localhost:5199/dashboard/device-map', name: 'devicemap-page' }
  ];

  for (const r of routes) {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      await page.goto(r.url, { waitUntil: 'networkidle0', timeout: 15000 });
      await new Promise(res => setTimeout(res, 800));
      await page.screenshot({ path: path.join(outDir, `${r.name}.png`), fullPage: false });
      console.log(`Captured ${r.name}.png`);
      await page.close();
    } catch (e) {
      console.error(`Error capturing ${r.name}:`, e.message);
    }
  }

  await browser.close();
  console.log('All routes captured successfully!');
}

run().catch(console.error);
