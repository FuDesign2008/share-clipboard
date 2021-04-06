/**
 *
 * @author fuyg
 * @date  2021-04-02
 */
import * as path from 'path'
import * as fs from 'fs'
import ReadWriteStream = NodeJS.ReadWriteStream
import { IOStream } from 'socket.io-stream'

const sharedFolderPath = path.resolve('../shared')

function getFilePath(fileName: string): string {
  return path.resolve(sharedFolderPath, `./${fileName}`)
}

function writeStreamToShared(stream: IOStream, fileName: string): void {
  const filePath = getFilePath(fileName)
  stream.pipe(fs.createWriteStream(filePath))
}
