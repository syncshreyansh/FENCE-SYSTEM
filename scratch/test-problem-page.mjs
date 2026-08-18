import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/problem-test-frames';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testProblemPage() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  // 1. Desktop Test (1920x1080)
  const pageDesktop = await browser.newPage();
  await pageDesktop.setViewport({ width: 1920, height: 1080 });

  try {
    await pageDesktop.goto('http://localhost:5174/problem', { waitUntil: 'networkidle0' });
  } catch {
    await pageDesktop.goto('http://localhost:5173/problem', { waitUntil: 'networkidle0' });
  }

  // Settle time for video frame render and GSAP
  await new Promise(r => setTimeout(r, 1500));
  await pageDesktop.screenshot({ path: path.join(OUTPUT_DIR, 'problem-desktop-1920.png') });
  console.log('Saved problem-desktop-1920.png');

  // 2. Mobile Test (390x844)
  const pageMobile = await browser.newPage();
  await pageMobile.setViewport({ width: 390, height: 844 });
  try {
    await pageMobile.goto('http://localhost:5174/problem', { waitUntil: 'networkidle0' });
  } catch {
    await pageMobile.goto('http://localhost:5173/problem', { waitUntil: 'networkidle0' });
  }

  await new Promise(r => setTimeout(r, 1500));
  await pageMobile.screenshot({ path: path.join(OUTPUT_DIR, 'problem-mobile-390.png') });
  console.log('Saved problem-mobile-390.png');

  await browser.close();
}

testProblemPage().catch(console.error);
