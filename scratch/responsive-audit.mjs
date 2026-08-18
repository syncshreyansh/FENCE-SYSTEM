import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const RESPONSIVE_DIR = 'E:/Projects/fence-website/Smart-Controller/scratch/responsive-audit';

if (!fs.existsSync(RESPONSIVE_DIR)) {
  fs.mkdirSync(RESPONSIVE_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: '01-phone-small-375x667', width: 375, height: 667 },
  { name: '02-phone-iphone14-390x844', width: 390, height: 844 },
  { name: '03-phone-large-430x932', width: 430, height: 932 },
  { name: '04-tablet-portrait-768x1024', width: 768, height: 1024 },
  { name: '05-tablet-landscape-1024x768', width: 1024, height: 768 },
  { name: '06-laptop-13in-1280x800', width: 1280, height: 800 },
  { name: '07-laptop-14in-1366x768', width: 1366, height: 768 },
  { name: '08-macbook-1440x900', width: 1440, height: 900 },
  { name: '09-laptop-15in-1536x864', width: 1536, height: 864 },
  { name: '10-desktop-1080p-1920x1080', width: 1920, height: 1080 },
  { name: '11-monitor-2k-2560x1440', width: 2560, height: 1440 },
];

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'problem', path: '/problem' },
  { name: 'solution', path: '/solution' },
  { name: 'dashboard', path: '/dashboard' },
];

async function runResponsiveAudit() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const vp of VIEWPORTS) {
    console.log(`Auditing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    for (const p of PAGES) {
      await page.goto(`http://localhost:5173${p.path}`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 600));
      const filename = `${vp.name}-${p.name}.png`;
      await page.screenshot({ path: path.join(RESPONSIVE_DIR, filename), fullPage: false });
    }
    await page.close();
  }

  console.log('Responsive audit screenshots captured!');
  await browser.close();
}

runResponsiveAudit().catch(console.error);
