import path from "path";
import { downloadWhisperModel, installWhisperCpp, transcribe, toCaptions } from "@remotion/install-whisper-cpp";
import fs from "fs";

const to = path.join("/tmp", "whisper.cpp");

console.log("Installing whisper.cpp...");
await installWhisperCpp({ to, version: "1.5.5" });

console.log("Downloading model...");
await downloadWhisperModel({ model: "small.en", folder: to });

console.log("Transcribing...");
const whisperCppOutput = await transcribe({
  model: "small.en",
  whisperPath: to,
  whisperCppVersion: "1.5.5",
  inputPath: "/tmp/v3-audio.wav",
  tokenLevelTimestamps: true,
});

const { captions } = toCaptions({ whisperCppOutput });
fs.writeFileSync("/dev-server/remotion/public/captions-v3.json", JSON.stringify(captions, null, 2));
console.log(`Done! ${captions.length} captions written.`);
