import { getAddressBalance } from "./useCase/GetBalance.js";
import { generateWallet } from "./useCase/CreateWallet.js";
import { restoreWalletMnemonic, restoreWalletPK } from "./useCase/RestoreWallet.js";
import { sendTx } from "./useCase/SendTransaction.js";
import { searchTransaction } from "./useCase/SearchTransaction.js";

import { createInterface } from "readline";
import dotenv from "dotenv";

dotenv.config();
export default process.env;

const SYMBOL = process.env.SYMBOL;

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

let myWallet = null;

function menu(){
    setTimeout(() => {
        console.clear();
        const isLogged = myWallet ? true : false;
        if (myWallet)
            console.log(`You are logged, your Address is ${myWallet.address}!\n\n`);
        else
            console.log("You are not logged!\n\n");

        console.log("Please, choose one of the options below to continue:\n\n");

        console.log("1 - Create Wallet");
        console.log("2 - Restore Wallet");
        console.log("3 - Balance" + (isLogged ? "" : " - Need to login first!"));
        console.log(`4 - Send ${SYMBOL} Transaction` + (isLogged ? "" : " - Need to login first!"));
        console.log("5 - Search Transaction");
        console.log("6 - Exit");
        console.log(" ");
        rl.question("Choose your option: ", async (answer) => {
            let response = null;
            switch(answer){
                case "1":
                    response = generateWallet();
                    break;
                case "2":
                    response = await recoverWallet();
                    break;
                case "3":
                    (isLogged ? response = await getAddressBalance(myWallet) : response = {message: "You are not logged!"});
                    break;
                case "4":
                    (isLogged ? response = await sendTransaction() : response = {message: "You are not logged!"});
                    break;
                case "5":
                    response = await searchByHashTransaction();
                    break;
                case "6":
                    rl.close();
                    break;
                default:
                    console.log("Invalid Option! Try again.");
                    menu();
                    break;
            }

            if (response)
                showResult(response);
        });
        
    }, 1000);   
}

function preMenu(){
    console.log(" ");
    rl.question("Press ENTER key to continue...", () => {
        menu();
    })
}


function showResult(result){
    if (result.wallet){
        myWallet = result.wallet;
    }
    if (result.message){
        console.log(result.message);
    }
    preMenu();
}

function recoverWallet(){
    return new Promise((resolve, reject) => {
        console.log(" ");
        rl.question("Enter your mnemonic or private key: ", (answer) => {
            if (answer.indexOf(" ")!== -1){
                resolve(restoreWalletMnemonic(answer));
            } else {
                resolve(restoreWalletPK(answer));
            }
        });
    });
}

function searchByHashTransaction(){
    return new Promise((resolve, reject) => {
        console.log(" ");
        rl.question("Enter transaction hash: ", (answer) => {
            resolve(searchTransaction(answer));
        });
    });
}



function sendTransaction(){
    if (!myWallet){
        return new Promise((resolve, reject) => {
            resolve({message: "You are not logged!"});
        });
    }

    return new Promise((resolve, reject) => {
        console.log(" ");
        rl.question("Enter the destination address: ", (toAddress) => {
            rl.question("Enter the amount in " + SYMBOL + ": ", async (amount) => {
                resolve(sendTx(myWallet, toAddress, amount));
            });
        });
    });
}


menu();

