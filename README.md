# share-clipboard

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

## TODO

1. server 开机自动启动
1. client 开机自动启动，并根据上次的 IP/电脑名，尝试连接 server
1. 粘贴图片/文件的支持

## Thanks

- https://github.com/coralw/share-clipboard
- https://github.com/harttle/clipbrd-share
