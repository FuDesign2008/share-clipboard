/**
 *
 * @author fuyg
 * @date  2020-08-13
 */

import * as http from 'http'
import * as socketIo from 'socket.io'
import Clipboard, { ClipboardEvent } from './clipboard'
import { SocketEvent } from './socket'
import * as os from 'os'
import { shortText } from './utils'
import console from './log'

function getHost(): string {
  const ifaces = os.networkInterfaces()
  let host = '0.0.0.0'

  Object.keys(ifaces).forEach(function (dev) {
    const arr = ifaces && ifaces[dev] ? ifaces[dev] : []
    if (arr) {
      arr.some(function (details) {
        if (details.family === 'IPv4' && !details.internal) {
          host = details.address
          return true
        }
      })
    }
  })
  return host
}

function sendClipboard(socket: socketIo.Socket, text: string | null): void {
  if (text == null) {
    return
  }
  socket.emit(SocketEvent.clipboardChange, text)
  const short = shortText(text)
  console.log(`Send clipboard to clients`, `${short}`)
}

function createServer(port: number): void {
  const host = getHost()
  const clipboard = new Clipboard()

  console.info(`Starting server`, `${host}:${port}`)

  const server = http.createServer()
  const io = socketIo.listen(server)

  io.on('connection', (socket) => {
    const remoteAddress = socket.conn.remoteAddress
    console.log(`Client connected`, `Client ${remoteAddress} is connected`)

    socket.on('disconnect', () => {
      console.log(
        `Client disconnected`,
        `Client ${remoteAddress} is disconnected`,
      )
    })

    socket.on(SocketEvent.clipboardChange, (text: string) => {
      const short = shortText(text)
      console.info(`Received clipboard from client`, `${short}`)
      clipboard.set(text)
    })

    clipboard.on(ClipboardEvent.change, (text) => {
      sendClipboard(socket, text)
    })

    sendClipboard(socket, clipboard.current)
  })

  server.listen(port, host)
}

export default createServer
