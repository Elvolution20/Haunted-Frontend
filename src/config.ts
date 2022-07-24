// import { ChainId } from '@pancakeswap-libs/sdk';

import { Configuration } from './haunted-finance/config';
import { BankInfo } from './haunted-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 51,
    networkName: 'XinFin Apothem Testnet',
    ftmscanUrl: 'https://xinfin.org',
    defaultProvider: 'https://rpc.apothem.network',
    deployments: require('./haunted-finance/deployments/deployments.testing.json'),
    externalTokens: {
      WFTM: ['0xf1277d1ed8ad466beddf92ef448a132661956621', 18],
      'HAUNTED-FTM-LP': ['0x13Fe199F19c8F719652985488F150762A5E9c3A8', 18],
      'HSHARE-FTM-LP': ['0x20bc90bB41228cb9ab412036F80CE4Ef0cAf1BD5', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    stakingLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: 51,
    networkName: 'XinFin Apothem Testnet',
    ftmscanUrl: 'https://xinfin.org',
    defaultProvider: 'https://rpc.apothem.network',
    deployments: require('./haunted-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0xf1277d1ed8ad466beddf92ef448a132661956621', 18],
      'HAUNTED-FTM-LP': ['0x13Fe199F19c8F719652985488F150762A5E9c3A8', 18],
      'HSHARE-FTM-LP': ['0x20bc90bB41228cb9ab412036F80CE4Ef0cAf1BD5', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    stakingLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding HAUNTED
        - 2 = LP asset staking rewarding HSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  HauntedFtmRewardPool: {
    name: 'Earn HAUNTED by FTM',
    poolId: 0,
    sectionInUI: 0,
    contract: 'HauntedFtmRewardPool',
    depositTokenName: 'WFTM',
    earnTokenName: 'HAUNTED',
    finished: false,
    sort: 1,
    closedForStaking: true,
  },
  HauntedFtmLPHauntedRewardPool: {
    name: 'Earn HAUNTED by HAUNTED-FTM LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'HauntedFtmLpHauntedRewardPool',
    depositTokenName: 'HAUNTED-FTM-LP',
    earnTokenName: 'HAUNTED',
    finished: false,
    sort: 5,
    closedForStaking: true,
  },
  HauntedFtmLPHShareRewardPool: {
    name: 'Earn HSHARE by HAUNTED-FTM LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'HauntedFtmLPHShareRewardPool',
    depositTokenName: 'HAUNTED-FTM-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  HshareFtmLPHShareRewardPool: {
    name: 'Earn HSHARE by HSHARE-FTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'HshareFtmLPHShareRewardPool',
    depositTokenName: 'HSHARE-FTM-LP',
    earnTokenName: 'HSHARE',
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
