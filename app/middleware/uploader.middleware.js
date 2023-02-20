//USING MULTER FOR IMAGE UPLOADING
const multer = require("multer");
const fs = require("fs");

//LOCAL STROAGE
const Storage = multer.diskStorage({

    destination: (req, res, next) => {
        let path = "./public/uploads";
        if(!fs.existsSync(path)){
            fs.mkdir(path, (err)=> {
                if(err){
                    throw err;
                }
            })
        }
        next(null, path);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
})

//UPLOADER
const uploader = multer({
    storage: Storage,
    limits: {
        fileSize: 3000000
    }
})

module.exports = uploader;