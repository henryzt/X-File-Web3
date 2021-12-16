import { createStore } from 'vuex';
import Web3 from "web3";
// @ts-expect-error typing
import contract from "truffle-contract";
import ensTitle from "../../build/contracts/EnsTitle.json";

export default createStore({
  state: {
    provider: {} as any,
    web3: {} as any,
    account: null,
    solApp: null,
  },
  mutations: {
    setApp(state, app) {
      state.solApp = app
    }
  },
  actions: {
    // 初始化 web3及账号
    async initWeb3Account({ state }) {
      if (window.ethereum) {
        state.provider = window.ethereum;
      } else if (window.web3) {
        console.log("User denied account access");
      } else {
        state.provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      }
      state.web3 = new Web3(state.provider);
      console.log("henryDebug state.provider", state.provider);
      console.log("henryDebug state.web3", state.web3);
    },
    // 初始化合约实例
    async initContract({ commit, state }) {
      const titleContract = contract(ensTitle);
      titleContract.setProvider(state.provider);
      const app = await titleContract.deployed();
      commit('setApp', app)
    },
    // 连接钱包
    async login({ state }) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accs: any) => {
          console.log("henryDebug accounts", accs);
          state.account = accs[0];
        });
      } catch (error) {
        console.log("User denied account access");
      }
    }
  },
  modules: {
  },
});
