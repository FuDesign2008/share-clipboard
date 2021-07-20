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
  private timerId: ReturnType<typeof setTimeout> | null
  private timeout: number
  // 默认值调了很多次，慎重修改
  // 1. 3000 太长
  constructor(refreshInterval = 1500) {
    super()
    this._lastValue = null
    this.timeout = refreshInterval
    this.timerId = null
    this.set('share-clipboard start')
    this.monitorSystemClipboard()
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

  private clearTimeout(): void {
    if (this.timerId) {
      clearTimeout(this.timerId)
      this.timerId = null
    }
  }

  private monitorSystemClipboard() {
    this.clearTimeout()

    this.timerId = setTimeout(() => {
      copyPaste.paste((e, data) => {
        if (e) {
          // console.error(e)
          console.log('Clipboard Error', 'Failed to run copyPaste.paste()')
          this.monitorSystemClipboard()
          return
        }
        const text = data && data.toString ? data.toString() : ''
        if (!text) {
          console.log('Clipboard Error', 'The text from clipboard is nil')
          this.monitorSystemClipboard()
          return
        }
        if (text === this._lastValue) {
          this.monitorSystemClipboard()
          return
        }
        this._lastValue = text
        this.emit(ClipboardEvent.change, text)
        this.monitorSystemClipboard()
      })
    }, this.timeout)
  }
}

export default Clipboard
