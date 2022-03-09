
const DEV_PORT = 3000;

const app = require('express')();

const mongoose = require("mongoose");

const bodyParser = require('body-parser');
app.use( bodyParser.json() );   // to support JSON-encoded bodies
app.use( bodyParser.urlencoded( { // to support URL-encoded bodies
  extended : true,
} ) );

// SCHEMAS >>>

// <<< SCHEMAS

/*
function doDuringConnectedToMongoDB(innerFunct) {
  const options = {
    useNewUrlParser     : true,
  //useCreateIndex      : true,
    useUnifiedTopology  : true,
    useFindAndModify: false
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
*/
//
/*
function dataFromRequestToRecord(schema , dataInRequest) {
  let objRecord = {};
  for (let [k,v] of Object.entries(schema.obj)) {
    const sentVal = dataInRequest[k];
    if (typeof sentVal === 'undefined' && v.required) {
      throw 'bad';
    }
    objRecord[k] = dataInRequest[k];
  }
  return objRecord;
}
*/

const options = {
  useNewUrlParser     : true,
//useCreateIndex      : true,
  useUnifiedTopology  : true,
//useFindAndModify    : false,
};
const CONNECTION_URI = process.env.MONGODB_URI || `mongodb://localhost:${DEV_PORT}/dev`;
mongoose.connect(CONNECTION_URI, options);

// REST API ROUTER >>>

app.use(require("./routes/questionsRoutes.js"));

// <<< REST API ROUTER

module.exports = app;
