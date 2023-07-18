import * as vscode from 'vscode'

/**
 * @param {vscode.Webview} webview
 * @param {vscode.Uri} extensionUri
 * @returns {object}
 */
function getScriptURI(
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): { scriptUri: vscode.Uri } {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'main.js')
  )

  return { scriptUri }
}

export { getScriptURI }
