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

// Returns the current UTC time as a string designed to precede a log message.
var getPrefix = function () {
    var timestamp = (new Date())
        .toISOString()
        .substr(-13)
        .substr(0, 12);
    return '[' + timestamp + '] ';
};

// Store the message in the database and send the queued responses.
var storeMessage = function (message) {
    messages.push(message);
    sendQueuedResponses();
};

// Create a response queue.
var responses = [];

// Removes each response from the queue and sends it with all messages.
var sendQueuedResponses = function () {
    var i = 0;
    while (responses.length > 0) {
        console.log(getPrefix() + 'Sending queued response (' + ++i + ')');
        var res = responses.shift();
        res.send(messages);
    }
}

// Respond with all messages.
app.get('/join', function (req, res) {
    console.log(getPrefix() + 'GET /join');

    res.send(messages);
});

// Queue the response associated with this request.
app.get('/messages', function (req, res) {
    console.log(getPrefix() + 'GET /messages');

    responses.push(res);
    console.log(getPrefix() + 'Number of queued responses:', responses.length);
});

// Insert message into the database (if valid)  and respond with all messages.
app.post('/messages/create', function (req, res) {
    console.log(getPrefix() + 'POST /messages/create', req.body);

    var message = req.body.message;
    if (validateMessage(message)) {
        storeMessage(message);
    }

    res.send(messages);
});

// Configure the app to listen on some TCP port (number 80 by default).
var port = process.env.PORT || 80;
app.listen(port, function () {
    console.log(getPrefix() + 'The app is listening on port ' + port + '.');
});
