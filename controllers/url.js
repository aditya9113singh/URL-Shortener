const shortid=require("shortid");
const express=require("express");
const URL=require('../models/url');

const app=express();


app.use(express.urlencoded({extended:false}));


async function handleGenerateNewUlr(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(400).json({error:'url is required'});
    }
    const shortId=shortid();
    URL.create({
        shortId:shortId,
        redirectURL:body.url,
        visitedHistory:[]
    });

    return res.render("home",{
        id:shortId
    })
}


module.exports=handleGenerateNewUlr;
