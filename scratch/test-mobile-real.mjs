import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkMobileReal() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });

  await page.goto('http://localhost:5174/problem', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'scratch/problem-test-frames/mobile-real.png' });
  console.log('Saved mobile-real.png');
  await browser.close();
}

checkMobileReal().catch(console.error);
