import * as vscode from 'vscode'

import sourceControl from './providers/source-control'

/**@param context*/
function activate(context: vscode.ExtensionContext) {
  sourceControl(context)
}

function deactivate() {}

export { activate, deactivate }
