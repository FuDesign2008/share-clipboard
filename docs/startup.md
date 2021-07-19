# Automatically Run Service on System Startup

## Mac

1. `lanchd`

### Reference

1. [bash - Running script upon login mac - Stack Overflow](https://stackoverflow.com/questions/6442364/running-script-upon-login-mac)
1. [macos - Run command on startup / login (Mac OS X) - Super User](https://superuser.com/questions/229773/run-command-on-startup-login-mac-os-x)
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
