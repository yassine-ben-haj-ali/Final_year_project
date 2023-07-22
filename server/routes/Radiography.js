const route=require('express').Router();
const { addRadiography, deleteRadiography, getRadiography } = require('../controllers/Radiography');
const {verifyToken}=require('../middleware/Authorization');
const { upload } = require('../middleware/Upload');



route.post("/:patientId",verifyToken,upload.single("file"),addRadiography);
route.delete("/:radiographyId",verifyToken,deleteRadiography);
route.get("/:patientId",verifyToken,getRadiography);
module.exports=route;