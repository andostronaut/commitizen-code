import * as process from 'child_process'

/**@param cmd @returns {Promise}*/
function exec(cmd: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    process.exec(cmd, (err, out) => {
      if (err) {
        return reject(err)
      }

      return resolve(out)
    })
  })
}

/**@param cmd*/
function spawn(cmd: CmdProps): void {
  const p = process.spawn(cmd.exec, [cmd.cmd], { cwd: '.' })

  p.stdout.on('data', data => {
    console.log('stdout: ' + data.toString())
  })

  p.stderr.on('data', data => {
    console.log('stderr: ' + data.toString())
  })

  p.on('close', code => {
    console.log('closed: ' + code)
  })
}

/**@param command @param args*/
export function executeCommand(command: string, args: string): String {
  let argument: string = args
  let cmd: string = command + ' ' + argument

  const proc = process.spawnSync(cmd, {
    shell: true,
    encoding: 'utf8',
  })

  let procData = proc.stdout.toString()

  if (proc !== null) {
    if (proc.stdout !== null && proc.stdout.toString() !== '') {
      procData = proc.stdout.toString()
    }
    if (proc.stderr !== null && proc.stderr.toString() !== '') {
      const procErr = proc.stderr.toString()
      procData = procErr
    }
  }

  return procData
}

export { exec, spawn }
