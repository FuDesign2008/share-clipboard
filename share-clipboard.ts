/**
 *
 *
 * @author fuyg
 * @date  2020-08-13
 */

import * as net from 'net'
import * as clipboard from 'copy-paste'

const port = 7582
const peers: net.Socket[] = []
let lastClipboardText = ''

// check and push clipboard text to other peers
function checkAndPushText() {
  //console.log('checkAndPushText');
  let clipboardText = null

  try {
    clipboardText = clipboard.paste()
  } catch (ex) {
    console.log('Failed to run paste()')
  }

  if (
    !clipboardText ||
    clipboardText == lastClipboardText ||
    clipboardText.length == 0 ||
    peers.length == 0
  ) {
    return
  }
  // create message
  const messageLength = Buffer.byteLength(clipboardText, 'utf8') + 8
  const messageData = new Buffer(messageLength)
  // message length
  messageData.writeInt32BE(messageLength, 0)
  // clipboard type
  messageData.write('\x00\x00\x00\x01', 4)
  messageData.write(clipboardText, 8)

  for (let i = 0; i < peers.length; i++) {
    const socket = peers[i]
    socket.write(messageData)
  }
  lastClipboardText = clipboardText
}
// checks every 1 second
const checkTimer = setInterval(checkAndPushText, 1000)

// connect to a server
if (process.argv.length == 3) {
  const host = process.argv[2]
  const client = net.connect({ port: port, host: host }, function () {
    //'connect' listener
    //console.log('client connected');
    // add client to the list
    peers.push(client)
    checkAndPushText()
  })
  client.on('data', function (data) {
    //console.log(data.toString());
    //client.end();
    writeToClipboard(data)
  })
  client.on('end', function () {
    //console.log('client disconnected');
    const index = peers.indexOf(client)
    if (index > -1) {
      //console.log('remove client');
      peers.splice(index, 1)
    }
  })
  client.on('error', function () {
    //console.log('client error');
    const index = peers.indexOf(client)
    if (index > -1) {
      //console.log('remove client');
      peers.splice(index, 1)
    }
  })
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
function writeToClipboard(data: any) {
  //console.log('writeToClipboard');
  if (data.length <= 8) return
  // we simply skip the 8 bytes header
  const text = data.toString('utf8', 8)
  //console.log(text);
  try {
    clipboard.copy(text)
  } catch (ex) {
    console.log('failed to set clipboard')
  }
}

const server = net.createServer(function (socket) {
  peers.push(socket)

  socket.on('data', function (chunk) {
    for (let i = 0; i < peers.length; i++) {
      const client = peers[i]
      if (client != socket) {
        //console.log('write to client');
        client.write(chunk)
      } else {
        writeToClipboard(chunk)
      }
    }
  })

  // remove client from the list
  socket.on('end', function () {
    const index = peers.indexOf(socket)
    if (index > -1) {
      //console.log('remove client');
      peers.splice(index, 1)
    }
    //console.log('client disconnected');
  })

  // error handling
  socket.on('error', function (/*err*/) {
    //console.log('Caught error');
    const index = peers.indexOf(socket)
    if (index > -1) {
      //console.log('remove client');
      peers.splice(index, 1)
    }
  })
})

// port 7582 is used by Share Clipboard
server.listen(port, function () {
  //'listening' listener
  console.log('server started')
})
