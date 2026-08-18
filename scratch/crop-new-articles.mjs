import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function cropPhoto() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Load img3.png into a page and extract its image dimensions
  const imgBase64 = fs.readFileSync('E:/Projects/fence-website/Smart-Controller/public/assets/new-articles/img3.png').toString('base64');
  
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:black;">
        <canvas id="c"></canvas>
        <img id="src" src="data:image/png;base64,${imgBase64}" />
      </body>
    </html>
  `;
  
  await page.setContent(html);
  
  const croppedDataUrl = await page.evaluate(() => {
    const img = document.getElementById('src');
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    
    // In img3.png:
    // Dimensions of the newspaper image:
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    
    // The photo in img3.png is situated in the right section:
    // Left boundary starts at roughly 37% of width (x = w * 0.37) to 98% (w * 0.98)
    // Top boundary starts at roughly 18% of height (y = h * 0.18) to 90% (h * 0.90)
    // Let's measure exact bounds:
    const cropX = Math.round(w * 0.370);
    const cropY = Math.round(h * 0.180);
    const cropW = Math.round(w * 0.608);
    const cropH = Math.round(h * 0.725);
    
    canvas.width = cropW;
    canvas.height = cropH;
    
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    return canvas.toDataURL('image/png');
  });

  const base64Data = croppedDataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync('E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/photo-kerala-student.png', base64Data, 'base64');
  console.log('Successfully saved photo-kerala-student.png');

  await browser.close();
}

cropPhoto().catch(console.error);
