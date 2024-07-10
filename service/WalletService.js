import { ethers } from 'ethers';
import dotenv from "dotenv";

dotenv.config();
export default process.env;

const BLOCKCHAIN_NODE=process.env.BLOCKCHAIN_NODE;
const provider = new ethers.JsonRpcProvider(BLOCKCHAIN_NODE);

export function createWallet(){
    return ethers.Wallet.createRandom(provider);
}

export function recoverWalletUsingPK(privateKey){
    const wallet = new ethers.Wallet(privateKey, provider);
    
     return wallet
}

export function recoverWalletUsingMnemonic(mnemonic){
    return ethers.Wallet.fromPhrase(mnemonic, provider);
}

export async function getBalance(address){
    console.log("");
    console.log("Checking balance for address: ", address);
    console.log("Server Addrress: ", BLOCKCHAIN_NODE);
    console.log("");

    const balance = await provider.getBalance(address);
    return {
        balanceInWei: balance,
        balanceInEth: ethers.formatEther(balance)
    }
}

export function addressIsValid(address){
    return ethers.utils.isAddress(address);
}

async function buildTransaction(fromWalletAddress, toWalletAddress, amountInEth){
    const amount = ethers.parseEther(amountInEth); //in WEI
    const tx = {
        to: toWalletAddress,
        value: amount
    };

    const feeData = await provider.getFeeData(); // wei/gas
    const gasLimit = 21000n;
    const gasPrice = feeData.gasPrice;
    const txFee = gasLimit * gasPrice;

    const balance = await provider.getBalance(fromWalletAddress);

    if(balance < (amount + txFee)){
        throw new Error("Insufficient balance!");
    }

    return tx;
}

export async function sendTransaction(fromWallet, toWalletAddress, amountInEth){
    const tx = await buildTransaction(fromWallet.address, toWalletAddress, amountInEth);

    return await fromWallet.sendTransaction(tx);;
}

export async function getTransaction(hash){
    return provider.getTransaction(hash);
}