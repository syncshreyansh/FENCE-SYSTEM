import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FRAMES_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/load-frames';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function captureTypewriterSequence() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // 200ms: IN THE visible, HEADLINES starting
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'tw-200ms.png') });

  // 550ms: HEADLI typed with cursor
  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'tw-550ms.png') });

  // 950ms: HEADLINES fully typed
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'tw-950ms.png') });

  // 1500ms: Highlighter circle actively drawing around HEADLINES
  await new Promise(r => setTimeout(r, 550));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'tw-1500ms.png') });

  console.log('Typewriter sequence captured!');
  await browser.close();
}

captureTypewriterSequence().catch(console.error);
