require("dotenv").config();
const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const accountAddress = process.env.ACCOUNT_ADDRESS;
const platformAddress = process.env.PLATFORM_ADDRESS;
const { quizContractAddress } = require("../config/Cryptopati");
const Cryptopati = require("../config/Cryptopati.json");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/4d461d5e7587469ab541796d232b6a6f"
  )
);

const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
const PLATFORM_PRIVATE_KEY = process.env.PLATFORM_PRIVATE_KEY;
web3.eth.accounts.wallet.add(PLATFORM_PRIVATE_KEY);
//web3.eth.accounts.wallet.add(ACCOUNT_PRIVATE_KEY);

const answerQuestion = async (req, res) => {
  const myContract = new web3.eth.Contract(Cryptopati.abi, quizContractAddress);
  try {
    const data = await myContract.methods
      .winQuestion("1", accountAddress)
      .encodeABI();
    const nonce = (await web3.eth.getTransactionCount(platformAddress)) + 1;
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 500000;
    const rawTransaction = {
      from: platformAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      to: accountAddress,
      data: data,
    };
    console.log(rawTransaction);
    const receipt = await web3.eth.sendTransaction(rawTransaction);
    console.log(receipt);
    res.send(receipt);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { answerQuestion };
