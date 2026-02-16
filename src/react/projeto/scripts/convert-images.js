import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.resolve(__dirname, '../src/assets');
const BACKUP_DIR = path.resolve(__dirname, '../src/assets_backup');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (filePath === BACKUP_DIR) continue; // Skip backup dir if inside (it shouldn't be based on path.resolve)
      await processDirectory(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const relativePath = path.relative(ASSETS_DIR, filePath);
        const backupPath = path.join(BACKUP_DIR, relativePath);
        const backupDir = path.dirname(backupPath);

        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }

        // Convert to WebP
        const webpPath = filePath.replace(ext, '.webp');
        
        console.log(`Converting: ${relativePath} -> .webp`);
        
        try {
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);
            
          // Move original to backup
          fs.renameSync(filePath, backupPath);
          console.log(`Moved original to: ${path.relative(process.cwd(), backupPath)}`);
          
        } catch (error) {
          console.error(`Error converting ${filePath}:`, error);
        }
      }
    }
  }
}

console.log(`Starting conversion from ${ASSETS_DIR}...`);
processDirectory(ASSETS_DIR)
  .then(() => console.log('Conversion complete!'))
  .catch(err => console.error('Fatal error:', err));
