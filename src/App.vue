
<template>
  <div class="pages">
    <appkit-button />
    <NFTCard />
   </div>
</template>


<script lang="ts">
import {
  createAppKit,
} from '@reown/appkit/vue'
import {ethersAdapter , networks, projectId } from './config/index'

import ActionButtonList from "./components/ActionButton.vue"
import InfoList from "./components/InfoList.vue";
import NFTCard from "./components/NFTCard.vue";

// Initialize AppKit
createAppKit({
  adapters: [ethersAdapter],
  networks,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  metadata: {
    name: 'AppKit Vue Example',
    description: 'AppKit Vue Example',
    url: window.location.origin,
    icons: ['https://avatars.githubusercontent.com/u/179229932?s=200&v=4']
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

export default {
  name: "App",
  components: {
    ActionButtonList,
    InfoList,
    NFTCard
  },
};
</script>

<style scoped>
.pages {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 50px 0;
  min-height: 100vh;
}
</style>
