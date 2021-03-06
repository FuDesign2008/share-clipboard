/**
 *
 *
 * @author fuyg
 * @date  2020-08-13
 */
import * as socketIo from 'socket.io-client'
import Clipboard, { ClipboardEvent } from './clipboard'
import { SocketEvent } from './socket'
import { shortText } from './utils'

function createSocket(url: string) {
  const socket = socketIo.connect(url)
  socket.on('connect', () => {
    console.log(`Connected to a server ${url}`)
  })
  socket.on('disconnect', () => {
    console.log(`Disconnected from a server ${url}`)
  })

  return socket
}

function createClient(host: string, port = 8989): void {
  const url = `http://${host}:${port}`

  const clipboard = new Clipboard()
  const socket = createSocket(url)

  socket.on(SocketEvent.clipboardChange, (text: string) => {
    const short = shortText(text)
    console.info(`Received clipboard from Server: ${short}`)
    clipboard.set(text)
  })

  clipboard.on(ClipboardEvent.change, (text) => {
    socket.emit(SocketEvent.clipboardChange, text)
    const short = shortText(text)
    console.info(`Send clipboard to Server: ${short}`)
  })
}

export default createClient
