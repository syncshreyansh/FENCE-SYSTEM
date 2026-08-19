import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryToScan = 'public/assets';

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const tempPath = filePath + '.tmp';
  
  try {
    const statsBefore = fs.statSync(filePath);
    
    // Only compress png, jpg, jpeg, webp
    if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      
      let sharpInstance = sharp(filePath);
      
      if (ext === '.png') {
        // Aggressive compression for PNG using palette and lower quality
        sharpInstance = sharpInstance.png({ quality: 50, compressionLevel: 9, effort: 10, palette: true });
      } else if (ext === '.jpg' || ext === '.jpeg') {
        // Aggressive compression for JPEG
        sharpInstance = sharpInstance.jpeg({ quality: 50, mozjpeg: true });
      } else if (ext === '.webp') {
        sharpInstance = sharpInstance.webp({ quality: 50 });
      }

      await sharpInstance.toFile(tempPath);
      
      const statsAfter = fs.statSync(tempPath);
      
      // If compressed is smaller, replace the original
      if (statsAfter.size < statsBefore.size) {
        fs.renameSync(tempPath, filePath);
        const savedMb = ((statsBefore.size - statsAfter.size) / (1024 * 1024)).toFixed(2);
        console.log(`[COMPRESSED] ${filePath} - Saved ${savedMb} MB`);
      } else {
        // Otherwise, keep the original
        fs.unlinkSync(tempPath);
        console.log(`[SKIPPED] ${filePath} - Already optimized`);
      }
    }
  } catch (err) {
    console.error(`[ERROR] Failed to compress ${filePath}: ${err.message}`);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

async function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else {
      await compressImage(fullPath);
    }
  }
}

async function main() {
  console.log('Starting image compression...');
  await walkDir(directoryToScan);
  console.log('Compression complete!');
}

main();
