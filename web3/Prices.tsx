import { BrowserProvider, Contract } from "ethers";
import { pythABI } from "@/web3/abi/PythABI"
import {PriceServiceConnection} from "@pythnetwork/price-service-client";
import { ethPythId, cantoPythId, atomPythId } from "./constants";
import axios from 'axios';

const connection = new PriceServiceConnection("https://hermes.pyth.network");

const priceETH = async () => {
    const priceIds = [ethPythId];
    const currentPrice : any = await connection.getLatestPriceFeeds(priceIds);
    return (currentPrice[0]["price"]["price"] / 10**8);
}

const priceCANTO = async () => {
    const priceIds = [cantoPythId];
    const currentPrice : any = await connection.getLatestPriceFeeds(priceIds);
    return (currentPrice[0]["price"]["price"] / 10**8);
}

const priceATOM = async () => {
    const priceIds = [atomPythId];
    const currentPrice : any = await connection.getLatestPriceFeeds(priceIds);
    return (currentPrice[0]["price"]["price"] / 10**8);
}

export const priceMulti = async (token : string) => {
    if(token == "ethereum") {
        return await priceETH();
    } else if(token == "wcanto") {
        return await priceCANTO();
    } else if(token == "atom") {
        return await priceATOM();
    } else {
        return 0;
    }
}

export const updatePriceFeed = async (walletProvider: any, token: string) => {
    if(token == "ETH") {
        return await updatePrice(walletProvider, ethPythId);
    } else if(token == "WCANTO") {
        return await updatePrice(walletProvider, cantoPythId);
    } else if(token == "ATOM") {
        return await updatePrice(walletProvider, atomPythId);
    } else {
        return 0;
    }
}

const updatePrice = async (walletProvider : any, pythId : string) => {
    try {
        if (!walletProvider) throw new Error('No wallet provider found');

        const ethersProvider = new BrowserProvider(walletProvider)
        const signer = await ethersProvider.getSigner()

        const pythContract = new Contract("0x26DD80569a8B23768A1d80869Ed7339e07595E85", pythABI, signer);

        const res = await axios.get(`https://hermes.pyth.network/v2/updates/price/latest?ids[]=${pythId}`);

        const priceData = ["0x" + res.data.binary.data[0]];

        const fee = await pythContract.getUpdateFee(priceData);

        const update = await pythContract.updatePriceFeeds(priceData, {value: fee});

        await update.wait();
    } catch (err) {
        console.log(err);
        alert("Failed to update pricefeeds");
    }
}