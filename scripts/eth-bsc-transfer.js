const BridgeEth = artifacts.require('./BridgeEth.sol');

const privKey ='1900a75eb1bf5eee52c4c854844dcb8e6429fb203a0bfef7d57a095b6b1eafc4';

module.exports = async done => {
  const nonce = 1; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  const amount = 1000;
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 
  await bridgeEth.burn(accounts[0], amount, nonce, signature);
  done();
}
