//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
;(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi()
  const commitButton = document.querySelector('#commit-button')
  const commitInput = document.querySelector('#commit-input')

  commitButton?.addEventListener('click', () => {
    // @ts-ignore
    if (commitInput.value === '') {
      vscode.postMessage({ type: 'empty-commit-message' })
      return
    }

    // @ts-ignore
    vscode.postMessage({ type: 'commit', value: commitInput.value })
  })
})()
