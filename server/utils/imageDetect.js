const COLOR_REFERENCE = {
  U: [245, 245, 245],
  R: [30, 30, 200],
  F: [40, 170, 40],
  D: [40, 220, 220],
  L: [0, 140, 255],
  B: [200, 80, 30]
};

const GRID_SIZE = 3;

function bgrToLab(cv, bgr) {
  const mat = new cv.Mat([[bgr]], cv.CV_8UC3);
  const lab = mat.cvtColor(cv.COLOR_BGR2Lab);
  const [l, a, b] = lab.at(0, 0);
  return [l, a, b];
}

function distanceLab(labA, labB) {
  const dl = labA[0] - labB[0];
  const da = labA[1] - labB[1];
  const db = labA[2] - labB[2];
  return Math.sqrt(dl * dl + da * da + db * db);
}

function nearestColor(cv, bgr) {
  const lab = bgrToLab(cv, bgr);
  let best = "U";
  let bestDist = Infinity;
  for (const [key, ref] of Object.entries(COLOR_REFERENCE)) {
    const dist = distanceLab(lab, bgrToLab(cv, ref));
    if (dist < bestDist) {
      bestDist = dist;
      best = key;
    }
  }
  return best;
}

function cropCenterSquare(cv, mat) {
  const size = Math.min(mat.rows, mat.cols);
  const x = Math.floor((mat.cols - size) / 2);
  const y = Math.floor((mat.rows - size) / 2);
  return mat.getRegion(new cv.Rect(x, y, size, size));
}

async function detectCubeFromImage(buffer) {
  try {
    const cv = require("opencv4nodejs");
    const mat = cv.imdecode(buffer);
    if (!mat || mat.empty) {
      throw new Error("Failed to decode image");
    }

    const square = cropCenterSquare(cv, mat);
    const resized = square.resize(300, 300);
    const blurred = resized.gaussianBlur(new cv.Size(5, 5), 0);
    const cellSize = Math.floor(blurred.rows / GRID_SIZE);
    const face = [];

    for (let row = 0; row < GRID_SIZE; row += 1) {
      for (let col = 0; col < GRID_SIZE; col += 1) {
        const centerX = col * cellSize + Math.floor(cellSize / 2);
        const centerY = row * cellSize + Math.floor(cellSize / 2);
        const patchSize = Math.floor(cellSize * 0.4);
        const patchX = Math.max(centerX - Math.floor(patchSize / 2), 0);
        const patchY = Math.max(centerY - Math.floor(patchSize / 2), 0);
        const patch = blurred.getRegion(
          new cv.Rect(patchX, patchY, patchSize, patchSize)
        );
        const mean = patch.mean();
        const bgr = [mean[0], mean[1], mean[2]];
        face.push(nearestColor(cv, bgr));
      }
    }

    return face;
  } catch (error) {
    throw new Error(
      "OpenCV is not configured. Install opencv4nodejs and system OpenCV libraries to enable detection."
    );
  }
}

module.exports = { detectCubeFromImage };
