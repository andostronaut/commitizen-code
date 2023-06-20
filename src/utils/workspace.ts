import * as vscode from 'vscode'

function isWorkspaceFoldersNotEmpty(
  workspaceFolders: vscode.WorkspaceFolder[]
): boolean {
  return workspaceFolders && workspaceFolders.length > 0
}

async function isWorkspaceHasGit(
  workspaceFolders: vscode.WorkspaceFolder[]
): Promise<boolean> {
  let hasGitFolder = false

  if (workspaceFolders) {
    for (const folder of workspaceFolders) {
      const data = await vscode.workspace.fs.readDirectory(folder.uri)
      hasGitFolder = data.flat().includes('.git')
    }
  }

  return hasGitFolder
}

export { isWorkspaceFoldersNotEmpty, isWorkspaceHasGit }
