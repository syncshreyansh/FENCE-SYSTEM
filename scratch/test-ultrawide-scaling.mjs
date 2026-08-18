import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/large-screens';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const LARGE_VIEWPORTS = [
  { name: '1080p-1920x1080', width: 1920, height: 1080 },
  { name: '2k-2560x1440', width: 2560, height: 1440 },
  { name: 'ultrawide-3440x1440', width: 3440, height: 1440 },
  { name: '4k-3840x2160', width: 3840, height: 2160 },
];

async function testLargeScreens() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const vp of LARGE_VIEWPORTS) {
    console.log(`Testing large screen: ${vp.name}...`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${vp.name}-home.png`), fullPage: false });
    await page.close();
  }

  console.log('All large screens captured successfully!');
  await browser.close();
}

testLargeScreens().catch(console.error);
