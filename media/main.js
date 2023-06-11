//@ts-check

// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
;(function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi()
  const commitButton = document.querySelector('#commit-button')
  const commitInput = document.querySelector('#commit-input')

  const regexp =
    /^(feature|bugfix|hotfix|chore|epic|design|experiment|documentation):(?!\s*$)\s/

  commitButton?.addEventListener('click', () => {
    // @ts-ignore
    if (commitInput.value === '') {
      vscode.postMessage({
        type: 'error',
        value: 'Commitizen Code: Commit message is empty',
      })
      return
    }

    // @ts-ignore
    if (!commitInput.value.match(regexp)) {
      vscode.postMessage({
        type: 'error',
        value:
          'Commitizen Code: Commit message is not conform to the convention',
      })
      return
    }

    // @ts-ignore
    vscode.postMessage({ type: 'commit', value: commitInput.value })
  })
})()
