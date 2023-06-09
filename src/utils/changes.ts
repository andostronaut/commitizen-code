import * as vscode from 'vscode'

export function checkChanges({
  context,
}: {
  context: vscode.ExtensionContext
}) {
  const provider = {
    resolveWebviewView: function (thisWebviewView: any) {
      thisWebviewView.webview.options = { enableScripts: true }
      thisWebviewView.webview.html = '<html>Changes</html>'
    },
  }

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'commitizen-code.changes',
      provider
    )
  )
}
