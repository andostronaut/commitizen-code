import * as vscode from 'vscode'

import SourceControlProvider from './providers/source-control'
import ChangesProvider from './providers/changes'

/**@param context*/
function activate(context: vscode.ExtensionContext) {
  const provider = new SourceControlProvider(context)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SourceControlProvider.type,
      provider
    )
  )

  new ChangesProvider(context)
}

function deactivate() {}

export { activate, deactivate }
