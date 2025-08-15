import { ref, computed } from 'vue'
import { useAppKit, useAppKitAccount } from '@reown/appkit/vue'
import { Chain, OpenSeaSDK } from 'opensea-js'
import { ethers } from 'ethers'
import { mainnet, sepolia, bsc } from '@reown/appkit/networks'

export interface NFTData {
  tokenAddress: string
  tokenId: string
}

export function useNFTBuy() {
  const accountInfo = useAppKitAccount()
  const accountAddress = computed(() => accountInfo.value.address || '')

  const isConnected = computed(() => accountInfo.value.isConnected)
  const isLoading = ref(false)

  // Testnet NFT data - you can replace with actual testnet NFT addresses
  const testnetNFTData: NFTData = {
    tokenAddress: '0x1e0049783f008a0085193e00003d00cd54003c71', // Replace with actual testnet NFT contract
    tokenId: '1',
  }

  // Mainnet NFT data (BAYC example)
  const mainnetNFTData: NFTData = {
    tokenAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    tokenId: '4959',
  }

  // BSC NFT data
  const bscNFTData: NFTData = {
    tokenAddress: '0x0000000000000000000000000000000000000000', // Replace with actual BSC NFT contract
    tokenId: '1',
  }

  // Get current network from wallet
  const getCurrentNetwork = async () => {
    if (!window.ethereum) return null
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const network = await provider.getNetwork()
      return network.chainId
    } catch (error) {
      console.error('Error getting network:', error)
      return null
    }
  }

  // Check if current network is testnet
  const isTestnet = async () => {
    const chainId = await getCurrentNetwork()
    if (!chainId) return false
    
    // Testnet chain IDs
    const testnetChainIds = [
      BigInt(sepolia.id), // 11155111
    ]
    
    return testnetChainIds.includes(chainId)
  }

  // Check if current network is BSC
  const isBSC = async () => {
    const chainId = await getCurrentNetwork()
    if (!chainId) return false
    
    return chainId === BigInt(bsc.id) // 56
  }

  // Get appropriate NFT data based on network
  const getNFTData = async (): Promise<NFTData> => {
    const testnet = await isTestnet()
    const bscNetwork = await isBSC()
    
    if (testnet) return testnetNFTData
    if (bscNetwork) return bscNFTData
    return mainnetNFTData
  }

  async function getOpenSeaSDK () {
    if (!isConnected.value || !window.ethereum) return null
    
    // Use the provider from the connected wallet
    const provider = new ethers.BrowserProvider(window.ethereum as any)

    // Get the signer from the connected wallet
    const signer = await provider.getSigner()

    // Determine the chain based on current network
    // Note: OpenSea SDK doesn't directly support BSC, so we'll use Mainnet as fallback
    const chain = Chain.Mainnet

    return new OpenSeaSDK(
      signer,
      {
        chain,
        apiKey: import.meta.env.VITE_OPENSEA_API_KEY,
      }
    )
  }

  const buyNFT = async ({ tokenAddress, tokenId }: { tokenAddress: string, tokenId: string }) => {
    const sdk = await getOpenSeaSDK()
    if (!sdk) throw new Error('Failed to initialize OpenSea SDK')

    isLoading.value = true

    try {
      // First get the order from OpenSea
      const order = await sdk.api.getOrder({
        assetContractAddress: tokenAddress,
        tokenId: tokenId,
        side: 'ask' as any
      })

      alert(order)

      // Then fulfill the order
      const response = await sdk.fulfillOrder({
        order,
        accountAddress: accountAddress.value
      })

      console.log('Order fulfilled:', response)
    } catch (err) {
      console.error('Error buying NFT:', err)
      alert(err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    testnetNFTData,
    mainnetNFTData,
    bscNFTData,
    getNFTData,
    isTestnet,
    isBSC,
    isLoading,
    buyNFT,
  }
}
