const fs = require("fs");
module.exports = async function (req, res, next) {
  try {
    const removeTmp = (path) => {
      fs.unlink(path, (err) => {
        if (err) throw err;
      });
    };

    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: "No files selected" });
    }
    const files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "image/png"
      ) {
        removeTmp(file.tempFilePath);
        res.status(400).json({ message: "Unsupported format" });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        res.status(400).json({ message: "File size is too large" });
      }
    });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
