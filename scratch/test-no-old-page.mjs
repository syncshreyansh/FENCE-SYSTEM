import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FRAMES_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/no-old-page-frames';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function testNoOldPageLeak() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Open Menu
  await page.click('button[aria-label="Open menu"]');
  await new Promise(r => setTimeout(r, 1000));

  // 2. Click "Problem"
  const links = await page.$$('.fs-menu-link');
  if (links.length >= 2) {
    await links[1].click();
  }

  // 3. Capture mid-stairs retraction (around 350ms): MUST BE PURE BLACK behind stairs, NOT Home page!
  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'mid-stairs-pure-black-behind.png') });

  // 4. Capture after route change: Problem page fading in
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'problem-page-fading-in.png') });

  // 5. Complete
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'problem-page-complete.png') });

  console.log('No old page leak test finished!');
  await browser.close();
}

testNoOldPageLeak().catch(console.error);
