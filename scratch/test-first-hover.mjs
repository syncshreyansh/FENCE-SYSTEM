import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/screenshots';

async function testFirstHover() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  
  // Fresh page load - NO prior clicks
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. FIRST HOVER ON HAMBURGER (Never clicked)
  console.log('Testing FIRST HOVER on Hamburger (no clicks)...');
  const hamburger = await page.$('button[aria-label="Open menu"]');
  const hamBox = await hamburger.boundingBox();
  
  // Approach from left and enter center
  await page.mouse.move(hamBox.x - 30, hamBox.y + hamBox.height / 2);
  await page.mouse.move(hamBox.x + hamBox.width / 2, hamBox.y + hamBox.height / 2);
  await new Promise(r => setTimeout(r, 180));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'first-hover-hamburger-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'first-hover-hamburger-full.png') });

  // Exit from top-right corner
  await page.mouse.move(hamBox.x + hamBox.width + 20, hamBox.y - 20);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'first-hover-hamburger-exited.png') });

  // 2. FIRST HOVER ON LEFT ARROW (Never clicked)
  console.log('Testing FIRST HOVER on Left Arrow (no clicks)...');
  const leftArrow = await page.$('button[aria-label="Previous story"]');
  const leftBox = await leftArrow.boundingBox();

  // Approach from bottom and enter at bottom of circle
  await page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y + leftBox.height + 30);
  await page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y + leftBox.height - 3);
  await new Promise(r => setTimeout(r, 180));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'first-hover-leftarrow-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'first-hover-leftarrow-full.png') });

  // Exit from top of circle
  await page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y - 30);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'first-hover-leftarrow-exited.png') });

  // 3. FIRST HOVER ON RIGHT ARROW (Never clicked)
  console.log('Testing FIRST HOVER on Right Arrow (no clicks)...');
  const rightArrow = await page.$('button[aria-label="Next story"]');
  const rightBox = await rightArrow.boundingBox();

  // Approach from right and enter at right of circle
  await page.mouse.move(rightBox.x + rightBox.width + 30, rightBox.y + rightBox.height / 2);
  await page.mouse.move(rightBox.x + rightBox.width - 3, rightBox.y + rightBox.height / 2);
  await new Promise(r => setTimeout(r, 180));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'first-hover-rightarrow-mid.png') });

  await new Promise(r => setTimeout(r, 350));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'first-hover-rightarrow-full.png') });

  console.log('First hover test complete!');
  await browser.close();
}

testFirstHover().catch(console.error);
