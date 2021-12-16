import { createStore } from 'vuex';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
// @ts-expect-error typing
import contract from "truffle-contract";
import ensTitle from "../../build/contracts/EnsTitle.json";

const chains: any = {
  "0x1" : "Ethereum mainnet",
  "0x4" : "Rinkeby Test Network",
}

export default createStore({
  state: {
    provider: {} as any,
    web3: {} as any,
    account: null,
    solApp: null,
    chainName: null,
  },
  mutations: {
    setApp(state, app) {
      state.solApp = app
    },
    setAccount(state, accounts) {
      console.log("henryDebug accounts", accounts);
      state.account = accounts[0];
      if(state.account){
        window.localStorage.setItem("lastLoggedIn", accounts[0])
      }else{
        window.localStorage.removeItem("lastLoggedIn")
      }
    }
  },
  actions: {
    // 初始化 web3及账号
    async initWeb3Account({ state, commit, dispatch }) {
      const ethereum: any = await detectEthereumProvider();
      if (!ethereum || ethereum !== window.ethereum) {
        console.error("Please install MetaMask");
        return;
      }
      state.provider = ethereum;
      state.web3 = new Web3(ethereum);
      state.chainName = chains[ethereum.chainId] ?? ethereum.chainId;
      console.log("ether", ethereum, "web3", state.web3);

      ethereum.on('chainChanged', ()=>{
        window.location.reload();
      });

      ethereum.on('accountsChanged', (accs: any) => {
        commit("setAccount", accs);
      });

      if(window.localStorage.getItem("lastLoggedIn")) {
        dispatch("login")
      }
    },
    // 初始化合约实例
    async initContract({ commit, state }) {
      const titleContract = contract(ensTitle);
      titleContract.setProvider(state.provider);
      const app = await titleContract.deployed();
      commit('setApp', app)
    },
    // 连接钱包
    async login({ commit }) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accs: any) => {
          commit("setAccount", accs);
        });
      } catch (error) {
        console.log("User denied account access", error);
      }
    }
  },
  modules: {
  },
});
