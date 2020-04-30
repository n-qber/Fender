const path = require('path');
const fs = require('fs');
const { sha256 } = require('../utils/hasheIT');
const { valuableNewID } = require('../utils/generateID');
const { recordRoute } = require('../utils/recordRoute');
const { media_dir_path, deleteTime } = require('../constants');

/*
The saving files will be organizated:
media/:id/file.ext
media/:id_stats.json -> {
    filename: "file.ext"
    twoFactor: false,
    twoFactor: "ead76b4d7bda9b8da7b4d98b5adbd69ad86ba"
}

*/


module.exports = {
    async get(req, res){
        //To get the file will first look if the file exists
        //then it will check the stats.json and compare twoFactor with stats.twoFactor
        //in case it will compare with the user's one if any

        const { fileID, twoFactor } = req.query;
        
        //check some things first
        if (fileID === undefined){
            recordRoute(req.ip, fileID, "get", "400");
            return res.status(400).json({message: "You are not searching. I mean, your fileID not there, send me it by /query?like=this"});
        }

        //look if the file exists
        const filePath = path.join(media_dir_path, fileID);
        if (fs.existsSync(filePath)){
            //exists
            //check the stats.json and compare twoFactor with stats.twoFactor
            const stats = require(filePath + "_stats.json");
            
            if (stats.twoFactor === sha256(twoFactor)){
                //Authorized
                var filename = fs.readdirSync(filePath)[0];
                recordRoute(req.ip, fileID, "get", "200");
                return res.download(path.join(filePath, filename));
            }else{
                recordRoute(req.ip, fileID, "get", "401");
                return res.status(401).json({message: "Unfortunately, your twoFactor is wrong or not received, so you won't be able to download this :sad_emoji:"});
            }


        }else{
            //doesn't exist
            recordRoute(req.ip, fileID, "get", "404");
            return res.status(404).json({message:"The file you searched for doesn't exist :woman_shrugging:"});
        }

    },
    async post(req, res){

        if (req.files === undefined){
            recordRoute(req.ip, undefined, "post", "400");
            return res.status(400).json({message: `There're no files in here, don't forget to send me with enctype="multipart/form-data"`})
        }

        files_ids = {}

        req.files.forEach(file => {

            var id = valuableNewID();

            files_ids[file.originalname] = id;

            fs.mkdir(path.join(media_dir_path, id), err => {
                if (err){
                    delete files_ids[file.originalname];
                }
                //Write the file.ext
                fs.writeFile(path.join(media_dir_path, id, file.originalname), file.buffer, err => {});
                //Write the stats.json
                fs.writeFile(path.join(media_dir_path, id + "_stats.json"), JSON.stringify({ twoFactor: sha256(req.body[file.fieldname] || "") }), err => {});
                recordRoute(req.ip, id, "post", "201");

                setTimeout(() => {
                    fs.rmdirSync(path.join(media_dir_path, id), {recursive: true});
                    fs.unlinkSync(path.join(media_dir_path, id + "_stats.json"));
                }, deleteTime);

            });

        });
        
        return res.status(201).json(files_ids);

    }
}