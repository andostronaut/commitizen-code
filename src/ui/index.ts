function renderIntroUI(): string {
  return `
    <div>
      <span class="intro">Welcome to Commitizen Code</span>
      <br>
      <br>
      <span class="link">This is the VSCode Extension for Commitizen CLI, you can found it <a href="https://www.npmjs.com/package/commitizen-cli">here</a></span>
      <br>
      <br>
    </div>
  `
}

function renderCommitFormUI(): string {
  return `
    <form id="commit-form">
      <div class="input-container">
        <select id="commit-select" name="commit-select">
          <option value="feature">Feature</option>
          <option value="bugfix">Bugfix</option>
          <option value="hotfix">Hotfix</option>
          <option value="chore">Chore</option>
          <option value="epic">Epic</option>
          <option value="design">Design</option>
          <option value="experiment">Experiment</option>
          <option value="documentation">Documentation</option>
        </select>
        <br>

        <textarea id="commit-input" name="commit-input" placeholder="Commit message" rows="1" maxlength="124"></textarea>
      </div>

      <button id="commit-button">Commit</button>
    </form>
  `
}

function renderOpenFolderUI(): string {
  return `
    <div id="open-folder">
      <span>Open Folder</span>
      <br>
      <br>
      <button id="open-folder-button">Open</button>
    </div>
  `
}

export { renderIntroUI, renderCommitFormUI, renderOpenFolderUI }
