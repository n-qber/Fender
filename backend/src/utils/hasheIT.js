const crypto = require('crypto');

module.exports = {
    sha256: (factor) => {
        return crypto.createHash('sha256').update(factor || "").digest('hex');
    }
}