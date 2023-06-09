import * as vscode from 'vscode'

import { checkSourceControl } from './utils/source-control'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "commitizen-code" is now active!'
  )

  checkSourceControl({ context })
}

export function deactivate() {}
