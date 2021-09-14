const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

const PUBLISH_KEY = "pk_test_51JUoELSAzgTkqjlg7vLN2soBEsqAvubr69w9nyoOomtsxr2FBYrRvKyGYkvDYx0Z5qdwCcf42z0QqGn3SEHIBnzn002mDvJgwF";
const SECRATE_KEY = "sk_test_51JUoELSAzgTkqjlgycLfIWltTRyqRz110eyJCbbAYSnbG2pWmiMWoHxrmp6Lx3z55YXc6RhQdarAIpII2FXN8mT300QiJiqsdH";

const app = express();

const stripe = require("stripe")(SECRATE_KEY);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get('/',(req,res)=>{
    res.render('Home',{
        key: PUBLISH_KEY
    })
});

app.post("/payment",(req,res)=>{
    console.log(req.body);
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name:"Aniket Kesharwani",
        address:{
            line1: " 2nd Floor Triveni Kunj Kalyan",
            postal_code : "421306",
            city: "Mumbai",
            state: "Maharashtra",
            country: "India"
        }
    })
    .then((customer)=>{
        console.log(customer);
        return stripe.charges.create({
            amount:10000,
            description:"Ancient Artifact",
            currency:"INR",
            customer:customer.id
        })
    })
    .then((charge)=>{
        console.log(charge);
        res.send("Success")
    })
    .catch((err)=>{
        console.log(err);
        res.send("Error"+err)
    })
});

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
});