import { getTransaction } from "../service/WalletService.js";
import StringBuffer from 'stringbuffer';
import { ResponseDTO } from "../dto/ResponseDTO.js";

export async function searchTransaction(hash){
    const tx = await getTransaction(hash);

    const message = new StringBuffer();

    message.append("\n\n################## Transction Found! ##################\n\n");
    message.append("Transaction Details!\n\n");
    message.append(`Transaction Hash: ${tx.hash}\n`);
    message.append(`Block Number: ${tx.blockNumber}\n`);
    message.append(`From: ${tx.from}\n`);
    message.append(`To: ${tx.to}\n`);
    message.append(`Value: ${tx.value}\n`);
    message.append(`Gas Price: ${tx.gasPrice}\n`);
    message.append(`Gas Limit: ${tx.gasLimit}\n`);
    message.append(`Gas Used: ${tx.gasUsed}\n`);
    message.append(`Status: ${tx.status}\n\n`);
    message.append("##################################################################\n\n");
    
    return new ResponseDTO(message.toString());
}