import { BrowserProvider, Contract } from "ethers";
import { pythABI } from "@/web3/abi/PythABI"
import {PriceServiceConnection} from "@pythnetwork/price-service-client";
import axios from 'axios';

const connection = new PriceServiceConnection("https://hermes.pyth.network");

const priceETH = async () => {
    const priceIds = ['0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'];
    const currentPrice : any = await connection.getLatestPriceFeeds(priceIds);
    return (currentPrice[0]["price"]["price"] / 10**8);
}

const priceCANTO = async () => {
    const priceIds = ['0x972776d57490d31c32279c16054e5c01160bd9a2e6af8b58780c82052b053549'];
    const currentPrice : any = await connection.getLatestPriceFeeds(priceIds);
    return (currentPrice[0]["price"]["price"] / 10**8);
}

export const priceMulti = async (token : string) => {
    if(token == "ethereum") {
        return await priceETH();
    } else if(token == "wcanto") {
        return await priceCANTO();
    } else {
        return 0;
    }
}

export const updatePrices = async (walletProvider : any) => {
    try {
        if (!walletProvider) throw new Error('No wallet provider found');

        const ethersProvider = new BrowserProvider(walletProvider)
        const signer = await ethersProvider.getSigner()

        const pythContract = new Contract("0x26DD80569a8B23768A1d80869Ed7339e07595E85", pythABI, signer);

        const res = await axios.get('https://hermes.pyth.network/v2/updates/price/latest?ids[]=0x972776d57490d31c32279c16054e5c01160bd9a2e6af8b58780c82052b053549&ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace');

        const priceData = ["0x" + res.data.binary.data[0]];

        const fee = await pythContract.getUpdateFee(priceData);

        const update = await pythContract.updatePriceFeeds(priceData, {value: fee});

        await update.wait();
    } catch (err) {
        console.log(err);
        alert("Failed to update pricefeeds");
    }
}