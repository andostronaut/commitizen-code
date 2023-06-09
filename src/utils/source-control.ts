import * as vscode from 'vscode'

export function checkSourceControl({
  context,
}: {
  context: vscode.ExtensionContext
}) {
  const provider = {
    resolveWebviewView: function (thisWebviewView: any) {
      thisWebviewView.webview.options = { enableScripts: true }
      thisWebviewView.webview.html = '<html>Source Control</html>'
    },
  }

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'commitizen-code.source-control',
      provider
    )
  )
}
