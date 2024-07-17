import { BrowserProvider, Contract, parseEther } from 'ethers';
import { erc20ABI } from '@/web3/abi/ERC20ABI';

const amoyTokens = [
    '0xB1b104D79dE24513338bdB6CB9Df468110010E5F',
    '0x7A9294c8305F9ee1d245E0f0848E00B1149818C7',
    '0x3b5dAAE6d0a1B98EF8B2E6B65206c93c8cE55841',
    '0x19Ed533D9f274DC0d1b59FB9C0d5D1C27cba8bb1'
]

const cardonaTokens = [
    '0x7A9294c8305F9ee1d245E0f0848E00B1149818C7',
    '0x3b5dAAE6d0a1B98EF8B2E6B65206c93c8cE55841',
    '0xc302BD52985e75C1f563a47f2b5dfC4e2b5C6C7E',
    '0x5934C2Ca4c4F7b22526f6ABfD63bB8075a62e65b'
]

const scrollSepTokens = [
    '0x19Ed533D9f274DC0d1b59FB9C0d5D1C27cba8bb1',
    '0x3b5dAAE6d0a1B98EF8B2E6B65206c93c8cE55841',
    '0x5934C2Ca4c4F7b22526f6ABfD63bB8075a62e65b',
    '0xc302BD52985e75C1f563a47f2b5dfC4e2b5C6C7E'
]

const zkSyncTokens = [
    '0xda3889268B05520fFe019B9A3de01a2872d8d82f',
    '0xAA5674C00D783EAEcbF4Ff0cB4F78fFD111b4068',
    '0x10265A988d97AfCf859B394c7e4ecd8ED8807c66',
    '0xe752A88e3d21C53Ea90b1B715b33131b372915aa'
]

export const getTokens = async (address : any, walletProvider: any, chainId: any) => {
    if (!walletProvider) throw new Error('No wallet provider found');

    let tokenArray : any[];
    if(chainId == 80002) {
        tokenArray = amoyTokens;
    } else if(chainId == 2442) {
        tokenArray = cardonaTokens;
    } else if(chainId == 300) {
        tokenArray = zkSyncTokens;
    } else if(chainId == 534351){
        tokenArray = scrollSepTokens;
    } else {
        alert("This network is not supported!")
        return "Invalid Network"
    }

    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();

    for(const i in tokenArray) {
        const erc20Contract = new Contract(tokenArray[i], erc20ABI, signer);
        const drip = await erc20Contract.mint(address, parseEther("100"));
        await drip.wait();
    }

    alert("Claimed Tokens From Faucet Successfully!");
}