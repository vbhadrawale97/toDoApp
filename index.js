var express = require("express");
var cors = require("cors");
var { MongoClient } = require("mongodb");
const multer = require("multer");
var app = express();
app.use(cors());
var port = 5000;

async function run() {
  var CONNECTION_STRING = require("./mongodbURI.js");
  console.log(CONNECTION_STRING);
  var DATABASE_NAME = "toDoApp";

  var client = new MongoClient(CONNECTION_STRING);
  await client.connect();
  const database = client.db(DATABASE_NAME);

  console.log("MongoDB connection successful!");

  app.listen(port, () => {
    console.log(`Server Started on ${port}`);
  });

  app.get("/get-tasks", (request, response) => {
    database
      .collection("tasks")
      .find({})
      .toArray((error, result) => {
        response.send(result);
      });
  });

  app.post("/add-task", multer().none(), (request, response) => {
    database.collection("tasks").count({}, function (error, noOfDocs) {
      database.collection("tasks").insertOne({
        id: (noOfDocs + 1).toString(),
        taskTitle: request.body.taskTitle,
      });
      response.json("Task added successfully!");
    });
  });

  app.delete("/delete-task", multer().none(), (request, response) => {
    database.collection("tasks").deleteOne({
      id: request.query.id,
    });
    response.json("Task deleted successfully!");
  });
}

run().catch(console.dir);
