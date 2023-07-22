const route=require('express').Router();
const{updateAllergy,deleteAllergy, addAllergy, getAllergies}=require('../controllers/Allergy')
const {verifyToken}=require('../middleware/Authorization')



route.post("/:patientId",verifyToken,addAllergy);
route.delete("/:allergyId",verifyToken,deleteAllergy);
route.put("/:allergyId",verifyToken,updateAllergy);
route.get("/:patientId",verifyToken,getAllergies);
module.exports=route;