import { recoverWalletUsingMnemonic, recoverWalletUsingPK } from "../service/WalletService.js";
import StringBuffer from 'stringbuffer';
import { ResponseDTO } from "../dto/ResponseDTO.js";

export function restoreWalletMnemonic(mnemonic){
        try{
            const myWallet = recoverWalletUsingMnemonic(mnemonic); 

            if (!myWallet){
                throw new Error("Invalid mnemonic!");
            }

            const message = new StringBuffer();

            message.append("\n\n################## Wallet resetored successfully! ##################\n\n");
            message.append("Wallet resetored successfully!\n\n");
            message.append(`Address: ${myWallet.address} \n`);
            message.append(`Private Key: ${myWallet.privateKey}\n`);
            message.append(`Mnemonic: ${myWallet.mnemonic.phrase}\n\n`);
            message.append("IMPORTANT: Please save these information in a safe place!\n\n");
            message.append("##################################################################\n\n");

            return new ResponseDTO(message.toString(), myWallet);
        } catch(e){
            throw new Error("Invalid mnemonic!", e);
        }
}

export function restoreWalletPK(primaryKey){
    try{
        const myWallet = recoverWalletUsingPK(primaryKey);
        
        if (!myWallet){
            throw new Error("Invalid private key!");
        }

        const message = new StringBuffer();
        
        message.append("\n\n################## Wallet restored successfully! ##################\n\n");
        message.append("Wallet resetored successfully!\n\n");
        message.append(`Address: ${myWallet.address} \n`);
        message.append(`Private Key: ${myWallet.privateKey}\n\n`);
        message.append("IMPORTANT: Please save these information in a safe place!\n\n");
        message.append("##################################################################\n\n");

        return new ResponseDTO(message.toString(), myWallet);
    } catch(e){
        throw new Error("Invalid private key!", e);
    }
}
