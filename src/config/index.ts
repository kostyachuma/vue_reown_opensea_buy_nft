import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { mainnet, sepolia, polygon, solana, type AppKitNetwork} from '@reown/appkit/networks'

export const projectId = import.meta.env.VITE_PROJECT_ID

if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  // Mainnet networks
  mainnet,
  polygon,
  solana,
  // Testnet networks
  sepolia,
]

export const ethersAdapter = new EthersAdapter()
export const solanaAdapter = new SolanaAdapter()
