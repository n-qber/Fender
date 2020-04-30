const { media_dir_path } = require('../constants');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

module.exports = {
    valuableNewID: () => {

        var size = 4
        var notCertainID = crypto.randomBytes(size).toString('hex');

        while (fs.existsSync(path.join(media_dir_path, notCertainID))){
            size += .2
            notCertainID = crypto.randomBytes(size | 0).toString('hex');
        }

        const valuableID = notCertainID;

        return valuableID;    
    }
}