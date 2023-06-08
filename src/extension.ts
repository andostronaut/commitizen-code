import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "commitizen-code" is now active!'
  )

  let disposable = vscode.commands.registerCommand(
    'commitizen-code.commitizen',
    () => {
      vscode.window.showInformationMessage('Commitizen Code!')
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
