import { parseEther } from 'ethers/lib/utils'
import { createFixture } from './deploy'
import { min, max } from './db'


// 10 eth + 10 udsc
// 10 eth + 10 usdt
async function main() {
    const fixture = await createFixture()

    await fixture.usdtEx.addLiquidity(min, parseEther('10'), max, { value: parseEther('10') })
    await fixture.usdcEx.addLiquidity(min, parseEther('10'), max, { value: parseEther('10') })
}

main().catch(console.error)