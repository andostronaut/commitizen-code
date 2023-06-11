import * as vscode from 'vscode'

import getNonce from '../utils/nonce'
import { applyStylesheet } from '../utils/stylesheet'

class SourceControlProvider implements vscode.WebviewViewProvider {
  public static readonly type = 'commitizen-code.source-control'

  private _view?: vscode.WebviewView

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    }

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const { styleResetUri, styleVSCodeUri, styleMainUri } = applyStylesheet({
      webview,
      extensionUri: this._extensionUri,
    })

    const nonce = getNonce()

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

        <title>Source Control</title>
      </head>
      <body>
        <button class="commit-button">Commit</button>
      </body>
      </html>`
  }
}

function sourceControl({ context }: { context: vscode.ExtensionContext }) {
  const provider = new SourceControlProvider(context.extensionUri)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SourceControlProvider.type,
      provider
    )
  )
}

export default sourceControl
