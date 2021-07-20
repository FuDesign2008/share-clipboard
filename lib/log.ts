/**
 *
 * @author fuyg
 * @date  2021-07-20
 */

import notifier from 'node-notifier'

function log(title: string, message: string): void {
  console.info(`${title}: ${message}`)
  notifier.notify({
    title,
    message,
  })
}

export default {
  log,
  info: log,
  warn: log,
}
