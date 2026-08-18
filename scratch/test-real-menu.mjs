import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testRealMenu() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1500));

  // Click menu button
  const btn = await page.$('button[aria-label="Open menu"]');
  if (btn) {
    await btn.click();
  }

  // Wait for menu animation to complete
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: 'scratch/green-menu-frames/green-menu-real.png' });
  console.log('Saved green-menu-real.png');

  await browser.close();
}

testRealMenu().catch(console.error);
