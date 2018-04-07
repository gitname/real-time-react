# real-time-react
Real-Time React: An Introduction to Socket.io

## Introduction

This repository contains several "toy" apps used to demonstrate strategies people have used to achieve real-time, web-based client-server communication. The strategies include HTTP polling, HTTP long polling, and WebSockets.

How's this related to socket.io? socket.io chooses between WebSockets, HTTP long polling, and other strategies, depending upon which strategies are supported by the environment in which socket.io is running.

# Running each app

## HTTP Polling Chat

```bash
# Download app code and install dependencies.
$ git clone https://github.com/gitname/real-time-react.git
$ cd real-time-react/http-polling-chat/
$ npm install

# Run the app.
# If using Linux shell:
$ PORT=3000 && npm start
# If using Windows terminal:
> set PORT=3000&& npm start
```

> A note regarding the Windows terminal command: The **absence of whitespace** between the environment variable definition and the pair of ampersands is required, since the environment variable gets set to everything between the equals sign and the ampersand.

Then, in a web browser, visit the app at http://localhost:3000/.

Terminate the app by pressing `Ctrl+C`.

## HTTP Long Polling Chat

```bash
# Download app code and install dependencies.
$ git clone https://github.com/gitname/real-time-react.git
$ cd real-time-react/http-long-polling-chat/
$ npm install

# Run the app.
# If using Linux shell:
$ PORT=3000 && npm start
# If using Windows terminal:
> set PORT=3000&& npm start
```

> A note regarding the Windows terminal command: The **absence of whitespace** between the environment variable definition and the pair of ampersands is required, since the environment variable gets set to everything between the equals sign and the ampersand.

Then, in a web browser, visit the app at http://localhost:3000/.

Terminate the app by pressing `Ctrl+C`.

## WebSocket Barebones

Update: Thanks to [@benshell](https://github.com/benshell), this app now includes a client.

```bash
# Download app code and install dependencies.
$ git clone https://github.com/gitname/real-time-react.git
$ cd real-time-react/ws-barebones/
$ npm install

# Run the app.
# If using Linux shell:
$ npm start
# If using Windows terminal:
> npm start
```

Then, in a web browser, visit the app at http://localhost:3000/.

Terminate the app by pressing `Ctrl+C`.

# Developing each app

## Using nodemon

If you plan to make frequent changes to an app's source code, I recommend you run the app using `nodemon`. That (i.e. nodemon) will relaunch the app when it detects that any changes have been made to the app's source code since the app was last launched.

```sh
# Run the app.
# If using Linux shell:
$ PORT=3000 && npx nodemon start
# If using Windows terminal:
> set PORT=3000&& npx nodemon start
```

> A note regarding the Windows terminal command: The **absence of whitespace** between the environment variable definition and the pair of ampersands is required, since the environment variable gets set to everything between the equals sign and the ampersand.

Then, in a web browser, visit the app at http://localhost:3000/.

Terminate the app by pressing `Ctrl+C`.

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

# Notes from presentation/event

* **Rephrase** - an app built using both React and socket.io: https://github.com/Frankcarvajal/rephrase-v2.0.0
* **React-JSON-Grid** - A React component people can use to display and edit JSON data: https://github.com/jason-henriksen/react-json-grid
* **Prettier** - a VSCode extension someone recommended for prettifying code: https://github.com/prettier/prettier-vscode
* **Format-on-Save** - a VSCode setting someone recommended for ensuring code adheres to formatting rules upon save: https://code.visualstudio.com/updates/v1_22#_configurable-format-on-save-timeout
* **Pusher** - a service someone recommended for building real-time features of web applications: https://pusher.com/
