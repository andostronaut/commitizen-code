import * as vscode from 'vscode'

import SourceControlProvider from './providers/source-control'
import ChangesProvider from './providers/changes'

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context: vscode.ExtensionContext) {
  const sourceControlProvider = new SourceControlProvider(context)

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      SourceControlProvider.type,
      sourceControlProvider
    )
  )

  const changesProvider = new ChangesProvider()

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      ChangesProvider.type,
      changesProvider
    )
  )
}

function deactivate() {}

export { activate, deactivate }
