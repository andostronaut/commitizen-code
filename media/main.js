//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
;(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi()

  document.querySelector('#commit-button')?.addEventListener('click', () => {
    vscode.postMessage({ type: 'commit' })
  })

  console.log('Commitizen Code: Script running...')
})()
