import { createWallet } from "../service/WalletService.js";
import StringBuffer from 'stringbuffer';
import { ResponseDTO } from "../dto/ResponseDTO.js";

export function generateWallet(){
    const myWallet = createWallet();

    if (!myWallet){
        throw new Error("Error creating wallet!");
    }

    const message = new StringBuffer();

    message.append("\n\n################## Wallet created successfully! ##################\n\n");
    message.append("Wallet created successfully!\n\n");
    message.append(`Address: ${myWallet.address} \n`);
    message.append(`Private Key: ${myWallet.privateKey}\n`);
    message.append(`Mnemonic: ${myWallet.privateKey}\n\n`);
    message.append("IMPORTANT: Please save these information in a safe place!\n\n");
    message.append("##################################################################\n\n");

    return new ResponseDTO(message.toString(), myWallet);
}