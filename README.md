# SShare Clipboard

## Features

1. Multiple platforms
   - ✅OSX
   - ✅Linux
   - ⚠️windows (only support text)
1. Multiple MIMEs
   - ✅text/plain
   - 🏃image/png

## Usage

### Server

1. Install
   - `git clone https://github.com/FuDesign2008/share-clipboard.git`
1. Start the server:
   - `npm install && npm run server`

### Client

Start the client on another machine.

1. Install
   - `git clone https://github.com/FuDesign2008/share-clipboard.git`
1. Create `.env` from './.env.example' and edit the `SERVER_HOST`
1. Start the client:
   - `npm install && npm run client`

## Dependencies

### OSX

All dependencies are bundled into this repo, no additional dependencies.

### Linux

1. [xclip](https://www.archlinux.org/packages/extra/x86_64/xclip/)
   - `pacman -S xclip`

## Thanks

- https://github.com/coralw/share-clipboard
- https://github.com/harttle/clipbrd-share

## ref

1. 监听文件夹变化 https://www.npmjs.com/package/chokidar
1. https://www.npmjs.com/package/socket.io-stream
