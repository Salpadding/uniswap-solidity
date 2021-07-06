import { Contract, Wallet, utils, Signer } from 'ethers'
import { waffle } from 'hardhat'

import Factory from '../artifacts/contracts/uniswap/UniswapFactory.sol/UniswapFactory.json'
import Exchange from '../artifacts/contracts/uniswap/UniswapExchange.sol/UniswapExchange.json'
import MockToken from '../artifacts/contracts/mocks/ERC20Mock.sol/ERC20Mock.json'
import { max } from './db'

export interface UniswapFixture {
    factory: Contract
    usdt: Contract
    usdc: Contract
    usdtEx: Contract
    usdcEx: Contract
}

export async function uniswapFixture([alice]: Signer[], ret: UniswapFixture, onCreate: (name: string, contract: Contract) => void) {
    if (!ret.factory) {
        // deploy exchange template contract
        let ex = await waffle.deployContract(alice, Exchange)
        // deploy factory contract
        ret.factory = (await waffle.deployContract(alice, Factory))
        // set template address
        onCreate('factory', ret.factory)
        await ret.factory.initializeFactory(ex.address)
    }

    if (!ret.usdt) {
        // deploy usdt
        ret.usdt = await waffle.deployContract(alice, MockToken, ['usdt', 'usdt', '18', utils.parseEther('1000')])
        // create exhange pair
        onCreate('usdt', ret.usdt)
        await ret.factory.createExchange(ret.usdt.address)
    }

    if (!ret.usdc) {
        // deploy usdc
        ret.usdc = await waffle.deployContract(alice, MockToken, ['usdc', 'usdc', '18', utils.parseEther('1000')])
        // create exchange pair
        onCreate('usdc', ret.usdc)
        await ret.factory.createExchange(ret.usdc.address)
    }

    if (!ret.usdtEx) {
        ret.usdtEx = new Contract(await ret.factory.getExchange(ret.usdt.address), Exchange.abi)
        onCreate('usdtEx', ret.usdtEx)
    }

    if (!ret.usdcEx) {
        ret.usdcEx = new Contract(await ret.factory.getExchange(ret.usdc.address), Exchange.abi)
        onCreate('usdcEx', ret.usdcEx)
    }

    if (
        (await ret.usdc.allowance(await alice.getAddress(), ret.usdcEx.address)).toString() == '0'
    ) {
        await ret.usdc.approve(ret.usdcEx.address, max)
    }

    if (
        (await ret.usdt.allowance(await alice.getAddress(), ret.usdtEx.address)).toString() == '0'
    ) {
        await ret.usdt.approve(ret.usdtEx.address, max)
    }

    return ret
}