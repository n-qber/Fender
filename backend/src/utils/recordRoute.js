const path = require('path');
const fs = require('fs');
const { media_dir_path } = require('../constants');

module.exports = {
    async recordRoute(ip, id, method, end){

        //Write to logs: 192.168.0.1 <- a1b2c3 as GET
        //192.168.0.1 -> a1b2c3

        separator = '->';

        if (method == "get"){
            separator = '<-';
        }

        fs.appendFile(path.join(media_dir_path, "logs.txt"), `${ip} ${separator} ${id} ${end}\n`, () => {});

    }
}