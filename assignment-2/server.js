const HTTP_PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
var path= require("path");


app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "/src/index.html"));
});


app.listen(HTTP_PORT, () => console.log(`Example app listening on port ${HTTP_PORT}!`))