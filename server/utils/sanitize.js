function sanitizeString(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim();
}

module.exports = { sanitizeString };
