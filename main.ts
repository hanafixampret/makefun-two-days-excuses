import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I estimated two hours with 99% confidence. The other 1% was right, and it has been gloating ever since.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const text = ENTRY.trim().replace(/\s+/g, " ");
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry length ${text.length} outside 1-200`);
}
if (text.includes("\n")) throw new Error("entry must be one line");
if (text.includes("  ")) throw new Error("entry must not contain double spaces");
if (text !== ENTRY.trim()) throw new Error("entry changed by normalization");
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, text, "utf8");
const back = readFileSync(target, "utf8");
if (back !== text) throw new Error("round-trip mismatch");
console.log(`wrote ${text.length} chars to ${target}`);
