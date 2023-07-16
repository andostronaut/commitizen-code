/* eslint-disable @typescript-eslint/naming-convention */
//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
;(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi()
  const openFolderButton = document.querySelector('#open-folder-button')
  const commitSelect = document.querySelector('#commit-select')
  const commitInput = document.querySelector('#commit-input')
  const commitButton = document.querySelector('#commit-button')

  // const regexp =
  //   /^(feature|bugfix|hotfix|chore|epic|design|experiment|documentation):(?!\s*$)\s/

  let commitType = 'feature'

  openFolderButton?.addEventListener('click', e => {
    vscode.postMessage({ type: 'open' })
  })

  commitSelect?.addEventListener('change', e => {
    // @ts-ignore
    commitType = e.target.value
  })

  commitButton?.addEventListener('click', e => {
    e.preventDefault()

    // @ts-ignore
    if (commitInput.value === '') {
      vscode.postMessage({
        type: 'error',
        data: {
          message: 'Commitizen Code: Commit message is empty',
        },
      })
      return
    }

    // @ts-ignore
    // if (!commitInput.value.match(regexp)) {
    //   vscode.postMessage({
    //     type: 'error',
    //     value:
    //       'Commitizen Code: Commit message is not conform to the convention',
    //   })
    //   return
    // }

    // @ts-ignore
    vscode.postMessage({
      type: 'commit',
      data: {
        'commit-type': commitType,
        // @ts-ignore
        'commit-message': commitInput.value.trim(),
        // @ts-ignore
        commit: `${commitType}: ${commitInput.value.trim()}`,
      },
    })
  })
})()
