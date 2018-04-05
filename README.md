# real-time-react
Real-Time React: An Introduction to Socket.io

# Running each app

## Development

### Windows

Navigate to the subfolder in which the app's `server.js` file resides, then run:

```batch
C:\AppFolder\>set PORT=3000&& npm start server.js
```
Or, if making frequent changes to the files in the app's file tree:

```batch
C:\AppFolder\>set PORT=3000&& npx nodemon start server.js
```
> The **absence of whitespace** between the environment variable definition and the pair of ampersands is required, since the environment variable gets set to everything between the equals sign and the ampersand. The **presence of whitespace** between the pair of ampersands and the subsequent command is optional.

Then, in a web browser, visit the app at http://localhost:3000/.

Terminate the app by pressing `Ctrl+C` and then casting [Meteo](http://finalfantasy.wikia.com/wiki/Meteor_(Final_Fantasy_IV)).

## Deployment

### Linux

On a Linux server with Node.js installed, you can run each app by doing the following.

Clone this repository:

```bash
$ git clone https://github.com/gitname/real-time-react.git
$ cd real-time-react/
```

Choose the app and install its dependencies:

```bash
$ cd http-polling-chat/
$ npm install
```

Run the app:

```bash
$ PORT=80 npm start server.js
```

Then, in a web browser, visit the app using the server's IP address or domain name.

Terminate the app by pressing `Ctrl+C`.

# Using each app

## ws-barebones

This app does not include a client.

While the server is running, issue the following instructions using the JavaScript console in Chrome Developer Tools, replacing `localhost` with the real hostname or IP address of the server:

```js
// Establish a WebSocket connection with the host.
var ws = new WebSocket('ws://localhost');

// Prepare to display incoming messages on the console.
ws.addEventListener('message', function (event) {
    console.log('Client received message: ' + event.data);
});
```

You can examine the state of the WebSocket connection by running the following (and comparing the output to [the list of readyState constants on the MDN website](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#Ready_state_constants)):

```js
// Read the state of the connection. Manually compare it to the readyState constants on the MDN website.
ws.readyState
```

You can send a message via the WebSocket connection by running the following:

```js
// Send a message via the WebSocket connection.
ws.send('Hello from the client.');
```

Terminate the app by pressing `Ctrl+C`.

### Aspects of Interest

1. When establishing the WebSocket connection, the client sends one HTTP request to the server. That HTTP request contains specific fields and values in its header. Those fields and values tell the server the client wants to follow the WebSocket protocol instead of the HTTP protocol. (That HTTP request can be seen in the `Network` tab of the Chrome Developer Tools, and in Wireshark).

# Evaluating each app

Consider:
* The number of HTTP requests it submits that don't "pay off"
    * Use Chrome Developer Tools > Network tab: bottom status bar (e.g. "123 requests")
* The size of each HTTP request it submits / response it receives
    * Use Chrome Developer Tools > Network tab: bottom status bar (e.g. "456 KB transferred")
* How many times it establishes a TCP connection (considering the overhead involved in doing so)
* The latency (i.e. stimulus-response delay); e.g. the delay between a message being created and that message being displayed
* The complexity of the implementation

# Miscellaneous Notes

## Using Chrome

### Developer Tools

#### Pending requests

On the `Network` tab, notice the `Status` of requests. Requests for which a response hasn't arrived yet have a status of `pending`. More details are available at `chrome://net-internals/#events`.

#### WebSocket frames

On the `Network` tab, click on an HTTP request that was used to change to the WebSocket protocol, then select the `Frames` tab. That tab lists all the WebSocket frames that have been sent or received via _that_ WebSocket connection.

## Using Wireshark

### Filtering displayed traffic

#### Examples

* Display only traffic that is both HTTP and either to or from 123.123.123.123

    ```
    http and ip.addr == 123.123.123.123
    ```

More examples are available on the [Wireshark wiki](https://wiki.wireshark.org/DisplayFilters#Examples).

### WinPcap driver

#### Starting the WinPcap driver service

When running Wireshark as a non-Administrator in Windows, you may have to manually start the WinPcap driver service in order for any network interfaces to appear in Wireshark.

To start it, open a command prompt as an administrative user (i.e. right-click the `cmd.exe` icon and select "Run as Administrator") and issue the following command:

```bat
C:\> net start npf

The NetGroup Packet Filter Driver service was started successfully.
```

#### Stopping the WinPcap driver service

Exiting Wireshark does not automatically stop the driver service.

To stop it, open a command prompt as an administrative user and issue the following command:

```bat
C:\> net stop npf

The NetGroup Packet Filter Driver service was stopped successfully.
```

Reference: https://wiki.wireshark.org/CaptureSetup/CapturePrivileges

## RFCs

* [RFC 1945: Hypertext Transfer Protocol -- HTTP/1.0](https://tools.ietf.org/html/rfc1945)
* [RFC 2616: Hypertext Transfer Protocol -- HTTP/1.1](https://tools.ietf.org/html/rfc2616)
* [RFC 6466: The WebSocket Protocol](https://tools.ietf.org/html/rfc6455)

## Packages/Repositories

* [ws: a Node.js WebSocket library](https://github.com/websockets/ws)