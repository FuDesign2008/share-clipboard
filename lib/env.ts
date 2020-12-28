/**
 *
 * @author fuyg
 * @date  2020-12-28
 */

import * as dotEnv from 'dotenv'
dotEnv.config()

const env: { [key: string]: string } = {
  serverHost: process.env.SERVER_HOST as string,
}

export default env
