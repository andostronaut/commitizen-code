import * as vscode from 'vscode'

import sourceControl from './providers/source-control'
import ChangesProvider from './providers/changes'

/**@param context*/
function activate(context: vscode.ExtensionContext) {
  sourceControl(context)

  new ChangesProvider(context)
}

function deactivate() {}

export { activate, deactivate }
