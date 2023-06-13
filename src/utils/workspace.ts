import * as vscode from 'vscode'

function isWorkbenchStateNotEmpty(workspaceFolders: vscode.WorkspaceFolder[]) {
  return workspaceFolders && workspaceFolders.length > 0
}

export { isWorkbenchStateNotEmpty }
