/**
 *
 *
 * @author fuyg
 * @date  2020-08-13
 */
import * as socketIo from 'socket.io-client'
import Clipboard, { ClipboardEvent } from './clipboard'
import { SocketEvent } from './socket'

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

  socket.on(SocketEvent.paste, (text: string) => {
    const short =
      text && text.length && text.length > 10 ? text.substr(0, 10) : text
    console.info(`Received clipboard from server: ${short}`)
    clipboard.set(text)
  })
  clipboard.on(ClipboardEvent.change, (text) =>
    socket.emit(SocketEvent.paste, text),
  )
}

export default createClient
