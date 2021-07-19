# Automatically Run Service on System Startup

## Mac

### Server

1. run command in terminal: `cp ./docs/share-clipboard-server.plist ~/Library/LaunchAgents/share-clipboard-server.plist`
1. open `~/Library/LaunchAgents/share-clipboard-server.plist` and modify `/absolute/path/to/share-clipboard` in the file.
1. run `launchctl load ~/Library/LaunchAgents/share-clipboard-server.plist` and check `./stdout.log`
1. reboot system to check

### Client

1. run command in terminal: `cp ./docs/share-clipboard-client.plist ~/Library/LaunchAgents/share-clipboard-client.plist`
1. open `~/Library/LaunchAgents/share-clipboard-client.plist` and modify `/absolute/path/to/share-clipboard` in the file.
1. run `launchctl load ~/Library/LaunchAgents/share-clipboard-client.plist` and check `./stdout.log`
1. reboot system to check

### Reference

1. [How to schedule Node.js Scripts on Your Mac With Launchd | by Matthew Williams | Better Programming](https://betterprogramming.pub/schedule-node-js-scripts-on-your-mac-with-launchd-a7fca82fbf02)

## Linux

### Server

1. run command in terminal: `crontab -e`
   - enter a new line: `@reboot sh -c '/absolute/path/to/share-clipboard && npm run server'`
   - then save the file and exit
1. reboot system to check

### Client

1. run command in terminal: `crontab -e`
   - enter a new line: `@reboot sh -c '/absolute/path/to/share-clipboard && npm run client'`
   - then save the file and exit
1. reboot system to check

### Reference

See reference for more details.

1. [Automatically Start Node.js Server on System Restarts | by Samuel Elh | Medium](https://medium.com/@elhardoum/automatically-start-node-js-server-on-system-restarts-cab3d2194674)

```

```
