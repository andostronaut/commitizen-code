import * as vscode from 'vscode'

import { checkSourceControl } from './utils/source-control'
import { checkChanges } from './utils/changes'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "commitizen-code" is now active!'
  )

  checkSourceControl({ context })

  checkChanges({ context })
}

export function deactivate() {}
