import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'scratch/scrollbar-audit';
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

  // 1. Home page external scrollbar
  await page.goto('http://localhost:5199/', { waitUntil: 'networkidle0' });
  await new Promise(res => setTimeout(res, 1000));
  await page.evaluate(() => window.scrollTo(0, 500));
  await new Promise(res => setTimeout(res, 500));
  await page.screenshot({ path: path.join(outDir, '01-home-scrollbar.png') });
  console.log('Saved 01-home-scrollbar.png');

  // 2. Dashboard Readings page with internal device selector scrollbar and sidebar scrollbar
  await page.goto('http://localhost:5199/dashboard/readings', { waitUntil: 'networkidle0' });
  await new Promise(res => setTimeout(res, 1000));
  await page.screenshot({ path: path.join(outDir, '02-readings-scrollbar.png') });
  console.log('Saved 02-readings-scrollbar.png');

  // 3. Dashboard Main with horizontal Alert Feed scrollbar
  await page.goto('http://localhost:5199/dashboard', { waitUntil: 'networkidle0' });
  await new Promise(res => setTimeout(res, 1000));
  await page.screenshot({ path: path.join(outDir, '03-dashboard-scrollbar.png') });
  console.log('Saved 03-dashboard-scrollbar.png');

  await browser.close();
  console.log('Scrollbar audit completed!');
}

run().catch(console.error);
