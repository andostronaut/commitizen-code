import * as vscode from 'vscode'

function applyStylesheet({
  webview,
  extensionUri,
}: {
  webview: vscode.Webview
  extensionUri: vscode.Uri
}) {
  const styleResetUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'reset.css')
  )
  const styleVSCodeUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'vscode.css')
  )
  const styleMainUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'main.css')
  )

  return { styleResetUri, styleVSCodeUri, styleMainUri }
}

export { applyStylesheet }
