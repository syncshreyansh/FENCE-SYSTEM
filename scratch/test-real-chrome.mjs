import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function extractVideoFrame() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false, // open real chrome window briefly to decode video
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5174/problem', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'scratch/problem-test-frames/chrome-real-window.png' });
  console.log('Captured chrome-real-window.png');
  await browser.close();
}

extractVideoFrame().catch(console.error);
