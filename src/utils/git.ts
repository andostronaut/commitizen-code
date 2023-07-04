function hasUntrackedGroup(untrackedGroup: Array<Object>) {
  return Array.isArray(untrackedGroup) && untrackedGroup.length > 0
}

function hasWorkingTreeGroup(workingTreeGroup: Array<Object>) {
  return Array.isArray(workingTreeGroup) && workingTreeGroup.length > 0
}

export { hasUntrackedGroup, hasWorkingTreeGroup }
