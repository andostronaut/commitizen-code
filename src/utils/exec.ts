import { spawn } from 'child_process'

type CmdProps = {
  exec: string
  cmd: string
}

// function exec(cmd: string): Promise<string> {
//   return new Promise<string>((resolve, reject) => {
//     cp.exec(cmd, (err, out) => {
//       if (err) {
//         return reject(err)
//       }

//       return resolve(out)
//     })
//   })
// }

function exec(cmd: CmdProps) {
  const p = spawn(cmd.exec, [cmd.cmd], { cwd: '.' })

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

export default exec
