import Web3 from "web3";

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
    //
    return accounts[0];
}


export async function addCampaign(){

}


export async function getLastCampaignId(){
    
}