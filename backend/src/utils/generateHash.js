const crypto = require("crypto");

const generateHash = (data) => {
  const content = JSON.stringify(data);

  return crypto.createHash("sha256").update(content).digest("hex");
};

module.exports = generateHash;