import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function extractIframeHtml() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('https://stitch.withgoogle.com/projects/15184282972719118442', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  await new Promise(r => setTimeout(r, 6000));

  // Find the iframe frame
  const frames = page.frames();
  console.log(`Found ${frames.length} frames`);

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const url = frame.url();
    console.log(`Frame ${i}: ${url}`);
    try {
      const html = await frame.content();
      if (html.length > 500) {
        fs.writeFileSync(`scratch/frame-${i}.html`, html);
        console.log(`Saved scratch/frame-${i}.html (${html.length} chars)`);
      }
    } catch (e) {
      console.log(`Could not get content of frame ${i}:`, e.message);
    }
  }

  await browser.close();
}

extractIframeHtml().catch(console.error);
