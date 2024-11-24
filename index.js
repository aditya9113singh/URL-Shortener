require("dotenv").config();

const express=require("express");
const urlRoute=require("./routes/url");
const URL=require("./models/url"); 
const { connectMongoDb }=require("./connectMongo");
const path=require("path");

const staticRouter=require("./routes/staticRouter");

const app=express();
const port=process.env.PORT||8002;

connectMongoDb(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to mongoDb");
})
.catch((err)=>{
    console.log("error");
});


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

//home page  (locals. wil store info of sever side)
app.use("/",staticRouter);

//2nd step-> it renders new url
app.use("/url",urlRoute);




//in case of not working remove this route
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitedHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});


  app.get("/url/analytics/:shortId",async(req,res)=>{
    const shortId=req.params.shortId;
    const data=await URL.findOne(
        {
        shortId
        }
    );

    return res.json({
        total_clicks:data.visitedHistory.length
    });

  })


  


app.listen(port,()=>console.log(`server started`));
