import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, sepolia, bsc, type AppKitNetwork} from '@reown/appkit/networks'

export const projectId = import.meta.env.VITE_PROJECT_ID

if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  // Mainnet networks
  mainnet,
  bsc,
  // Testnet networks
  sepolia,
]

export const ethersAdapter = new EthersAdapter()
