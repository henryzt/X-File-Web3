<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/profile">Profile</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
/* eslint-disable */
import { Options, Vue } from "vue-class-component";
import Web3 from "web3";
// @ts-expect-error
import contract from "truffle-contract";
import ensTitle from '../build/contracts/EnsTitle.json';

@Options({})
export default class App extends Vue {
  provider: any  = {};
  web3: any = {};
  account = {};
  titleApp: any = {};

  async initWeb3Account() {
    if (window.ethereum) {
      this.provider = window.ethereum;
      try {
        await window.ethereum.enable();
      } catch (error) {
          console.log("User denied account access");
      }
    } else if (window.web3) {
      console.log("User denied account access");
    } else {
      this.provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    }
    this.web3 = new Web3(this.provider);
    console.log('henryDebug this.provider', this.provider);
    console.log('henryDebug this.web3', this.web3);
    this.web3.eth.getAccounts().then((accs: any) => {
      console.log('henryDebug accs', accs);
      this.account = accs[0];
    });
  }

  async initContract() {
    const titleContract = contract(ensTitle)
    titleContract.setProvider(this.provider)
    this.titleApp = await titleContract.deployed()
    console.log("contract", this.titleApp)
    const res = await this.titleApp.getTitles("formatz.eth");
    console.log(res)
  }

  async getCrowdInfo() {}

  async created(): Promise<void> {
    //  初始化 web3及账号
    await this.initWeb3Account();
    //  初始化合约实例
    await this.initContract();
    //  获取合约的状态信息
    await this.getCrowdInfo();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
