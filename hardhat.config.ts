import "@nomiclabs/hardhat-waffle"
import 'hardhat-deploy'

const privateKey = '1388549e5b0385152f243c45b013f59f8c667b30dacf21b8c84f2ce6215ffa6b'

export default {
  solidity: {
    version: '0.5.3',
    settings: {
      optimizer: { enabled: true, runs: 200 }
    },
  },
  networks: {
    tdos: {
      url: 'http://localhost:7010',
      accounts: [privateKey]
    },
    geth: {
      url: 'http://localhost:8545',
      accounts: [privateKey]
    }    
  }  
};

