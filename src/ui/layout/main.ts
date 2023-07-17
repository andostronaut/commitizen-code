import * as vscode from 'vscode'

import { generateNonce } from '../../utils/nonce'
import { getStylesheetURI } from '../../utils/stylesheet'
import { getScriptURI } from '../../utils/script'

function mainLayout({
  title,
  webview,
  extensionUri,
  children,
}: {
  title: string
  webview: vscode.Webview
  extensionUri: vscode.Uri
  children: string
}): string {
  const { styleResetUri, styleVSCodeUri, styleMainUri } = getStylesheetURI(
    webview,
    extensionUri
  )
  const { scriptUri } = getScriptURI(webview, extensionUri)

  const nonce = generateNonce()

  return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">

        <!--
          Use a content security policy to only allow loading styles from our extension directory,
          and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="${styleResetUri}" rel="stylesheet">
        <link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">

        <title>${title}</title>
      </head>
      <body>
        <main>
          ${children}
        </main>

        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`
}

export default mainLayout
