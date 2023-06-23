import * as cp from 'child_process'

function exec(cmd: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    cp.exec(cmd, (err, out) => {
      if (err) {
        return reject(err)
      }

      return resolve(out)
    })
  })
}

export default exec
