import { getBalance } from "../service/WalletService.js";
import StringBuffer from 'stringbuffer';
import { ResponseDTO } from "../dto/ResponseDTO.js";

const SYMBOL = process.env.SYMBOL;

export async function getAddressBalance(wallet){
    const address = wallet.address;
    const { balanceInEth } = await getBalance(address);

    const message = new StringBuffer();

    message.append("\n################## Balance ##################\n\n");
    message.append(`Address: ${address}\n`);
    message.append(`Balance: ${balanceInEth} ${SYMBOL}\n\n`);
    message.append("###########################################\n\n");
    
    return new ResponseDTO(message.toString());
}