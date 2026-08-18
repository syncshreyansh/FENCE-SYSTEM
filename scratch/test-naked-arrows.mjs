import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/screenshots';

async function testNakedArrows() {
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
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'naked-arrows-resting.png') });

  // Hover on Left Naked Arrow (midway fill)
  console.log('Hovering on Left Naked Arrow...');
  const leftBtn = await page.$('button[aria-label="Previous story"]');
  const leftBox = await leftBtn.boundingBox();

  await page.mouse.move(leftBox.x - 40, leftBox.y + leftBox.height / 2);
  await page.mouse.move(leftBox.x + 10, leftBox.y + 10);
  await new Promise(r => setTimeout(r, 180));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'naked-arrow-left-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'naked-arrow-left-full.png') });

  // Hover on Right Naked Arrow
  console.log('Hovering on Right Naked Arrow...');
  const rightBtn = await page.$('button[aria-label="Next story"]');
  const rightBox = await rightBtn.boundingBox();

  await page.mouse.move(rightBox.x + rightBox.width + 40, rightBox.y + rightBox.height / 2);
  await page.mouse.move(rightBox.x + rightBox.width - 10, rightBox.y + rightBox.height - 10);
  await new Promise(r => setTimeout(r, 180));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'naked-arrow-right-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'naked-arrow-right-full.png') });

  console.log('Naked arrows test complete!');
  await browser.close();
}

testNakedArrows().catch(console.error);
