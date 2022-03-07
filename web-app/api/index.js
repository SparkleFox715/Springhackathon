
const DEV_PORT = 3000;

const app = require('express')();
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
app.use( bodyParser.json() );   // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended : true
})); 

// SCHEMAS >>>

const QuestionsSchema = new mongoose.Schema(
	{
		slug : { type : String, required : true , unique : true},
		type : { type : String, enum : ['MCQ','FRQ'], required : true },
    group : { type : String, required : true},
    textContent : { type : String, required : true},
    answers : [
      {
        textContent : { type : String, required : true },
        isCorrect : { type : Boolean, required : true },
      }
    ],
	},
//	{ collection: 'questions' }
);
QuestionsSchema.index({ slug : 1 }, { unique : true });
const QuestionsModel = mongoose.model('Questions', QuestionsSchema);

// <<< SCHEMAS

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

// REST API ROUTER >>>

app.post('/api/question', doDuringConnectedToMongoDB((connection, req, res) => {
  try {
    const questionRecord = new QuestionsModel(req.body);
    const dbRes = await questionRecord.save();
  } catch(error) {
    console.error(error)
    // handle the error
  }
}));

app.get('/api/question', doDuringConnectedToMongoDB((connection, req, res) => {
  res.status(200).end(`GET a question ${connection}`);
}));

// <<< REST API ROUTER

module.exports = app;
