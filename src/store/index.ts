import { createStore } from 'vuex';
import { markRaw } from 'vue';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
// @ts-expect-error typing
import contract from "truffle-contract";
// @ts-expect-error typing
import ENS, { getEnsAddress } from '@ensdomains/ensjs'
import ensTitle from "../../build/contracts/EnsTitle.json";

const chains: any = {
  "0x1" : "Ethereum mainnet",
  "0x4" : "Rinkeby Test Network",
}

export default createStore({
  state: {
    provider: {} as any,
    web3: {} as any,
    ens: {} as any,
    account: null,
    solApp: null,
    ensName: null,
    chainName: null,
    metaMaskLoading: false
  },
  mutations: {
    setApp(state, app) {
      state.solApp = app
    },
    async setAccount(state, accounts) {
      console.log("henryDebug accounts", accounts);
      const address = accounts[0]
      state.account = address;
      state.web3.eth.defaultAccount = address;
      if(state.account){
        window.localStorage.setItem("lastLoggedIn", address);
        let ensName;

        ({ name: ensName } = await state.ens.getName(address))
        state.ensName = ensName;
        const addressCheck = await state.ens.name(ensName).getAddress();
        // Check to be sure the reverse record is correct. skip check if the name is null
        if(ensName == null || address.toLowerCase() != addressCheck.toLowerCase()) {
          ensName = null;
        }
        state.ensName = ensName;
      }else{
        window.localStorage.removeItem("lastLoggedIn");
        state.ensName = null;
      }
    },
    setChainName(state){
      const ethereum = window.ethereum;
      state.chainName = chains[ethereum.chainId] ?? ethereum.chainId;
    },
    setMetaLoading(state, loading){
      state.metaMaskLoading = loading;
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
      const ens = new ENS({ provider: ethereum, ensAddress: getEnsAddress('1') });
      state.ens = markRaw(ens);

      commit("setChainName");
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
        commit("setMetaLoading", true);
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accs: any) => {
          commit("setAccount", accs);
          commit("setChainName");
        });
      } catch (error) {
        console.log("User denied account access", error);
      }
      commit("setMetaLoading", false);
    }
  },
  modules: {
  },
});
