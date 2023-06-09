import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "commitizen-code" is now active!'
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('commitizen-code.commit', () => {
      vscode.window.showInformationMessage('Commitizen Code!')
    })
  )
}

export function deactivate() {}
