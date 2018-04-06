var WebSocket = require('ws');
var wsServer = new WebSocket.Server({ port: process.env.PORT || 80 });

wsServer.on('connection', function (ws) {

    // Whenever a `message` event occurs on the connection,
    // log it to the console and send it to every client.
    //
    ws.on('message', function (message) {
        console.log('Server received a message: "' + message + '"');

        ws.send('Now, I\'ll tell everyone! ٩(̾●̮̮̃̾•̃̾)۶');

        wsServer.clients.forEach(function (client) {

            // Note: A more robust approach would be to first verify the
            // connection to this client is in the `WebSocket.OPEN` state.
            // (Reference: https://github.com/websockets/ws#broadcast-example)
            //
            client.send('Server received a message: "' + message + '"');
        });
    })

    console.log('Client is connected.');
});

console.log('Server is listening.');

console.log('Contribute to this: https://github.com/jason-henriksen/react-json-grid');