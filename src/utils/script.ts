import * as vscode from 'vscode'

function getScriptURI({
  webview,
  extensionUri,
}: {
  webview: vscode.Webview
  extensionUri: vscode.Uri
}) {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'main.js')
  )

  return { scriptUri }
}

export { getScriptURI }
