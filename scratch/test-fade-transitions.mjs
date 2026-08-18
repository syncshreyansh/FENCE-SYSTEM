import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FRAMES_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/fade-test-frames';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function testFadeTransitions() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(FRAMES_DIR, '0-initial-home.png') });

  // 1. Click Hamburger: Test fade to black on open
  console.log('Clicking hamburger...');
  await page.click('button[aria-label="Open menu"]');
  
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(FRAMES_DIR, '1-page-fading-to-black.png') });

  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(FRAMES_DIR, '2-menu-fully-open.png') });

  // 2. Click "Problem": Test stairs wipe and fade in from black
  console.log('Clicking Problem link...');
  const links = await page.$$('.fs-menu-link');
  if (links.length >= 2) {
    await links[1].click();
  }

  // Mid stairs closing
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(FRAMES_DIR, '3-stairs-closing.png') });

  // Right when new page appears from black
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: path.join(FRAMES_DIR, '4-problem-fading-in.png') });

  // Fully faded in
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(FRAMES_DIR, '5-problem-fully-visible.png') });

  console.log('Fade transitions tested successfully!');
  await browser.close();
}

testFadeTransitions().catch(console.error);
