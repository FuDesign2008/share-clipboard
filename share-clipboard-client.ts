/**
 *
 * @author fuyg
 * @date  2020-08-13
 */

import createClient from './lib/Client'
import env from './lib/env'

const defaultPort = 8989

createClient(env.serverHost, defaultPort)
