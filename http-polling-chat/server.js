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

// Returns the current time (in UTC) as a string.
var getTimestampPrefix = function () {
    var timestamp = (new Date())
        .toISOString()
        .substr(-13)
        .substr(0, 12);
    return '[' + timestamp + '] ';
};

app.get('/messages', function (req, res) {
    console.log(getTimestampPrefix() + 'GET /messages');

    // Respond with all messages in the database.
    res.send(messages);
});

app.post('/messages/create', function (req, res) {
    console.log(getTimestampPrefix() + 'POST /messages/create', req.body);

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
    console.log(getTimestampPrefix() + 'The app is listening on port ' + port + '.');
});
