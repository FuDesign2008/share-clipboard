/**
 *
 * @author fuyg
 * @date  2020-08-13
 */

import createServer from './src/Server'
import createClient from './src/Client'

const defaultPort = 8989

if (process.argv.length == 3) {
  // node ./share-clipboard.js  host
  const host = process.argv[2]
  createClient(host, defaultPort)
} else {
  // node ./share-clipboard.js
  createServer('localhost', defaultPort)
}
