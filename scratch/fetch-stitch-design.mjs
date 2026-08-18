import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function fetchStitch() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to Stitch project...');
  try {
    await page.goto('https://stitch.withgoogle.com/projects/15184282972719118442', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
  } catch (e) {
    console.log('Navigation warning:', e.message);
  }

  await new Promise(r => setTimeout(r, 5000));

  fs.mkdirSync('scratch', { recursive: true });
  await page.screenshot({ path: 'scratch/stitch-page.png' });
  console.log('Saved scratch/stitch-page.png');

  const content = await page.content();
  fs.writeFileSync('scratch/stitch-rendered.html', content);

  // Check iframe or screens
  const iframes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('iframe')).map(f => f.src);
  });
  console.log('Iframes:', iframes);

  await browser.close();
}

fetchStitch().catch(console.error);
