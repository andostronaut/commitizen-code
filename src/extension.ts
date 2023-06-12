import * as vscode from 'vscode'

import sourceControl from './providers/source-control'

/**@param context*/
function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "commitizen-code" is now active!'
  )

  sourceControl(context)
}

function deactivate() {}

export { activate, deactivate }
