import { exec as execProcess, spawn as spawnProcess } from 'child_process'

type CmdProps = {
  exec: string
  cmd: string
}

/**@param cmd @returns {Promise}*/
function exec(cmd: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    execProcess(cmd, (err, out) => {
      if (err) {
        return reject(err)
      }

      return resolve(out)
    })
  })
}

function spawn(cmd: CmdProps): void {
  const p = spawnProcess(cmd.exec, [cmd.cmd], { cwd: '.' })

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

export { exec, spawn }
