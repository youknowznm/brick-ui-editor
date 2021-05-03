const copyToClipboard = text => {
  const clipboardContentHolder = document.createElement('div')
  clipboardContentHolder.style.position = 'absolute'
  clipboardContentHolder.style.top = '-10000px'
  clipboardContentHolder.style.left = '-10000px'
  clipboardContentHolder.innerHTML = text
  document.body.appendChild(clipboardContentHolder)
  const range = document.createRange()
  const selection = window.getSelection()
  selection.removeAllRanges()
  range.selectNodeContents(clipboardContentHolder)
  // range.selectNodeContents(cch)
  selection.addRange(range)
  document.execCommand('copy')
  selection.removeAllRanges()
  document.body.removeChild(clipboardContentHolder)
}

export default copyToClipboard
