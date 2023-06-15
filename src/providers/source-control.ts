import * as vscode from 'vscode'

import { generateNonce } from '../utils/nonce'
import { getStylesheetURI } from '../utils/stylesheet'
import { getScriptURI } from '../utils/script'

class SourceControlProvider implements vscode.WebviewViewProvider {
  public static readonly type = 'commitizen-code.source-control'

  private _view?: vscode.WebviewView
  private _terminal?: vscode.Terminal
  private _workspace?: vscode.WorkspaceFolder[]

  /**@param _extensionUri*/
  constructor(private readonly _extensionUri: vscode.Uri) {
    this._terminal = vscode.window.createTerminal('commitizen-code: terminal')
    this._workspace = vscode.workspace.workspaceFolders as any
  }

  /**@param webviewView @param _context @param _token*/
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
          vscode.window.showErrorMessage(message.data.message)
          break
        }
        case 'commit': {
          vscode.window.showInformationMessage(
            `Commitizen Code: Commit message is: ${message.data.commit} `
          )
          break
        }
      }
    })
  }

  /**@param webview @returns*/
  private _getHtmlForWebview(webview: vscode.Webview): string {
    const { styleResetUri, styleVSCodeUri, styleMainUri } = getStylesheetURI(
      webview,
      this._extensionUri
    )
    const { scriptUri } = getScriptURI(webview, this._extensionUri)

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
        <span class="intro">Welcome to Commitizen Code</span>
        <br>
        <br>
        <span class="link">This is the VSCode Extension for Commitizen CLI, you can found it <a href="https://www.npmjs.com/package/commitizen-cli">here</a></span>
        <br>
        <br>

        <div class="input-container">
          <select id="commit-select" name="commit-select">
            <option value="feature">Feature</option>
            <option value="bugfix">Bugfix</option>
            <option value="hotfix">Hotfix</option>
            <option value="chore">Chore</option>
            <option value="epic">Epic</option>
            <option value="design">Design</option>
            <option value="experiment">Experiment</option>
            <option value="documentation">Documentation</option>
          </select>
        <br>

          <textarea id="commit-input" name="commit-input" placeholder="Commit message" rows="1" maxlength="124"></textarea>
        </div>

        <button id="commit-button">Commit</button>

        <span class="outro">Start your commit journey from now.</span>

        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`
  }
}

/**@param context*/
function sourceControl(context: vscode.ExtensionContext) {
  const provider = new SourceControlProvider(context.extensionUri)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SourceControlProvider.type,
      provider
    )
  )
}

export default sourceControl
