var WebSocket = require('ws');
var wsServer = new WebSocket.Server({ port: process.env.PORT || 80 });

var logMessage = '';

wsServer.on('connection', function (ws) {
    
    // Whenever a `message` event occurs on the connection, display it on the console.
    ws.on('message', function (message) {
        logMessage = 'Server received message: ' + message;
        console.log(logMessage);
        ws.send(logMessage);
    })

    logMessage = 'Client is connected.';
    console.log(logMessage);
    ws.send(logMessage);
});