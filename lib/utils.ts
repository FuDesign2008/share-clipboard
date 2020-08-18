/**
 *
 * @author fuyg
 * @date  2020-08-18
 */

function shortText(text: string): string {
  return text && text.length && text.length > 20
    ? text.substr(0, 17) + '...'
    : text
}

export { shortText }
