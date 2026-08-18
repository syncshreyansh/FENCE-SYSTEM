import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runVisualTests() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  fs.mkdirSync('scratch/screenshots', { recursive: true });

  const page = await browser.newPage();

  // Test 1: Desktop Home / Headlines Section
  console.log('Testing Desktop Home...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500)); // allow GSAP animations & circle loop
  await page.screenshot({ path: 'scratch/screenshots/01-desktop-home-headlines.png' });

  // Test 2: Click next button on carousel
  console.log('Testing Carousel Next button...');
  const nextBtn = await page.$('button[aria-label="Next story"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'scratch/screenshots/02-desktop-carousel-next.png' });
  }

  // Test 3: Click a side card in the carousel
  console.log('Testing clicking side card...');
  const cards = await page.$$('.newspaper-card-wrapper');
  if (cards && cards.length > 0) {
    await cards[0].click();
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: 'scratch/screenshots/03-desktop-card-clicked.png' });
  }

  // Test 4: Open FullScreenNav
  console.log('Testing FullScreenNav opening...');
  const menuBtn = await page.$('button[aria-label="Open menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'scratch/screenshots/04-desktop-nav-open.png' });

    // Test 5: Hover over Problem link
    const links = await page.$$('.fs-menu-link');
    if (links && links[1]) {
      await links[1].hover();
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({ path: 'scratch/screenshots/05-nav-hover-problem.png' });
      // Click Problem link
      await links[1].click();
      await new Promise(r => setTimeout(r, 1200));
      await page.screenshot({ path: 'scratch/screenshots/06-navigated-to-problem.png' });
    }
  }

  // Test 6: Navigate to Solution
  console.log('Testing Solution page...');
  await page.goto('http://localhost:5173/solution', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/screenshots/07-solution-page.png' });

  // Test 7: Tablet Viewport on Home
  console.log('Testing Tablet Home...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scratch/screenshots/08-tablet-home.png' });

  // Test 8: Mobile Viewport on Home
  console.log('Testing Mobile Home...');
  await page.setViewport({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'scratch/screenshots/09-mobile-home.png' });

  console.log('All visual tests captured successfully!');
  await browser.close();
}

runVisualTests().catch(console.error);
