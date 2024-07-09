const express=require("express");
const handleGenerateNewUrl=require("../controllers/url");


const URL=require("../models/url");

var bodyParser = require('body-parser');

const router=express.Router();

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({extended : true}));

router.post("/",handleGenerateNewUrl);


module.exports=router;