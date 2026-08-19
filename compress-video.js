import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

// Set the path to the ffmpeg binary provided by the installer
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const videoPath = path.resolve('public/assets/videos/problem-demo.mp4');
const tempPath = path.resolve('public/assets/videos/problem-demo.tmp.mp4');

console.log('Starting video compression...');
const statsBefore = fs.statSync(videoPath);
const beforeSizeMb = (statsBefore.size / (1024 * 1024)).toFixed(2);
console.log(`Original size: ${beforeSizeMb} MB`);

ffmpeg(videoPath)
  .outputOptions([
    '-vcodec libx264',
    '-crf 28',         // Constant Rate Factor (28 is a good balance between compression and quality)
    '-preset medium',  // Encoding speed/compression ratio tradeoff
    '-b:a 128k'        // Audio bitrate
  ])
  .output(tempPath)
  .on('end', () => {
    const statsAfter = fs.statSync(tempPath);
    const afterSizeMb = (statsAfter.size / (1024 * 1024)).toFixed(2);
    console.log(`Compressed size: ${afterSizeMb} MB`);
    
    if (statsAfter.size < statsBefore.size) {
      fs.renameSync(tempPath, videoPath);
      const savedMb = ((statsBefore.size - statsAfter.size) / (1024 * 1024)).toFixed(2);
      console.log(`[SUCCESS] Saved ${savedMb} MB!`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`[SKIPPED] The compressed video was actually larger. Kept the original.`);
    }
  })
  .on('error', (err) => {
    console.error(`[ERROR] Compression failed:`, err);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  })
  .run();
