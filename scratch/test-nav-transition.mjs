import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FRAMES_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/nav-transition-frames';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function testNavTransition() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Click Hamburger button
  console.log('Clicking hamburger button...');
  await page.click('button[aria-label="Open menu"]');
  
  // Wait for menu open animation
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(FRAMES_DIR, '1-menu-opened.png') });
  console.log('Saved 1-menu-opened.png');

  // 2. Click "Problem" item
  console.log('Clicking Problem menu link...');
  const links = await page.$$('.fs-menu-link');
  if (links.length >= 2) {
    await links[1].click(); // Problem is index 1
  }

  // Capture closing sequence
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(FRAMES_DIR, '2-closing-stairs-early.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(FRAMES_DIR, '3-closing-stairs-mid.png') });

  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: path.join(FRAMES_DIR, '4-closed-on-problem-page.png') });

  console.log('Current URL:', page.url());
  console.log('Nav transition test finished!');
  await browser.close();
}

testNavTransition().catch(console.error);
