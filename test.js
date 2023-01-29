require("dotenv").config();
const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const ethers = require("ethers");
const accountAddress = process.env.ACCOUNT_ADDRESS;
const platformAddress = process.env.PLATFORM_ADDRESS;
const { accuCoinContractAddress } = require("./config/accucoin");
const { quizContractAddress } = require("./config/Cryptopati");
const AccuCoin = require("./config/AccuCoin.json");
const Cryptopati = require("./config/Cryptopati.json");
//const { quizABI, quizContractAddress } = require("./config/quiz");
//const { accucoinABI, accuCoinContractAddress } = require("./config/accucoin");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/4d461d5e7587469ab541796d232b6a6f"
  )
);
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
const PLATFORM_PRIVATE_KEY = process.env.PLATFORM_PRIVATE_KEY;
web3.eth.accounts.wallet.add(ACCOUNT_PRIVATE_KEY);
web3.eth.accounts.wallet.add(PLATFORM_PRIVATE_KEY);

const transaction = async () => {
  const myContract = new web3.eth.Contract(quizABI, quizContractAddress);
  const data = await myContract.methods.claimTokens().encodeABI();
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = await myContract.methods
    .claimTokens()
    .estimateGas({ from: accountAddress });

  const rawTransaction = {
    from: accountAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: quizContractAddress,
    data: data,
  };
  console.log(rawTransaction);
  const receipt = await web3.eth.sendTransaction(rawTransaction);
  console.log(receipt);
};

//transaction();

const minter = async () => {
  const accuContract = new web3.eth.Contract(
    accucoinABI,
    accuCoinContractAddress
  );
  // const minterRole = await accuContract.methods.MINTER_ROLE().call();
  // const DEFAULT_ADMIN_ROLE = await accuContract.methods
  //   .DEFAULT_ADMIN_ROLE()
  //   .call();
  const data = await accuContract.methods
    .addMinterRole(accountAddress)
    .encodeABI();
  //const data = accuContract.methods.mint(accountAddress, 100000).encodeABI();
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = await accuContract.methods
    .addMinterRole(accountAddress)
    .estimateGas({ from: accountAddress });

  const rawTransaction = {
    from: accountAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: accuCoinContractAddress,
    data: data,
  };
  console.log(rawTransaction);
  const receipt = await web3.eth.sendTransaction(rawTransaction);
  //   const tx = new Tx(rawTransaction);
  //   tx.sign(Buffer.from(PRIVATE_KEY, "hex"));
  //   const serializedTx = tx.serialize();
  //   console.log(serializedTx);
  console.log(receipt);
};

//minter();

const whitelist = async () => {
  const accuContract = new web3.eth.Contract(
    accucoinABI,
    accuCoinContractAddress
  );
  const data = await accuContract.methods
    .addToWhitelist("0x0000000000000000000000000000000000000000")
    .encodeABI();
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 500000;
  const rawTransaction = {
    from: accountAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: accuCoinContractAddress,
    data: data,
  };
  console.log(rawTransaction);
  const receipt = await web3.eth.sendTransaction(rawTransaction);
  console.log(receipt);
};

//whitelist();

const balance = async () => {
  const accuContract = new web3.eth.Contract(
    AccuCoin.abi,
    accuCoinContractAddress
  );
  const balance = await accuContract.methods.balanceOf(accountAddress).call();

  console.log(balance);
};

//balance();

const allowance = async () => {
  const accuContract = new web3.eth.Contract(
    accucoinABI,
    accuCoinContractAddress
  );
  const balance = await accuContract.methods
    .allowance(accountAddress, accuCoinContractAddress)
    .call();

  console.log(balance);
};
//allowance();

const approve = async () => {
  const myContract = new web3.eth.Contract(quizABI, quizContractAddress);
  const accuContract = new web3.eth.Contract(
    accucoinABI,
    accuCoinContractAddress
  );
  const data = accuContract.methods
    .approve(accuCoinContractAddress, 10)
    .encodeABI();

  //const eth = ethers.utils.parseEther("2");
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 5000000;
  //.estimateGas({ from: accountAddress });

  const rawTransaction = {
    from: accountAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: accuCoinContractAddress,
    data: data,
  };
  console.log(rawTransaction);
  const receipt = await web3.eth.sendTransaction(rawTransaction);
  console.log(receipt);
};

//approve();

// const addQuestion = async () => {
//   const questionId = "1";
//   const multiplier = 5;
//   const timeDuration = 10;
//   const quizContract = new web3.eth.Contract(quizABI, quizContractAddress);
//   const data = quizContract.methods
//     .addQuestion(questionId, multiplier, timeDuration)
//     .encodeABI();
// };

// //addQuestion();

const unlock = async () => {
  const myContract = new web3.eth.Contract(quizABI, quizContractAddress);
  const data = myContract.methods.unlockQuestion("1", 2).encodeABI();
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 5000000;

  const rawTransaction = {
    from: accountAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: quizContractAddress,
    data: data,
  };
  console.log(rawTransaction);
  const receipt = await web3.eth.sendTransaction(rawTransaction);
  console.log(receipt);
};
//unlock();

const add = async (req, res) => {
  const myContract = new web3.eth.Contract(quizABI, quizContractAddress);
  const data = myContract.methods.addQuestion("1", 5, 10).encodeABI();
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 500000;
  //.estimateGas({ from: accountAddress });

  const rawTransaction = {
    from: accountAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: quizContractAddress,
    data: data,
  };
  console.log(rawTransaction);
  const receipt = await web3.eth.sendTransaction(rawTransaction);
  console.log(receipt);
};
//add();

const addQuestions = async () => {
  const myContract = new web3.eth.Contract(Cryptopati.abi, quizContractAddress);
  //myContract.options.from = accountAddress;
  const nonce = await web3.eth.getTransactionCount(accountAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = await myContract.methods
    .addQuestion("8", 5)
    .estimateGas({ from: accountAddress });
  const balance = await myContract.methods.addQuestion("8", 5).encodeABI();
  const rawTransaction = {
    from: accountAddress,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gasLimit,
    to: quizContractAddress,
    data: balance,
  };
  const receipt = await web3.eth.sendTransaction(rawTransaction);
  console.log(receipt);
  if (receipt.status === true) console.log(receipt.status);
};
addQuestions();

const questionExists = async () => {
  const myContract = new web3.eth.Contract(Cryptopati.abi, quizContractAddress);
  const balance = await myContract.methods.questionExist("4").call();

  console.log(balance);
};
//questionExists();

const answer = async () => {
  //const quizAddress = web3.utils.toChecksumAddress(quizContractAddress);
  const myContract = new web3.eth.Contract(Cryptopati.abi, quizContractAddress);
  const data = await myContract.methods
    .winQuestion("3", accountAddress)
    .encodeABI();
  const nonce = await web3.eth.getTransactionCount(platformAddress);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 700000;
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
};
answer();

const platform = async () => {
  const myContract = new web3.eth.Contract(quizABI, quizContractAddress);
  const balance = await myContract.methods.platform().call();

  console.log(balance);
};
//platform();
//console.log(Date.now());
//console.log(Cryptopati.abi);
