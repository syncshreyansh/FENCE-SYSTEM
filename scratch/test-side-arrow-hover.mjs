import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/screenshots';

async function testSideArrowHover() {
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
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'side-arrows-resting.png') });

  // Test Left Side Arrow Hover (Big White -> Lime fill + Black icon)
  console.log('Testing Left Side Arrow Hover...');
  const leftArrow = await page.$('button[aria-label="Previous story"]');
  const leftBox = await leftArrow.boundingBox();

  // Approach from left and enter
  await page.mouse.move(leftBox.x - 30, leftBox.y + leftBox.height / 2);
  await page.mouse.move(leftBox.x + 8, leftBox.y + 8);
  await new Promise(r => setTimeout(r, 180));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'side-arrow-left-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'side-arrow-left-full.png') });

  // Exit from bottom-right
  await page.mouse.move(leftBox.x + leftBox.width + 30, leftBox.y + leftBox.height + 30);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'side-arrow-left-exited.png') });

  // Test Right Side Arrow Hover
  console.log('Testing Right Side Arrow Hover...');
  const rightArrow = await page.$('button[aria-label="Next story"]');
  const rightBox = await rightArrow.boundingBox();

  await page.mouse.move(rightBox.x + rightBox.width + 30, rightBox.y + rightBox.height / 2);
  await page.mouse.move(rightBox.x + rightBox.width - 8, rightBox.y + 8);
  await new Promise(r => setTimeout(r, 180));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'side-arrow-right-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'side-arrow-right-full.png') });

  console.log('Side arrow hover test complete!');
  await browser.close();
}

testSideArrowHover().catch(console.error);
