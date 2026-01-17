const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public/Images');

async function optimizeImages(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            await optimizeImages(filePath);
        } else {
            const ext = path.extname(file).toLowerCase();
            const basename = path.basename(file, ext);

            // Skip already optimized or small files
            if (file.includes('optimized')) continue;

            if (ext === '.png') {
                console.log(`Converting ${file} to WebP...`);
                await sharp(filePath)
                    .webp({ quality: 75 }) // Removed nearLossless to ensure file size reduction
                    .toFile(path.join(dir, `${basename}.webp`));

                // Optional: Delete original if you want to replace completely
                // fs.unlinkSync(filePath); 

            } else if (ext === '.jpg' || ext === '.jpeg') {
                console.log(`Compressing ${file}...`);
                // Compress JPEG
                // If it's a huge 360 image (checking by name/size assumption for now or just generic rule), resize if insane
                const image = sharp(filePath);
                const metadata = await image.metadata();

                if (metadata.width > 8192) {
                    console.log(`Resizing huge image ${file} (width: ${metadata.width}) -> 8192px`);
                    await image.resize({ width: 8192, withoutEnlargement: true })
                        .jpeg({ quality: 80, mozjpeg: true })
                        .toFile(path.join(dir, `${basename}_optimized.jpg`));

                    // Rename optimised to original to Replace (be careful here, maybe better to verify first)
                    fs.renameSync(path.join(dir, `${basename}_optimized.jpg`), filePath);
                } else {
                    // Just compress
                    await image
                        .jpeg({ quality: 75, mozjpeg: true })
                        .toFile(path.join(dir, `${basename}_tmp.jpg`));
                    fs.renameSync(path.join(dir, `${basename}_tmp.jpg`), filePath);
                }
            }
        }
    }
}

// Start
console.log('Starting image optimization...');
optimizeImages(publicDir).then(() => {
    console.log('Image optimization complete!');
}).catch(err => {
    console.error('Error optimizing images:', err);
});
