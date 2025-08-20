<template>
  <div class="nft-card">
    <div class="input-field">
      <label for="contract-address">Contract Address:</label>
      <input
        id="contract-address"
        v-model="state.contractAddress"
        type="text"
        placeholder="0x..."
        class="nft-input"
      />
    </div>

    <div class="input-field">
      <label for="token-id">Token ID:</label>
      <input
        id="token-id"
        v-model="state.tokenId"
        type="text"
        placeholder="123"
        class="nft-input"
      />
    </div>

    <button
      :disabled="!isConnected || isLoading"
      :class="{
        'loading': isLoading,
        'disabled': !isConnected
      }"
      class="buy-button"
      @click="handleBuy"
    >
      <span v-if="isLoading" class="loading-spinner"></span>
      {{ isConnected ? (isLoading ? 'Buying...' : 'Buy NFT') : 'Connect Wallet' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useAppKitAccount } from '@reown/appkit/vue'
import { useNFTBuy } from '../composables/useNFTBuy'
import { mainnet, polygon } from '@reown/appkit/networks'

const accountInfo = useAppKitAccount()
const isConnected = computed(() => accountInfo.value.isConnected)

const { isLoading, buyNFT, getCurrentNetwork } = useNFTBuy()

const state = reactive({
  contractAddress: '0x579368942f7e63eb268405d2ae1d10504319ae81',
  tokenId: '1'
})

const DEFAULTS: Record<string, { tokenAddress: string; tokenId: string }> = {
  [polygon.id.toString()]: { tokenAddress: '0xf51a496d3e01d44d34fb177e23240ee2e3ed2e42', tokenId: '1' },
  [mainnet.id.toString()]: { tokenAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', tokenId: '4959' },
}

onMounted(async () => {
  const key = (await getCurrentNetwork())?.toString() ?? mainnet.id.toString()
  const { tokenAddress, tokenId } = DEFAULTS[key] ?? DEFAULTS[mainnet.id.toString()]

  state.contractAddress = tokenAddress
  state.tokenId = tokenId
})

const handleBuy = async () => buyNFT({
  tokenAddress: state.contractAddress,
  tokenId: state.tokenId
})
</script>

<style scoped>
.nft-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nft-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.input-field {
  margin-bottom: 20px;
}

.input-field label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.nft-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #333;
  background: #fff;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.nft-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.nft-input::placeholder {
  color: #999;
}

.nft-input:hover {
  border-color: #cbd5e0;
}

.buy-button {
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.buy-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.buy-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.buy-button.disabled {
  background: #e0e0e0;
  color: #999;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
