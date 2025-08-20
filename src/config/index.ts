import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { mainnet, polygon, solana, type AppKitNetwork} from '@reown/appkit/networks'

export const projectId = import.meta.env.VITE_PROJECT_ID

if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  polygon,
  solana,
]

export const ethersAdapter = new EthersAdapter()
export const solanaAdapter = new SolanaAdapter()
