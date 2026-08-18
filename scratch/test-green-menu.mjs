import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FRAMES_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/green-menu-frames';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function testGreenMenu() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // Open Menu
  await page.click('button[aria-label="Open menu"]');
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: path.join(FRAMES_DIR, 'green-nav-menu.png') });
  console.log('Saved green-nav-menu.png');

  await browser.close();
}

testGreenMenu().catch(console.error);
