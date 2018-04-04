# real-time-react
Real-Time React: An Introduction to Socket.io

# Running each app

Navigate to the subfolder in which the app's `server.js` file resides, then run:
```
C:\AppFolder\> npm start server.js
```
Or, if making frequent changes to the files in the app's file tree:
```
C:\AppFolder\> npx nodemon start server.js
```

Then, in a web browser, visit the app at http://localhost:3000/.

Terminate the app by pressing `Ctrl+C` and then casting [Meteo](http://finalfantasy.wikia.com/wiki/Meteor_(Final_Fantasy_IV)).

# Evaluating each app

Consider:
* The number of HTTP requests it submits that don't "pay off"
    * Use Chrome Developer Tools > Network tab: bottom status bar (e.g. "123 requests")
* The size of each HTTP request it submits / response it receives
    * Use Chrome Developer Tools > Network tab: bottom status bar (e.g. "456 KB transferred")
* The latency; i.e. the delay between a message being created and that message being displayed
* The complexity of the implementation

# Miscellaneous Notes

## Using Wireshark

### WinPcap driver

#### Starting the WinPcap driver service

When running Wireshark as a non-Administrator in Windows, you may have to manually start the WinPcap driver service in order for any network interfaces to appear in Wireshark.

To start it, open a command prompt as an administrative user (i.e. right-click the `cmd.exe` icon and select "Run as Administrator") and issue the following command:
```
C:\> net start npf

The NetGroup Packet Filter Driver service was started successfully.
```

#### Stopping the WinPcap driver service

Exiting Wireshark does not automatically stop the driver service.

To stop it, open a command prompt as an administrative user and issue the following command:
```
C:\> net stop npf

The NetGroup Packet Filter Driver service was stopped successfully.
```

Reference: https://wiki.wireshark.org/CaptureSetup/CapturePrivileges
