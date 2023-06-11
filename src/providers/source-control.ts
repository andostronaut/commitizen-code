import * as vscode from 'vscode'

import { generateNonce } from '../utils/nonce'
import { getStylesheetURI } from '../utils/stylesheet'
import { getScriptURI } from '../utils/script'

class SourceControlProvider implements vscode.WebviewViewProvider {
  public static readonly type = 'commitizen-code.source-control'

  private _view?: vscode.WebviewView

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    }

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)

    webviewView.webview.onDidReceiveMessage(message => {
      switch (message.type) {
        case 'error': {
          vscode.window.showErrorMessage(message.value)
          break
        }
        case 'commit': {
          vscode.window.showInformationMessage(
            `Commitizen Code: Commit message is: ${message.value} `
          )
          break
        }
      }
    })
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const { styleResetUri, styleVSCodeUri, styleMainUri } = getStylesheetURI({
      webview,
      extensionUri: this._extensionUri,
    })
    const { scriptUri } = getScriptURI({
      webview,
      extensionUri: this._extensionUri,
    })

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

        <title>Source Control</title>
      </head>
      <body>
        <div class="textarea-grow-wrap">
          <textarea id="commit-input" name="commit-message" placeholder="Commit message" rows="1" maxlength="124"></textarea>
        </div>

        <button id="commit-button">Commit</button>

        <script nonce="${nonce}" src="${scriptUri}"></script>
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
