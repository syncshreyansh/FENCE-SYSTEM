import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/screenshots';

async function testSolidArrows() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Resting state
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'solid-arrows-resting.png') });

  // 1. Enter Left Arrow from Top Tip
  console.log('Hovering Left Arrow from Top...');
  const leftBtn = await page.$('button[aria-label="Previous story"]');
  const leftBox = await leftBtn.boundingBox();

  await page.mouse.move(leftBox.x - 30, leftBox.y - 30);
  await page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y + 10);
  await new Promise(r => setTimeout(r, 160));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'solid-arrow-left-top-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'solid-arrow-left-full.png') });

  // Exit from Bottom
  await page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y + leftBox.height + 40);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'solid-arrow-left-exited.png') });

  // 2. Enter Right Arrow from Right Point
  console.log('Hovering Right Arrow from Right Point...');
  const rightBtn = await page.$('button[aria-label="Next story"]');
  const rightBox = await rightBtn.boundingBox();

  await page.mouse.move(rightBox.x + rightBox.width + 40, rightBox.y + rightBox.height / 2);
  await page.mouse.move(rightBox.x + rightBox.width - 5, rightBox.y + rightBox.height / 2);
  await new Promise(r => setTimeout(r, 160));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'solid-arrow-right-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'solid-arrow-right-full.png') });

  console.log('Solid arrows test complete!');
  await browser.close();
}

testSolidArrows().catch(console.error);
