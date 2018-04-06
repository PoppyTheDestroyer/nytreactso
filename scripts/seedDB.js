const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/reactarticlelist",
);

const articleSeed = [
    {
        headline: "Cheesy Stuff",
        url: "https://www.nytimes.com/2018/04/03/crosswords/daily-puzzle-2018-04-04.html",
        date: new Date(Date.now())
    },
    {
        headline: "‘Enough With That Desolate, Overheated Outback stuff.’",
        url: "https://www.nytimes.com/2018/02/14/world/australia/crocodile-dundee-sequel-barnaby-joyce-letter45.html",
        date: new Date(Date.now())
    }
]

db.Article
.remove({})
.then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
.catch(err => {
    console.error(err);
    process.exit(1);
});