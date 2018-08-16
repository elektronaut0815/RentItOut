import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //in browser & metamask installed
  web3 = new Web3(window.web3.currentProvider);
} else {
  //on server or metamask is not installed
  const provider = new Web3.providers.HttpProvider(
    process.env.INFURA_URL
  );
  web3 = new Web3(provider);
}

export default web3;
