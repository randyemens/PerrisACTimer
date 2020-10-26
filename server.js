const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.xml({
  xmlParseOptions: {
    normalize: true,
    explicitArray: false
  }
}));

var testObject = {}

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get('/api/flight-info', function(req, res, next) {
  res.send(testObject);
});
app.post('/api/receive-xml', function(req, res, next) {
  testObject = req.body;
  if (testObject.ManifestPost &&
      testObject.ManifestPost.Aircraft && 
      !Array.isArray(testObject.ManifestPost.Aircraft.LoadTimer)) {
      var makeArray = [];
      makeArray.push(testObject.ManifestPost.Aircraft.LoadTimer);
      testObject.ManifestPost.Aircraft.LoadTimer = makeArray;
  }
  io.emit('update-flights', testObject);
  res.send(testObject);
});
const port = process.env.PORT || 5000;
http.listen(port, () => console.log(`Server up and running on port ${port} ! Sockets ver.`));
