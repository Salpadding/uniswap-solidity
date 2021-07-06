import { ethers } from 'hardhat'
import path = require('path')
import fs = require('fs')
import { Contract } from 'ethers'
import { dbGet, dbSet } from './db'
import Factory from '../artifacts/contracts/uniswap/UniswapFactory.sol/UniswapFactory.json'
import Exchange from '../artifacts/contracts/uniswap/UniswapExchange.sol/UniswapExchange.json'
import MockToken from '../artifacts/contracts/mocks/ERC20Mock.sol/ERC20Mock.json'
import { uniswapFixture, UniswapFixture } from './fixtures'



function isZeroAddress(addr: string) {
    return /^(0x)?0+$/.test(addr)
}

const NAMES = ['factory', 'usdt', 'usdc', "usdtEx", 'usdcEx']

const ABIS =  {
    factory: Factory.abi,
    usdt: MockToken.abi,
    usdc: MockToken.abi,
    usdtEx: Exchange.abi,
    usdcEx: Exchange.abi
}

export async function createFixture(): Promise<UniswapFixture> {
    let o: UniswapFixture = <UniswapFixture> {}
    const [alice] = await ethers.getSigners()

    for(let n of NAMES) {
        let addr = dbGet(n)
        if(addr) {
            o[n] = (new Contract(addr, ABIS[n])).connect(alice)
        }
    }

    await uniswapFixture([alice], o, (name, con) => dbSet(name, con.address))   
    return o
}

async function main() {
    await createFixture()
}

main().catch(console.error)