const express = require('express');
const multer = require('multer');
const fileController = require('./controllers/FileController');
const upload = multer();
const routes = express.Router();


routes.get('/', (req, res) => {
    res.end(`<html><form action="http://localhost:8080/file" method="post" enctype="multipart/form-data"><input type="file" name="file1"/><input name="file1"/><br/><input type="file" name="file2"/><input name="file2"/><br/><input type="file" name="file3"/><input name="file3"/><br/><button type="submit">Submit</button></form></html>`)
})


//File
routes.get('/file', fileController.get); //(ID[, 2factor])
routes.post('/file', upload.any(), fileController.post); //(File[, 2factor])

routes.get('/xss', fileController.xss); //(ID[, 2factor])

module.exports = routes;
