import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider); 
//currentProvider that is injected in web3 is given over to our local web3 instance
// - that gives us a copy of web3 which has been entirely pre-configured and completly set up without additional work from us

//instead of MetaMask's deafult version 0.20 we'll be using our local new 1.00 version.

export default web3;