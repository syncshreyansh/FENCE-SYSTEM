import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function cropPhotos() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // Map of image files and the photo bounding box within each image
  // In the 1920x1080 broadsheet templates:
  // img1 (The Telegraph): photo is on right from ~37.5% x, 20% y to 89.5% x, 87% y
  // img2 (The Hindu): photo is on right from ~38% x, 20.8% y to 89% x, 88.5% y
  // img3 (Times of India): illustration is on right from ~37.3% x, 19.3% y to 89% x, 87% y
  // img4 (Assam Tribune): photo is on right from ~36.5% x, 21% y to 89.5% x, 77.5% y
  // img5 (Down to Earth): photo is on right from ~36.5% x, 19.2% y to 89% x, 84.3% y

  const crops = [
    {
      src: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/img1.png',
      out: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/photo1.png',
      clip: { left: 0.375, top: 0.202, width: 0.520, height: 0.667 }
    },
    {
      src: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/img2.png',
      out: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/photo2.png',
      clip: { left: 0.380, top: 0.208, width: 0.510, height: 0.676 }
    },
    {
      src: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/img3.png',
      out: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/photo3.png',
      clip: { left: 0.373, top: 0.193, width: 0.518, height: 0.678 }
    },
    {
      src: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/img4.png',
      out: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/photo4.png',
      clip: { left: 0.365, top: 0.210, width: 0.530, height: 0.566 }
    },
    {
      src: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/img5.png',
      out: 'E:/Projects/fence-website/Smart-Controller/public/assets/hero-images/photo5.png',
      clip: { left: 0.365, top: 0.192, width: 0.525, height: 0.650 }
    },
  ];

  for (const item of crops) {
    const fileUrl = 'file:///' + item.src.replace(/\\/g, '/');
    await page.goto(fileUrl);
    
    // Get actual image dimensions
    const dims = await page.evaluate(() => {
      const img = document.querySelector('img');
      return { width: img.naturalWidth, height: img.naturalHeight };
    });

    const clipRect = {
      x: Math.round(dims.width * item.clip.left),
      y: Math.round(dims.height * item.clip.top),
      width: Math.round(dims.width * item.clip.width),
      height: Math.round(dims.height * item.clip.height),
    };

    console.log(`Cropping ${path.basename(item.src)}:`, clipRect);

    // Create a canvas with the cropped region
    const base64 = await page.evaluate((c) => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = c.width;
      canvas.height = c.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, c.x, c.y, c.width, c.height, 0, 0, c.width, c.height);
      return canvas.toDataURL('image/png').split(',')[1];
    }, clipRect);

    fs.writeFileSync(item.out, Buffer.from(base64, 'base64'));
    console.log(`Saved ${path.basename(item.out)}`);
  }

  await browser.close();
}

cropPhotos().catch(console.error);
