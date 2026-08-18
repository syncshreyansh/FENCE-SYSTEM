import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkVideoDirectly() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5174/assets/videos/problem-demo.mp4');
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'scratch/problem-test-frames/direct-video.png' });
  console.log('Saved direct-video.png');
  await browser.close();
}

checkVideoDirectly().catch(console.error);
