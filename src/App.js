import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';

const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"enter","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPlayers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRandomNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"lottery","type":"uint256"}],"name":"getWinnerByLottery","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lotteryHistory","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lotteryId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pickWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"}] // Replace with the ABI of your Lottery contract
const CONTRACT_ADDRESS = '0x625503Af11e32F140DeB3C3048874924C82bC9FC';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [lotteryContract, setLotteryContract] = useState(null);

  useEffect(() => {
    if (web3 && accounts.length > 0) {
      const lotteryInstance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      setLotteryContract(lotteryInstance);
    }
  }, [web3, accounts]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccounts(accounts);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to interact with this dApp.');
    }
  };

  const enterLottery = async () => {
    if (!web3 || !accounts || accounts.length === 0) {
      alert('Please connect MetaMask to this dApp.');
      return;
    }

    const fee = await lotteryContract.methods.fee().call();
    await lotteryContract.methods.enter().send({
      from: accounts[0],
      value: fee,
    });
  };

  const pickWinner = async () => {
    await lotteryContract.methods.pickWinner().send({ from: accounts[0] });
  };

  return (
    <div className="App">
      <h1>Lottery dApp</h1>
      {accounts.length === 0 ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <button onClick={enterLottery}>Enter Lottery</button>
          <button onClick={pickWinner}>Pick Winner</button>
        </>
      )}
    </div>
  );
}

export default App;
