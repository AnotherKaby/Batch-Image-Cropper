const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const inputFolder = './imgInput';
const outputFolder = './imgOutput';
const index = 0;

// Mengecek apakah folder imgOutput sudah ada atau belum
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Membaca daftar file di dalam folder imgInput
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  // Membuat list berisi nama file dan resolusi gambar
  const imagesInfo = [];

  files.forEach((file) => {
    const filePath = path.join(inputFolder, file);

    Jimp.read(filePath, (err, image) => {
      if (err) throw err;

      const imageInfo = {
        name: file,
        width: image.bitmap.width,
        height: image.bitmap.height,
      };

      imagesInfo.push(imageInfo);

      // Crop gambar
      const leftCrop = 247; //dalam pixel
      const rightCrop = 1149; //dalam pixel
      const topCrop = 44; //dalam pixel
      const bottomCrop = 44; //dalam pixel

      const croppedImage = image.crop(leftCrop, topCrop, rightCrop - leftCrop, image.bitmap.height - topCrop - bottomCrop); // Crop bagian kiri, kanan, atas, dan bawah

      // Simpan hasil crop
      const outputPath = path.join(outputFolder, file);
      croppedImage.write(outputPath);
      imagesInfo.forEach((info) => {
        console.log(`Gambar (${file}) berhasil di-crop`);
      });
    });
  });

  console.log('Proses Crop Gambar:');
});
