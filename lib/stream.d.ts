declare module 'socket.io-stream' {
  import * as stream from 'stream'
  import * as net from 'net'

  class IOStream extends stream.Duplex {
    constructor(options?: SocketConstructorOpts)
    destroy: () => void
  }

  class BlobReadStream extends stream.Readable {
    constructor(blob: Blob, options: ReadableOptions)
  }

  export function createStream(options: SocketConstructorOpts): IOStream
  export function createBlobReadStream(blob, options): BlobReadStream
}
