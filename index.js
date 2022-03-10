const express = require('express');
const app = express();
const port = '4001';

const home_routes = require('./routes/home_route');
const con = require('./db/db_connection');
const user_auth = require('./routes/user_route');

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://saitheinhan:s@iH@n1541997@cluster0.mx25o.mongodb.net/Cluster0";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database access!");
//   db.close();
// });

con.connect((err) => {
    if(err){
      console.log('Error connecting to Db ' + err.message);
      return;
    }
    console.log('Connection established');

  });

app.use('/api',home_routes);
app.use('/api',user_auth);

// This should be the last route else any after it won't work
app.use("/", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(port, () => {
    console.log('SERVER Listens at :' + port);
})
