"use strict";

const PORT          = 3000;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter"; //connect to database

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  } 
  // serves users to /tweets
  const DataHelpers = require("./lib/data-helpers.js")(db);
  // attaches datahelpers functions to /tweets
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  // routing /tweets to tweets.js
  app.use("/tweets", tweetsRoutes);
    
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
  });
