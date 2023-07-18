import * as vscode from 'vscode'

/**
 * @param {vscode.WorkspaceFolder[]} workspaceFolders
 * @returns {boolean}
 */
function isWorkspaceFoldersNotEmpty(
  workspaceFolders: vscode.WorkspaceFolder[]
): boolean {
  return workspaceFolders && workspaceFolders.length > 0
}

/**
 * @param {vscode.WorkspaceFolder[]} workspaceFolders
 * @returns {Promise<boolean>}
 */
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
