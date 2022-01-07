export function copyToClipboard() {
  return typeof navigator !== 'undefined' && navigator.clipboard
    ? copyWithClipboard
    : copyWithDomApi
}

async function copyWithClipboard({
  text,
  message,
}: {
  text: string
  message: string
}) {
  await navigator.clipboard.writeText(text)

  alert(message)
}

function copyWithDomApi({ text, message }: { text: string; message: string }) {
  const inputElement = document.createElement('input')

  inputElement.value = text
  document.body.appendChild(inputElement)
  inputElement.select()
  document.execCommand('copy')
  document.body.removeChild(inputElement)

  alert(message)
}
