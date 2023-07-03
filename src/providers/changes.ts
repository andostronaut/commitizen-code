import * as vscode from 'vscode'
import * as path from 'path'

import { isWorkspaceFoldersNotEmpty } from '../utils/workspace'

class ChangesProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  public static readonly type = 'commitizen-code.changes'
  public readonly root =
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
      ? vscode.workspace.workspaceFolders[0].uri.fsPath
      : ''

  private _scm?: vscode.SourceControl
  private _git?: any
  private _workspace?: vscode.WorkspaceFolder[] | any

  constructor() {
    this._scm = vscode.scm.createSourceControl(
      'git',
      'Git',
      vscode.Uri.parse(this.root)
    )
    this._git = vscode.extensions.getExtension('vscode.git')?.exports.getAPI(1)
    this._workspace = vscode.workspace.workspaceFolders
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
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

        if (repository) {
          console.log(repository.repository.untrackedGroup.resourceStates)
          console.log(repository.repository.workingTreeGroup.resourceStates)

          console.log(repository.repository.sourceControl)

          // const status = await repository.getStatus()ss
          // const changedFiles = status.filter(
          //   (file: any) => file.workingTreeStatus !== this._scm
          // )

          // return changedFiles.map((file: any) => {
          //   const treeItem = new vscode.TreeItem(
          //     file.path,
          //     file.workingTreeStatus === this._scm
          //       ? vscode.TreeItemCollapsibleState.None
          //       : vscode.TreeItemCollapsibleState.Collapsed
          //   )
          //   treeItem.contextValue = 'changedFile'
          //   return treeItem
          // })
        }

        return []
      })
    ).then(items => items.flat())
  }
}

export default ChangesProvider
