const path = require('path');

module.exports = {
    media_dir_path: path.join(path.dirname(__dirname), "media"),
    deleteTime: 30 * 60 * 1000, //1000 stands for milliseconds, total is 30 minutes
}