import { BrowserProvider, Contract, ethers, formatUnits } from 'ethers';
import { optionFactoryABI } from '@/web3/OptionFactoryABI';
import { callOptionABI } from '@/web3/CallOptionABI';
import { putOptionABI } from '@/web3/PutOptionABI';
import { erc20ABI } from '@/web3/ERC20ABI';
import { optionFactory, noteAddress, tokenMapping } from '@/web3/constants';

export interface OptionData {
    contractAddr: string;
    tokenImg: string;
    strikePrice: string;
    premium: string;
    expirationDate: string;
    quantity: string;
}

export const formatTimestamp = (timestamp: bigint): string => {
    const date = new Date(Number(timestamp) * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const getOptions = async (address : any, walletProvider : any, chainId : any) => {
    if (!walletProvider) throw new Error('No wallet provider found')

    let ethersProvider : any = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()

    if(chainId !== 7701) {
        return "Invalid Chain"
    }

    const factoryContract = new Contract(optionFactory, optionFactoryABI, signer)
    const callOptions = await factoryContract.getCallOptions()
    const putOptions = await factoryContract.getPutOptions()

    let data: { calls: OptionData[], puts: OptionData[] } = {
        calls: [],
        puts: []
    };

    for(const i in callOptions) {
        const _callContract = new Contract(callOptions[i], callOptionABI, signer)
        const _bought = await _callContract.bought()
        const _inited = await _callContract.inited()
        const _creator = await _callContract.creator()
        if(_inited && !_bought && _creator != address) { 
            const _asset = await _callContract.asset()
            let _strikePrice = await _callContract.strikePrice()
            _strikePrice = formatUnits(_strikePrice, 8)
            let _premium = await _callContract.premium()
            _premium = formatUnits(_premium, 18)
            let _expiration = await _callContract.expiration()
            _expiration = formatTimestamp(_expiration)
            let _quantity = await _callContract.quantity()
            _quantity = formatUnits(_quantity, 18)
            data.calls.push({contractAddr: callOptions[i], tokenImg: tokenMapping[_asset], strikePrice: _strikePrice, premium: _premium, expirationDate: _expiration, quantity: _quantity})
        }
    }

    for(const i in putOptions) {
        const _putContract = new Contract(putOptions[i], putOptionABI, signer)
        const _bought = await _putContract.bought()
        const _inited = await _putContract.inited()
        const _creator = await _putContract.creator()
        if(_inited && !_bought && _creator != address) { 
            const _asset = await _putContract.asset()
            let _strikePrice = await _putContract.strikePrice()
            _strikePrice = formatUnits(_strikePrice, 8)
            let _premium = await _putContract.premium()
            _premium = formatUnits(_premium, 18)
            let _expiration = await _putContract.expiration()
            _expiration = formatTimestamp(_expiration)
            let _quantity = await _putContract.quantity()
            _quantity = formatUnits(_quantity, 18)
            data.puts.push({contractAddr: putOptions[i], tokenImg: tokenMapping[_asset], strikePrice: _strikePrice, premium: _premium, expirationDate: _expiration, quantity: _quantity})
        }
    }

    return data
}

export const onBuy = async (walletProvider : any, chainId : any, optionAddr : string, call : boolean) => {
    try {
        if (!walletProvider) throw new Error('No wallet provider found');

        const ethersProvider = new BrowserProvider(walletProvider)
        const signer = await ethersProvider.getSigner()

        let optionContract : Contract;
        if(call) {
            optionContract = new Contract(optionAddr, callOptionABI, signer);
        } else {
            optionContract = new Contract(optionAddr, putOptionABI, signer);
        }

        let _premium = await optionContract.premium()
        
        const usdtContract = new Contract(noteAddress, erc20ABI, signer);

        const _approve = await usdtContract.approve(optionAddr, _premium);
        console.log(_approve);
        await _approve.wait();

        const _buy = await optionContract.buy();
        console.log(_buy);
        await _buy.wait();
        alert("Option Bought Successfully!");
    } catch (error) {
        console.log(error);
        alert("Error, check console for details");
    }
  }