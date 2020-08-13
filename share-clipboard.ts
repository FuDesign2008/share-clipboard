/**
 *
 * @author fuyg
 * @date  2020-08-13
 */

import createServer from './lib/Server'
import createClient from './lib/Client'

const defaultHost = '0.0.0.0'
const defaultPort = 8989

if (process.argv.length == 3) {
  // node ./share-clipboard.js  host
  const host = process.argv[2]
  createClient(host, defaultPort)
} else {
  // node ./share-clipboard.js
  createServer(defaultHost, defaultPort)
}
