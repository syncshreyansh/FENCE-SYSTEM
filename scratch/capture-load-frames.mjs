import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FRAMES_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/load-frames';

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function captureLoadAnimation() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // Capture at 100ms, 300ms, 600ms, 1000ms
  await page.screenshot({ path: path.join(FRAMES_DIR, 'frame-100ms.png') });
  
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'frame-300ms.png') });

  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'frame-600ms.png') });

  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(FRAMES_DIR, 'frame-1000ms.png') });

  console.log('Load animation frames captured!');
  await browser.close();
}

captureLoadAnimation().catch(console.error);
