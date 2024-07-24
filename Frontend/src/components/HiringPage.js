import React, { useState, useEffect } from "react";
import { web3, loadContract } from '../web3';
import Card from "./Card";
import Form from "./Form";
import "../styles/HiringPage.css";
import Image from "../assets/Group 133.png";
import { Link } from "react-router-dom";

const HiringPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [account, setAccount] = useState('');
  const [contractData, setContractData] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        // Request accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log(accounts[0]);

        // Load contract
        const myContract = await loadContract('JobPortal');

        // Check if the network supports EIP-1559
        const block = await web3.eth.getBlock('latest');
        let transactionConfig;

        if (block.baseFeePerGas !== undefined) {
          // Network supports EIP-1559
          const maxPriorityFeePerGas = web3.utils.toWei('2', 'gwei');
          const maxFeePerGas = web3.utils.toWei('50', 'gwei');
          transactionConfig = {
            from: accounts[0],
            maxPriorityFeePerGas,
            maxFeePerGas,
          };
        } else {
          // Network does not support EIP-1559
          const gasPrice = await web3.eth.getGasPrice();
          transactionConfig = {
            from: accounts[0],
            gasPrice,
          };
        }

        // Call contract method to get all jobs
        console.log('Fetching all jobs...');
        // const data = await myContract.methods.getAllJobs().call();
        // setContractData(data);
        // console.log(data);
        const data = await myContract.methods.getAllJobs().call(transactionConfig);
        setContractData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching accounts or loading contract:', error);
      }
    }

    load();
  }, []);

  const handleApplyClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="landingPage">
        <nav className="nav">
          <div>
            <button className="button2">Login/Signup</button>
          </div>
        </nav>
        <div id="Events_container">
          <div id="Events">
            <div className="events-container">
              <div className="events-grid">
                {contractData.map((job, index) => (
                  <Card key={index} job={job} handleApplyClick={handleApplyClick} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <button className="close-btn" onClick={handleCloseForm}> x </button>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringPage;
