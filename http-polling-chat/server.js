var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// Configure the app to retrieve static files from a folder named `public`.
// (Reference: https://expressjs.com/en/starter/static-files.html)
//
app.use(express.static('public'));

// Configure the app to populate `req.body` with the body of the incoming request, parsed as JSON.
// (Reference: https://github.com/expressjs/body-parser#bodyparserjsonoptions)
//
app.use(bodyParser.json());

// Create a message database (an array).
var messages = [];

app.get('/messages', function (req, res) {
    console.log('GET /messages');

    // Respond with all messages in the database.
    res.send(messages);
});

app.post('/messages/create', function (req, res) {
    console.log('POST /messages/create', req.body);

    // Insert the message into the database if the message string is non-empty.
    if (req.body.message.trim().length > 0) {
        messages.push(req.body.message);
    }

    // Respond with all messages in the database.
    res.send(messages);
});

// Configure the app to listen on TCP port `3000`.
app.listen(3000);
console.log('The app is listening on port 3000.');