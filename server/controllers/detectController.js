const { detectCubeFromImage } = require("../utils/imageDetect");

async function detect(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    const face = await detectCubeFromImage(req.file.buffer);
    if (!face) {
      return res.status(400).json({ message: "Detection pipeline not implemented yet." });
    }
    return res.json({ face });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { detect };
