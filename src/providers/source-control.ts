import * as vscode from 'vscode'

import { generateNonce } from '../utils/nonce'
import { getStylesheetURI } from '../utils/stylesheet'
import { getScriptURI } from '../utils/script'
import { isWorkspaceHasGit } from '../utils/workspace'
import { renderIntroUI, renderCommitFormUI, renderOpenFolderUI } from '../ui'

class SourceControlProvider implements vscode.WebviewViewProvider {
  public static readonly type = 'commitizen-code.source-control'

  private _view?: vscode.WebviewView
  private _workspace?: vscode.WorkspaceFolder[] | any
  private _extensionUri?: vscode.Uri | any

  /**@param _extensionUri*/
  constructor(context: vscode.ExtensionContext) {
    this._workspace = vscode.workspace.workspaceFolders
    this._extensionUri = context.extensionUri
  }

  /**@param webviewView @param _context @param _token*/
  public async resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    }

    webviewView.webview.html = await this._getHtmlForWebview(
      webviewView.webview
    )

    webviewView.webview.onDidReceiveMessage(message => {
      switch (message.type) {
        case 'open': {
          vscode.window.showInformationMessage('Opening folder')
        }

        case 'commit': {
          vscode.window.showInformationMessage(
            `Commitizen Code: Commit message is: ${message.data.commit} `
          )

          break
        }

        case 'error': {
          vscode.window.showErrorMessage(message.data.message)

          break
        }
      }
    })
  }

  /**@param webview @returns*/
  private async _getHtmlForWebview(webview: vscode.Webview): Promise<string> {
    const { styleResetUri, styleVSCodeUri, styleMainUri } = getStylesheetURI(
      webview,
      this._extensionUri
    )
    const { scriptUri } = getScriptURI(webview, this._extensionUri)

    const nonce = generateNonce()

    const outroText = (await isWorkspaceHasGit(this._workspace as any))
      ? 'Start your commit journey from now.'
      : 'Please open a folder how have git initialized.'

    const partialUI = (await isWorkspaceHasGit(this._workspace as any))
      ? renderCommitFormUI
      : renderOpenFolderUI

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">

        <!--
          Use a content security policy to only allow loading styles from our extension directory,
          and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${
          webview.cspSource
        }; script-src 'nonce-${nonce}';">

        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="${styleResetUri}" rel="stylesheet">
        <link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">

        <title>Source Control</title>
      </head>
      <body>
        <section>${renderIntroUI()}</section>

        <section>${partialUI()}</section>
        <br>

        <span class="outro">${outroText}</span>

        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`
  }
}

export default SourceControlProvider
