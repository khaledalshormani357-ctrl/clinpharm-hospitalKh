import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const combined = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(combined), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function generateSolidTealPng(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rowLen = size * 4 + 1;
  const raw = Buffer.alloc(rowLen * size);
  const pad = Math.floor(size * 0.22);
  const barThickness = Math.max(4, Math.floor(size * 0.14));
  const center = Math.floor(size / 2);
  const halfBar = Math.floor(barThickness / 2);

  for (let y = 0; y < size; y++) {
    const rowOffset = y * rowLen;
    raw[rowOffset] = 0; // filter type 0
    for (let x = 0; x < size; x++) {
      const px = rowOffset + 1 + x * 4;
      const inVert =
        x >= center - halfBar &&
        x <= center + halfBar &&
        y >= pad &&
        y <= size - pad;
      const inHoriz =
        y >= center - halfBar &&
        y <= center + halfBar &&
        x >= pad &&
        x <= size - pad;

      if (inVert || inHoriz) {
        raw[px] = 240;
        raw[px + 1] = 253;
        raw[px + 2] = 250;
        raw[px + 3] = 255;
      } else {
        raw[px] = 15;
        raw[px + 1] = 118;
        raw[px + 2] = 110;
        raw[px + 3] = 255;
      }
    }
  }

  const idat = zlib.deflateSync(raw);
  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idat),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

function isValidPng(filePath) {
  if (!fs.existsSync(filePath)) return false;
  try {
    const buf = fs.readFileSync(filePath);
    if (buf.length < 32) return false;
    const pngSig = [137, 80, 78, 71, 13, 10, 26, 10];
    return pngSig.every((b, idx) => buf[idx] === b);
  } catch {
    return false;
  }
}

const publicDir = path.resolve(process.cwd(), 'public');
fs.mkdirSync(publicDir, { recursive: true });

const icons = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'pwa-192x192.png', size: 192 },
  { file: 'pwa-512x512.png', size: 512 },
  { file: 'pwa-maskable-512x512.png', size: 512 },
];

for (const { file, size } of icons) {
  const target = path.join(publicDir, file);
  if (!isValidPng(target)) {
    fs.writeFileSync(target, generateSolidTealPng(size));
    console.log(`[ensure-build-assets] Generated valid binary PNG: public/${file}`);
  }
}
