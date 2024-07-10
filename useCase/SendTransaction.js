import { sendTransaction } from "../service/WalletService.js";
import StringBuffer from 'stringbuffer';
import { ResponseDTO } from "../dto/ResponseDTO.js";

export async function sendTx(fromWallet, toWalletAddress, amountInEth){
    if (!amountInEth || isNaN(amountInEth)){
        throw new Error("Invalid amount!");
    }

    try{
        const txReceipt = await sendTransaction(fromWallet, toWalletAddress, amountInEth);

        const message = new StringBuffer();

        message.append("\n################## Transaction successfully! ##################\n\n");
        message.append(`Transaction Hash: ${txReceipt.hash}\n`);
        message.append(`Transaction Status: ${txReceipt.status}\n`);
        message.append("##################################################################\n\n");

        return new ResponseDTO(message.toString());
    } catch(e){
        throw new Error("Error sending transaction!", e);
    }
}
