import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FRAMES_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/fade-sequence-frames';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function captureFadeSequence() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // 1. 300ms: Middle card only
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'step1-middle-only.png') });

  // 2. 750ms: Middle + left/right pair
  await new Promise(r => setTimeout(r, 450));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'step2-inner-pair.png') });

  // 3. 1300ms: All 5 cards (outer pair completed)
  await new Promise(r => setTimeout(r, 550));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'step3-all-five.png') });

  console.log('Fade sequence captured!');
  await browser.close();
}

captureFadeSequence().catch(console.error);
