import * as vscode from 'vscode'

import ui from './ui'

function sourceControl({ context }: { context: vscode.ExtensionContext }) {
  const type = 'commitizen-code.source-control'
  const provider = {
    resolveWebviewView: function (thisWebviewView: vscode.WebviewView) {
      thisWebviewView.webview.options = { enableScripts: true }
      thisWebviewView.webview.html = ui()
    },
  }

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(type, provider)
  )
}

export default sourceControl
