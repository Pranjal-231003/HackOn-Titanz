import Web3 from 'web3';

// Initialize web3 instance
const web3 = new Web3(Web3.givenProvider || 'https://rpc.cardona.zkevm-rpc.com');

// Function to load contract JSON file dynamically
const loadContract = async (contractName) => {
  try {
    // Dynamically import the contract JSON file
    const contractJSON = await import(`./contracts/${contractName}.json`);
    const contractABI = contractJSON.abi;
    
    // Get the network ID
    const networkId = await web3.eth.net.getId();
    // const networkId = await web3.eth.net.getId();
console.log(`Network ID: ${networkId}`);

    
    // Get the contract address for the current network
    const contractAddress = contractJSON.networks[networkId]?.address;

    // If the contract is not deployed on the current network, throw an error
    if (!contractAddress) {
      throw new Error(`Contract ${contractName} not deployed on the current network (network ID: ${networkId})`);
    }

    // Return the contract instance
    return new web3.eth.Contract(contractABI, contractAddress);
  } catch (error) {
    console.error(`Error loading contract ${contractName}:`, error);
    throw error;
  }
};

// Export web3 and loadContract function
export { web3, loadContract };
