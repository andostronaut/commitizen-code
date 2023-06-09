import * as vscode from 'vscode'

import { sourceControlUI } from './ui'

export function checkSourceControl({
  context,
}: {
  context: vscode.ExtensionContext
}) {
  const provider = {
    resolveWebviewView: function (thisWebviewView: vscode.WebviewView) {
      thisWebviewView.webview.options = { enableScripts: true }
      thisWebviewView.webview.html = sourceControlUI
    },
  }

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'commitizen-code.source-control',
      provider
    )
  )
}
