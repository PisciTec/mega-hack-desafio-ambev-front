const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static("MegaHack"));
// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/MegaHack/home.html'));
    //__dirname : It will resolve to your project folder.
  });
const server = http.createServer(app);
server.listen(PORT);
console.debug('Server listening on port ' + port);