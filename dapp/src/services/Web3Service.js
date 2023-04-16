import Web3 from "web3";
import ABI from "./ABI.json";

/**
 * Add contract address, created in DonateCrypto.sol deployment
 * 
 * Eg in testnet:
 * https://testnet.bscscan.com/address/0xd1dff7e1a00d486d8e5cf183124f9086eaf6c154 
 */
const CONTRACT_ADDRESS = "0xD1dFF7e1a00d486D8E5CF183124f9086EAF6C154";


/**
 * Connect to wallet
 */
export async function doLogin() {
    // check if wallet exists
    if(!window.ethereum){
        throw new Error("No MetaMask found!");
    }
    // connect
    const web3 = new Web3(window.ethereum);
    // request permission / get accounts array
    const accounts = await web3.eth.requestAccounts();
    // check if accounts exists and returned
    if (!accounts || !accounts.length){
        throw new Error("Wallet not found/allowed.");
    }
    // save wallet account on localstorage
    localStorage.setItem("wallet", accounts[0])
    //
    return accounts[0];
}


/**
 * Get contract
 */
function getContract() {
    // access wallet
    const web3 = new Web3(window.ethereum);
    // get wallet account
    const from = localStorage.getItem("wallet");
    // get contract
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}


/**
 * Create a new campaign
 */
export async function addCampaign(campaign){
    const contract = getContract();
    // use send, to write data
    return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send();
}


/**
 * Return last campaign ID
 */
export function getLastCampaignId() {
    const contract = getContract();
    //use call, to read data
    return contract.methods.nextId().call();
}