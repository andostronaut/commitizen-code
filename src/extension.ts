import * as vscode from 'vscode'

import sourceControl from './utils/source-control'

function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "commitizen-code" is now active!'
  )

  sourceControl({ context })
}

function deactivate() {}

module.exports = { activate, deactivate }
