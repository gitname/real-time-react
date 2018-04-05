var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// Configure the app to retrieve static files from a folder named `public`.
// (Reference: https://expressjs.com/en/starter/static-files.html)
//
app.use(express.static('public'));

// Configure the app to populate `req.body` with a JSON object created by parsing the body of the request.
// (Reference: https://github.com/expressjs/body-parser#bodyparserjsonoptions)
//
app.use(bodyParser.json());

// Create a message database (an array).
var messages = [];

// Returns true if the message contains more than just whitespace.
var validateMessage = function (message) {
    return message.trim().length > 0;
};

app.get('/messages', function (req, res) {
    console.log('GET /messages');

    // Respond with all messages in the database.
    res.send(messages);
});

app.post('/messages/create', function (req, res) {
    console.log('POST /messages/create', req.body);

    // Insert the message into the database if the message string is valid.
    var message = req.body.message;
    if (validateMessage(message)) {
        messages.push(message);
    }

    // Respond with all messages in the database.
    res.send(messages);
});

// Configure the app to listen on some TCP port (number 80 by default).
//
var port = process.env.PORT || 80;
app.listen(port, function () {
    console.log('The app is listening on port ' + port + '.');
});
