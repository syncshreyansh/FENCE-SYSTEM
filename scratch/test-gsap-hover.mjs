import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/screenshots';

async function testGsapHover() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Test Hamburger Hover (Entering from top-left corner of button)
  console.log('Testing Hamburger enter...');
  const hamburger = await page.$('button[aria-label="Open menu"]');
  const hamBox = await hamburger.boundingBox();
  
  // Move to outside
  await page.mouse.move(hamBox.x - 20, hamBox.y + hamBox.height / 2);
  // Enter at top-left corner
  await page.mouse.move(hamBox.x + 5, hamBox.y + 5);
  await new Promise(r => setTimeout(r, 200)); // mid-fill
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-hamburger-entering.png') });

  await new Promise(r => setTimeout(r, 400)); // fully filled
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-hamburger-filled.png') });

  // Exit from bottom-right corner
  console.log('Testing Hamburger exit...');
  await page.mouse.move(hamBox.x + hamBox.width - 2, hamBox.y + hamBox.height - 2);
  await page.mouse.move(hamBox.x + hamBox.width + 30, hamBox.y + hamBox.height + 30);
  await new Promise(r => setTimeout(r, 150)); // mid-exit
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-hamburger-exiting.png') });

  await new Promise(r => setTimeout(r, 400)); // fully exited
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-hamburger-restored.png') });

  // 2. Test Left Arrow Button Hover (Entering from right edge)
  console.log('Testing Left Arrow enter...');
  const leftArrow = await page.$('button[aria-label="Previous story"]');
  const leftBox = await leftArrow.boundingBox();

  await page.mouse.move(leftBox.x + leftBox.width + 20, leftBox.y + leftBox.height / 2);
  await page.mouse.move(leftBox.x + leftBox.width - 2, leftBox.y + leftBox.height / 2);
  await new Promise(r => setTimeout(r, 200)); // mid-fill
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-leftarrow-entering.png') });

  await new Promise(r => setTimeout(r, 400)); // fully filled
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-leftarrow-filled.png') });

  // Exit from top edge
  console.log('Testing Left Arrow exit...');
  await page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y + 2);
  await page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y - 30);
  await new Promise(r => setTimeout(r, 150)); // mid-exit
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-leftarrow-exiting.png') });

  // 3. Test Right Arrow Button Hover (Entering from center-left)
  console.log('Testing Right Arrow enter...');
  const rightArrow = await page.$('button[aria-label="Next story"]');
  const rightBox = await rightArrow.boundingBox();

  await page.mouse.move(rightBox.x - 20, rightBox.y + rightBox.height / 2);
  await page.mouse.move(rightBox.x + 4, rightBox.y + rightBox.height / 2);
  await new Promise(r => setTimeout(r, 200)); // mid-fill
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-rightarrow-entering.png') });

  await new Promise(r => setTimeout(r, 400)); // fully filled
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'hover-rightarrow-filled.png') });

  console.log('All GSAP hover tests finished!');
  await browser.close();
}

testGsapHover().catch(console.error);
