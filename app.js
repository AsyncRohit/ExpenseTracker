const express=require('express');
const app=express();
const userModel=require("./models/user")

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index");
})

app.post('/add',async (req,res)=>{
    var {amount,item} = req.body;
    const user = await userModel.create({
        amount,
        item,
    })
    const main= await userModel.find({amount: {$gt:0}})
    let total=0;
    main.forEach(user=>{
        total+=user.amount
    })
    console.log(total);
    const allitems= await userModel.find({});

res.render("main",{total,user});
})

app.get('/expensetracker', async(req,res)=>{
    const items=await userModel.find();
    res.render("expense",{items});
})
app.get('/clear', async(req,res)=>{
    const items=await userModel.deleteMany({});
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("running ");
})