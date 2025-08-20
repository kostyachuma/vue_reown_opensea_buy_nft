import { ref, computed } from 'vue'
import { useAppKit, useAppKitAccount } from '@reown/appkit/vue'
import { Chain, OpenSeaSDK, OrderSide } from 'opensea-js'
import { ethers } from 'ethers'
import { mainnet, polygon } from '@reown/appkit/networks'

export interface NFTData {
  tokenAddress: string
  tokenId: string
}

export function useNFTBuy() {
  const accountInfo = useAppKitAccount()

  const accountAddress = computed(() => accountInfo.value.address)
  const isConnected = computed(() => accountInfo.value.isConnected)

  const isLoading = ref(false)

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

  async function getOpenSeaSDK () {
    if (!isConnected.value || !window.ethereum) {
      throw new Error('Wallet not connected or web3 provider not available')
    }

    // Check API key
    const apiKey = import.meta.env.VITE_OPENSEA_API_KEY

    if (!apiKey) {
      console.warn('OpenSea API key not set - some features may be limited')
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as any)

      const signer = await provider.getSigner()
      const network = await provider.getNetwork()
      const chainId = network.chainId.toString()

      console.log('Network chainId:', chainId)
      console.log('Signer address:', await signer.getAddress())

      // Map network chain IDs to OpenSea Chain enum
      const chainMap: Record<string, Chain> = {
        [mainnet.id.toString()]: Chain.Mainnet,
        [polygon.id.toString()]: Chain.Polygon,
      }

      const selectedChain = chainMap[chainId]

      if (!selectedChain) {
        throw new Error(`Unsupported network with chainId: ${chainId}. Supported networks: Ethereum Mainnet (1), Polygon (137)`)
      }
      
      console.log('Selected OpenSea chain:', selectedChain)

      // Initialize SDK with proper configuration
      const sdk = new OpenSeaSDK(signer, {
        chain: selectedChain,
        apiKey: apiKey, // API key is optional for testnets but required for mainnet
      })

      return sdk
    } catch (error) {
      console.error('Error creating OpenSea SDK:', error)
      throw error
    }
  }

  const buyNFT = async ({ tokenAddress, tokenId }: { tokenAddress: string, tokenId: string }): Promise<void> => {
    const sdk = await getOpenSeaSDK()

    if (!sdk) throw new Error('Failed to initialize OpenSea SDK')
    if (!accountAddress.value) throw new Error('Account address not found')

    isLoading.value = true

    try {
      // First get the order from OpenSea
      const order = await sdk.api.getOrder({
        assetContractAddress: tokenAddress,
        tokenId: tokenId,
        side: OrderSide.LISTING
      })

      console.log('Order received:', order)
      console.log('Account address:', accountAddress.value)

      // Then fulfill the order
      const transactionHash = await sdk.fulfillOrder({
        order,
        accountAddress: accountAddress.value
      })

      console.log('Transaction hash:', transactionHash)
    } catch (err) {
      console.error('Error buying NFT:', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    getCurrentNetwork,
    buyNFT,
  }
}
