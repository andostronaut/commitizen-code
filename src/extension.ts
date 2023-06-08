import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "commitizen-code-extension" is now active!'
  )

  let disposable = vscode.commands.registerCommand(
    'commitizen-code-extension.commitizen',
    () => {
      vscode.window.showInformationMessage(
        'Hello World from commitizen-code-extension!'
      )
    }
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
