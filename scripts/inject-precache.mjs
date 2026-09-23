import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const dist = path.resolve("dist");

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      results.push(...(await listFiles(absolute)));
    } else {
      results.push(absolute);
    }
  }

  return results;
}

const files = await listFiles(dist);

const urls = files
  .filter((file) => /\.(html|js|css|png|svg|webmanifest)$/.test(file))
  .map((file) => `/${path.relative(dist, file).split(path.sep).join("/")}`)
  .map((url) => (url === "/index.html" ? "/" : url))
  .sort();

const workerPath = path.join(dist, "sw.js");
const worker = await readFile(workerPath, "utf8");

if (!worker.includes("__PRECACHE_ASSETS__")) {
  throw new Error("Service worker precache placeholder was not found.");
}

await writeFile(
  workerPath,
  worker.replace("__PRECACHE_ASSETS__", JSON.stringify(urls))
);