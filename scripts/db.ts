import path = require('path')
import fs = require('fs')


export const min = '0'
export const max = '0x' + mul('ff', 32)

function mul(x: string, n: number): string{
    let r = ''
    for(let i = 0; i < n; i++) {
        r += x
    }
    return r
}


function _dir(d: string) {
    return path.join(__dirname, d)
}

const _dbFile = _dir('../db.json')

export function dbSet(k: string, v: string) {
    const b = fs.existsSync(_dbFile)
    let o = b ? JSON.parse(
        fs.readFileSync(_dbFile, 'ascii')
    ) : {}

    o[k] = v
    fs.writeFileSync(_dbFile, JSON.stringify(o))
}

export function dbGet(k: string): string {
    const b = fs.existsSync(_dbFile)
    if (!b)
        return ''

    let o = JSON.parse(fs.readFileSync(_dbFile, 'ascii'))
    return o[k]
}