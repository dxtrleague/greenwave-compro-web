const sharp = require("sharp");
const path = require("path");

(async () => {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const candidates = ["gre.jpg", "gre.png", "gre.webp", "gre.svg"];
    let inputName = null;
    for (const c of candidates) {
      const p = path.join(publicDir, c);
      if (require("fs").existsSync(p)) {
        inputName = c;
        break;
      }
    }
    if (!inputName) {
      throw new Error(
        "No gre.* input file found in public/. Expected gre.jpg/png/webp/svg",
      );
    }

    const input = path.join(publicDir, inputName);
    const output = path.join(publicDir, "gre-clean.jpg");

    const img = sharp(input);
    const meta = await img.metadata();
    console.log("Input file:", inputName, "metadata:", meta);

    // Amount of pixels to remove from the left. Adjust if needed.
    const leftCrop = 60;

    const cropWidth = Math.max((meta.width || 0) - leftCrop, 1);
    await img
      .extract({
        left: leftCrop,
        top: 0,
        width: cropWidth,
        height: meta.height,
      })
      .jpeg({ quality: 90 })
      .toFile(output);

    console.log("Cropped image saved to", output);
  } catch (err) {
    console.error("Failed to process image:", err);
    process.exit(1);
  }
})();
