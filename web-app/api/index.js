
const app = require('express')();
//const { v4 } = require('uuid');
/*
app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});
*/
module.exports = app;

//

const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};

const CONNECTION_STRING = "MONGODB_CONNECTION_STRING";

module.exports = () => {
  mongoose.connect(CONNECTION_STRING, options);

  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
  });

  mongoose.connection.on("error", err => {
    console.log(err);
  });
};
