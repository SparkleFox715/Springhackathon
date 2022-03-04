
const DEV_PORT = 3000;

const app = require('express')();
const mongoose = require("mongoose");

function doDuringConnectedToMongoDB(innerFunct) {

  const options = {
    useNewUrlParser     : true,
  //useCreateIndex      : true,
    useUnifiedTopology  : true,
  };
  const CONNECTION_URI = process.env.MONGODB_URI || `mongodb://localhost:${DEV_PORT}/dev`;

  return (...args) => {
  
    mongoose.connect(CONNECTION_URI, options);

    const connection = mongoose.connection;

    connection.once("open", () => {
      console.log("MongoDB database connection established successfully.");
    });

    mongoose.connection.on("error", err => {
      console.log(err);
    });

    return innerFunct(connection, ...args);
  }
}

app.get('/api/question', doDuringConnectedToMongoDB((connection, req, res) => {
  res.status(200).end(`GET a question ${connection}`);
}));

module.exports = app;
