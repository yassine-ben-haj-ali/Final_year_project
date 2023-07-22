const route=require('express').Router();
const {userConversations}=require('../controllers/Conversation');
const {verifyToken}=require('../middleware/Authorization');



route.get("/",verifyToken,userConversations);


module.exports=route;
