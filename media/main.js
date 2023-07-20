/* eslint-disable @typescript-eslint/naming-convention */
// @ts-nocheck
// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
;(function () {
  const vscode = acquireVsCodeApi()
  const openFolderButton = document.querySelector('#open-folder-button')
  const commitSelect = document.querySelector('#commit-select')
  const commitInput = document.querySelector('#commit-input')
  const commitButton = document.querySelector('#commit-button')

  let commitType = 'feature'

  openFolderButton?.addEventListener('click', e => {
    vscode.postMessage({ type: 'open' })
  })

  commitSelect?.addEventListener('change', e => {
    commitType = e.target.value
  })

  commitButton?.addEventListener('click', e => {
    e.preventDefault()

    if (commitInput.value === '') {
      vscode.postMessage({
        type: 'error',
        data: {
          message: 'Commitizen Code: Commit message is empty',
        },
      })

      return
    }

    vscode.postMessage({
      type: 'commit',
      data: {
        'commit-type': commitType,
        'commit-message': commitInput.value.trim(),
        commit: `${commitType}: ${commitInput.value.trim()}`,
      },
    })
  })
})()
