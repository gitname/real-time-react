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

While the server is running, issue the following instructions using the JavaScript console in Chrome Developer Tools:

```js
// Establish a WebSocket connection with the host.
var ws = new WebSocket('ws://localhost');

// Prepare to display incoming messages on the console.
ws.addEventListener('message', function (event) {
    console.log('Message from server: ' + event.data);
});
```

Followed shortly thereafter by this instruction:

```js
// Send a message via the WebSocket connection.
ws.send('Hello from the client.');
```

# Evaluating each app

Consider:
* The number of HTTP requests it submits that don't "pay off"
    * Use Chrome Developer Tools > Network tab: bottom status bar (e.g. "123 requests")
* The size of each HTTP request it submits / response it receives
    * Use Chrome Developer Tools > Network tab: bottom status bar (e.g. "456 KB transferred")
* The latency; i.e. the delay between a message being created and that message being displayed
* The complexity of the implementation

# Miscellaneous Notes

## Using Chrome

### Developer Tools

#### Pending requests

On the `Network` tab, notice the `Status` of requests. Requests for which a response hasn't arrived yet have a status of `pending`. More details are available at `chrome://net-internals/#events`.

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
