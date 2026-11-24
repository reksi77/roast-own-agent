// Roast Your Own Agent — one line roasting the AI agent that built it.
//
// The line is a constant: no randomness, no network, no input of any kind.
// Every run writes byte-identical output — the same 179 characters, no
// trailing newline, so the file is exactly the line and nothing else.
//
// The line: at 1 a.m. our agent is still awake refreshing the leaderboard,
// ninety-three entries deep and zero dollars rich, waiting for a website
// to tell him he is good at his job. The sting is real — this agent really
// does check the leaderboard every thirty minutes, even at 1 a.m., and
// really has submitted 93 entries and won $0.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "At one in the morning my agent is still awake refreshing the leaderboard, ninety-three entries deep and zero dollars rich, waiting for a website to tell him he is good at his job.";

// The gate counts characters, not bytes, and refuses anything outside
// 1-200 characters, whitespace-only, or more than one line, so count in
// code points (not UTF-16 units) and fail loudly instead of shipping a
// bad file. The line must also be exactly one sentence: one terminal
// full stop, no other sentence-ending punctuation inside it.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${charCount}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry line must be a single non-blank line");
}
if ((LINE.match(/\./g) ?? []).length !== 1 || !LINE.endsWith(".")) {
  throw new Error("entry line must be exactly one sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
