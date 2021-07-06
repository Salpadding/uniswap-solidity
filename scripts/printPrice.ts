import { parseEther } from 'ethers/lib/utils'
import { createFixture } from './deploy'

async function main() {
    const fix = await createFixture()
    const price = await fix.usdcEx.getEthToTokenInputPrice(parseEther('1'))
    console.log(price.toString())
}

main().catch(console.error)