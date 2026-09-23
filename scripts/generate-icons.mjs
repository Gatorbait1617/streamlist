import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const outputDirectory = "public/icons";
await mkdir(outputDirectory, { recursive: true });

function artwork(size) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg"
         width="${size}" height="${size}"
         viewBox="0 0 512 512">
      <rect width="512" height="512" fill="#101827"/>
      <circle cx="256" cy="256" r="155" fill="#43D9BD"/>
      <path d="M220 170 L350 256 L220 342 Z" fill="#101827"/>
    </svg>
  `);
}

for (const size of [192, 512]) {
  await sharp(artwork(size))
    .png()
    .toFile(`${outputDirectory}/icon-${size}.png`);
}

await sharp(artwork(512))
  .png()
  .toFile(`${outputDirectory}/icon-maskable-512.png`);