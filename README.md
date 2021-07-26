# share-clipboard

## Features

1. Multiple platforms
   - ✅OSX
   - ✅Linux
   - ⚠️windows (only support text)
1. Multiple MIMEs
   - ✅text/plain
   - 🏃image/png

## Dependencies

### OSX

All dependencies are bundled into this repo, no additional dependencies.

### Linux

1. xclip
   - ubuntu
     - `sudo apt-get install -y xclip`
     - [How to install xclip ubuntu package on Ubuntu 20.04/Ubuntu 18.04/Ubuntu 19.04/Ubuntu 16.04](https://zoomadmin.com/HowToInstall/UbuntuPackage/xclip)
   - arch linux
     - `pacman -S xclip`
     - [Arch Linux - xclip 0.13-3 (x86_64)](https://archlinux.org/packages/extra/x86_64/xclip/)

## Basic Usage

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
1. Edit `.env` file if `SERVER_HOST` is changed

## Advanced Usage

1. [Automatically Run Service on System Startup](./docs/startup.md)

## TODO

1. server 开机自动启动 ✅
   - mac 下开机自动启动，发送时中文存在乱码
1. client 开机自动启动 ✅
   - linux 下开机自动启动， 本机剪贴板发生变化时，不能将信息发送给 server
   - 但可以接收 server 的变化
1. 粘贴图片/文件的支持
1. client 根据电脑名称自动连接 server

## Thanks

- https://github.com/coralw/share-clipboard
- https://github.com/harttle/clipbrd-share
