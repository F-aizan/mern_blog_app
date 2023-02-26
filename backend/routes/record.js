const express = require("express");
const recordRoutes = express.Router();
const user = require("../models/User");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

//jwt variables
const jwt = require("jsonwebtoken");
const secret = "dsfdsfsfdfafdfdfho8gyg0yyfhyds";
//hashing variables
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

recordRoutes.route("/register").post(async function (req, res) {
  await dbo.getDb();
  const {email,password} = req.body;
  try{
  const userdoc = await user.create({
    email:email,
    password:bcrypt.hashSync(password,salt)
  }) 
  }catch(err) {
    res.status(400).json(err);
  }
});

recordRoutes.route("/login").post(async function (req, res) {
  await dbo.getDb();
  let {email,password} = req.body;
  const userdoc = await user.findOne({email});
  const check = bcrypt.compareSync(password,userdoc.password);
  if(check){
    jwt.sign({email,id:userdoc._id},secret,{},(err,token) => {
      if(err) throw err;
      res.cookie('token',token).json({
        id:userdoc._id,
        email
      })
    })
  }
  else{                                   
    res.status(400).json('invalid credentials');
  }
});

recordRoutes.route("/profile").get((req,res) => {
  res.json(req.cookies);
})

recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id:  ObjectId(req.params.id) };
 db_connect
   .collection("records")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 

recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});

recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});

recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;