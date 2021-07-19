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
  const waitTime = 1000 * 3

  const clipboard = new Clipboard()
  const socket = createSocket(url)

  let timerId: ReturnType<typeof setTimeout> | null = setTimeout(() => {
    console.warn('Too long to wait server response')
    console.info('1. make sure the server has started')
    console.info('2. make sure the SERVER_HOST in .env file is right')
  }, waitTime)

  socket.on(SocketEvent.clipboardChange, (text: string) => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    const short = shortText(text)
    console.info(`Received clipboard from Server: ${short}`)
    clipboard.set(text)
  })

  clipboard.on(ClipboardEvent.change, (text) => {
    socket.emit(SocketEvent.clipboardChange, text)
    const short = shortText(text)
    console.info(`Send clipboard to Server: ${short}`)
  })

  console.info(`\nclient has started, waiting message from server...`)
}

export default createClient
