/**
 * @param {Array<Object>} untrackedGroup
 * @returns {boolean}
 */
function hasUntrackedGroup(untrackedGroup: Array<Object>): boolean {
  return Array.isArray(untrackedGroup) && untrackedGroup.length > 0
}

/**
 * @param {Array<Object>} workingTreeGroup
 * @returns {boolean}
 */
function hasWorkingTreeGroup(workingTreeGroup: Array<Object>): boolean {
  return Array.isArray(workingTreeGroup) && workingTreeGroup.length > 0
}

export { hasUntrackedGroup, hasWorkingTreeGroup }
