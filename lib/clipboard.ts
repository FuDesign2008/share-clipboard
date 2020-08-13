/**
 *
 * @author fuyg
 * @date  2020-08-13
 */
import * as events from 'events'
import * as copyPaste from 'copy-paste'

export enum ClipboardEvent {
  change = 'change',
}

class Clipboard extends events.EventEmitter {
  private _lastValue: string | null
  constructor(refreshInterval = 1000) {
    super()
    this._lastValue = null
    setInterval(() => this.monitorSystemClipboard(), refreshInterval)
  }

  set(text: string): boolean {
    if (!text) {
      return false
    }
    this._lastValue = text
    copyPaste.copy(text)
    return true
  }

  get current(): string | null {
    return this._lastValue
  }

  private monitorSystemClipboard() {
    copyPaste.paste((e, data) => {
      if (e) {
        console.error(e)
      }
      const text = data && data.toString ? data.toString() : ''
      if (!text) {
        return
      }
      if (text === this._lastValue) {
        return
      }
      this._lastValue = text
      this.emit(ClipboardEvent.change, text)
    })
  }
}

export default Clipboard
