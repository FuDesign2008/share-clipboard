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
const ifaces = os.networkInterfaces()

function createSocket(
  host: string,
  port: number,
  handleClientSocket: (socket: socketIo.Socket) => void,
) {
  console.log(`Starting server: `)
  if (host !== '0.0.0.0') {
    console.info(`${host}:${port}`)
  } else {
    Object.keys(ifaces).forEach(function (dev) {
      const arr = ifaces && ifaces[dev] ? ifaces[dev] : []
      if (arr) {
        arr.forEach(function (details) {
          if (details.family === 'IPv4') {
            console.info(`${details.address}:${port}`)
          }
        })
      }
    })
  }

  const server = http.createServer()
  const io = socketIo.listen(server)
  io.on('connection', (client) => {
    const remoteAddress = client.conn.remoteAddress
    console.log(`Client ${remoteAddress} is connected`)
    client.on('disconnect', () => {
      console.log(`Client ${remoteAddress} is disconnected`)
    })
    handleClientSocket(client)
  })
  server.listen(port, host)
}

function createServer(host = 'localhost', port = 8989): void {
  const clipboard = new Clipboard()

  createSocket(host, port, (client: socketIo.Socket) => {
    client.on(SocketEvent.paste, (text: string) => {
      console.info(`Received clipboard: ${text}`)
      clipboard.set(text)
    })
    clipboard.on(ClipboardEvent.change, (text) =>
      client.emit(SocketEvent.paste, text),
    )
    client.emit(SocketEvent.paste, clipboard.current)
  })
}

export default createServer
