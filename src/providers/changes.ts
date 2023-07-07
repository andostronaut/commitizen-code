import * as vscode from 'vscode'

import { isWorkspaceFoldersNotEmpty } from '../utils/workspace'
import { hasUntrackedGroup, hasWorkingTreeGroup } from '../utils/git'

class ChangesProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  public static readonly type = 'commitizen-code.changes'
  public readonly root =
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : ''

  private _git?: any
  private _workspace?: vscode.WorkspaceFolder[] | any

  constructor() {
    this._git = vscode.extensions.getExtension('vscode.git')?.exports.getAPI(1)
    this._workspace = vscode.workspace.workspaceFolders
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element
  }

  async getChildren(): Promise<Array<vscode.TreeItem>> {
    if (!isWorkspaceFoldersNotEmpty(this._workspace)) {
      vscode.window.showInformationMessage('No folder in empty workspace')
      return Promise.resolve([])
    }

    if (!this._git) {
      vscode.window.showInformationMessage(
        'Git is not initialized in this workspace'
      )
      return Promise.resolve([])
    }

    return Promise.all(
      this._workspace.map(async (folder: vscode.WorkspaceFolder) => {
        const repository = this._git.getRepository(folder.uri)
        const tree: Array<vscode.TreeItem> = []

        if (repository) {
          const untrackedGroup =
            repository.repository?.untrackedGroup?.resourceStates
          const workingTreeGroup =
            repository.repository?.workingTreeGroup?.resourceStates

          if (hasUntrackedGroup(untrackedGroup)) {
            untrackedGroup.map((file: any) => {
              const treeItem = new vscode.TreeItem(
                file.resourceUri.path,
                vscode.TreeItemCollapsibleState.Collapsed
              )

              treeItem.contextValue = 'Untracked'

              tree.push(treeItem)
            })
          }

          if (hasWorkingTreeGroup(workingTreeGroup)) {
            workingTreeGroup.map((file: any) => {
              const fileName = `📝 ${file.resourceUri.path.split('/').pop()}`

              const treeItem = new vscode.TreeItem(
                fileName,
                vscode.TreeItemCollapsibleState.None
              )

              treeItem.contextValue = 'Working Tree'

              tree.push(treeItem)
            })
          }
        }

        return Promise.resolve(tree)
      })
    ).then(items => items.flat())
  }
}

export default ChangesProvider
