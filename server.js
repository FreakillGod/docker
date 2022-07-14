const express = require("express");
const path = require("path");
const fs = require("fs");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/get-profile", function (req, res) {
  const respose = res;

  MongoClient.connect(
    "mongodb://admin:password@localhost:27017",
    function (err, client) {
      if (err) throw err;

      const db = client.db("user-account");
      const query = { userid: 1 };
      db.collection("users").findOne(query, (err, res) => {
        if (err) throw err;

        client.close();
        respose.send(res);
      });
    }
  );
});

app.post("/update-profile", (req, res) => {
  const userObj = req.body;
  const respose = res;

  console.log("connecting to the db..");

  MongoClient.connect(
    "mongodb://admin:password@localhost:27017",
    function (err, client) {
      if (err) throw err;

      const db = client.db("user-account");
      userObj["userid"] = 1;
      const query = { userid: 1 };

      const newValues = { $set: userObj };

      console.log("succesfully coonected to teh euser-acount db");

      db.collection("users").updateOne(
        query,
        newValues,
        { upsert: true },
        (err, res) => {
          if (err) throw err;
          console.log("updated to teh euser-acount db");

          client.close();
          respose.send(res);
        }
      );
    }
  );
});

app.get('/profile-picture',(req,res)=>{
    let img= fs.readFileSync('pro1.jpg');
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(img, 'binary');
});

app.listen(3000, () => {
  console.log("app is listiong on port 3000");
});
