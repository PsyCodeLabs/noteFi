import { BrowserProvider, Contract, ethers, parseEther } from 'ethers';
import { optionFactoryABI } from '@/web3/OptionFactoryABI';
import { erc20ABI } from '@/web3/ERC20ABI';
import { putOptionABI } from '@/web3/PutOptionABI';
import { callOptionABI } from '@/web3/CallOptionABI';
import { optionFactory, noteAddress, reverseTokenMapping } from '@/web3/constants';

export const createOptionCall = async (formData : any, walletProvider : any, chainId : any) => {
    if (!walletProvider) throw new Error('No wallet provider found');

    let ethersProvider :any = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    if(chainId !== 7701) {
        return "Invalid Chain"
    }

    const factoryContract = new Contract(optionFactory, optionFactoryABI, signer);

    if(formData.type == "CALL") {

        const create = await factoryContract.createCallOption(reverseTokenMapping[formData.token], parseEther(formData.premium), formData.strike, parseEther(formData.quantity), formData.unixExpiration);
        console.log(create);
        await create.wait();

        const callOptions = await factoryContract.getCallOptions();

        const assetContract = new Contract(reverseTokenMapping[formData.token], erc20ABI, signer);
        const callContract = new Contract(callOptions[callOptions.length-1], callOptionABI, signer);
        
        const _approve = await assetContract.approve(callOptions[callOptions.length-1], parseEther(formData.quantity));
        console.log(_approve);
        await _approve.wait();

        const init = await callContract.init();
        console.log(init);
        await init.wait();
        
        alert("Call Option Created!");
    } else if(formData.type == "PUT") {
        const create = await factoryContract.createPutOption(reverseTokenMapping[formData.token], parseEther(formData.premium), formData.strike, parseEther(formData.quantity), formData.unixExpiration);
        console.log(create);
        await create.wait();

        const callOptions = await factoryContract.getPutOptions();

        const assetContract = new Contract(noteAddress, erc20ABI, signer);
        const putContract = new Contract(callOptions[callOptions.length-1], putOptionABI, signer);

        let _strikeValue = await putContract.strikeValue();
        
        const _approve = await assetContract.approve(callOptions[callOptions.length-1], _strikeValue);
        console.log(_approve);
        await _approve.wait();

        const init = await putContract.init();
        console.log(init);
        await init.wait();        

        alert("Put Option Created!");
    } else {
        alert("Invalid Interaction!");
        return "Invalid Interaction";
    }
}