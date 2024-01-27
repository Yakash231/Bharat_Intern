const express=require("express");
const app=express();
const port=process.env.port || 3000;
const mongoose=require("mongoose");
const body=require("body-parser");

mongoose.connect(`mongodb://localhost:27017/Akash`).then(()=>
{
    console.log("MongoDB connected Successfully");
}).catch((error)=>{
    console.log("Failed");
})


const registrationSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const Registration=mongoose.model("Registration",registrationSchema);

app.get("/",(req,res)=>
{
   res.sendFile(__dirname+"/index.html");
});


app.post("/register" , async (req, res)=>
{try{
    const {name , email ,password}=req.body;
    

    const existing=await Registration.findOne({email : email})
    if(!existing)
    {
    const registrationdata= new Registration({
        name,
        email,
        password
    })
    await registrationdata.save();
   console.log("Success");
    //console.log(req.body)
    res.redirect("/success");
  }
 }
catch(error){
    console.log("error");
    res.redirect("/error");   

}
})

app.get("/success" , (req,res)=>
{
    res.sendFile(__dirname+"/succes.html");
})
app.get("/error" , (req,res)=>
{
    res.sendFile(__dirname+"/error.html");   
})



app.listen(port,()=>
{
    console.log(`Server Running At ${port}`);
})