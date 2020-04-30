const express = require('express');
const routes = require('./routes');
const fs = require('fs');
const { media_dir_path } = require('./constants');
const app = express();


if (!(fs.existsSync(media_dir_path))){
    fs.mkdirSync(media_dir_path);
}


port = process.env.PORT || 8080;


app.use(express.json());
app.use(routes);
app.listen(port, '0.0.0.0');
