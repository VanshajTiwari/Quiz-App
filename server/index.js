const Express=require('express');
const App=Express();
const fs=require('fs');
const cors=require('cors');
let questions=null;
fs.readFile('./data/questions.json',"utf-8",(err,data)=>questions=data);
questions=JSON.parse(questions);
console.log(questions);
App.use(cors());
App.get("/",(req,res)=>{
    res.status(200).json({status:"success",data:JSON.parse(questions)});
})
App.listen("8000",()=>console.log("Server OK!!"));