<template>
<pre class="info-list">
<b>Account</b>
{{ accountInfo }}
<!-- <b>Wallet</b>
{{ walletInfo }} -->
<!-- <b>State</b>
{{ state }} -->
<!-- <b>Theme</b>
{{ kitTheme }} -->
</pre>
</template>
  
<script >
import { onMounted } from "vue";
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
} from "@reown/appkit/vue";

export default {
  name: "InfoList",
  setup(){
    const kitTheme = useAppKitTheme();
    const state = useAppKitState();
    const accountInfo = useAppKitAccount();
    const events = useAppKitEvents();
    const { walletInfo }  = useWalletInfo();

    onMounted(() => {
      console.log("Events: ", events);
    });

    return {
      kitTheme,
      state,
      accountInfo,
      walletInfo,
    };
  },
};
</script>

<style scoped>
.info-list {
  position: fixed;
  top: 0;
  left: 0;
  text-align: left;
  font-size: 8px;
  color: red;
  padding: 10px;
}
</style>
