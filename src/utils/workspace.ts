import * as vscode from 'vscode'

function isWorkspaceFoldersNotEmpty(
  workspaceFolders: vscode.WorkspaceFolder[]
): boolean {
  return workspaceFolders && workspaceFolders.length > 0
}

function isWorkspaceHasGit(
  workspaceFolders: vscode.WorkspaceFolder[]
): boolean {
  if (workspaceFolders) {
    for (const folder of workspaceFolders) {
      const gitInfo =
        vscode.workspace.getWorkspaceFolder(folder.uri)?.uri.scheme === 'git'
      if (gitInfo) {
        return true
      }
      return false
    }
  }
  return false
}

export { isWorkspaceFoldersNotEmpty, isWorkspaceHasGit }
