"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  } 

  console.log(`Connected to mongodb: ${MONGODB_URI}`);


  module.exports = {
      getTweets: function getTweets(callback) {
        db.collection("tweets").find().toArray(callback);
      }
  }
  

//   getTweets((err, tweets) => {
//     if (err) throw err;
//     console.log(tweets)
    // for (let tweet of tweets) {
        // console.log("Logging each tweet:");
        // tweetArr.push(tweet);
        // console.log(tweet);
    // }
    // console.log(tweetArr);

// });
});
// }}