import { BrowserProvider, Contract, ethers, formatUnits } from 'ethers';
import { callOptionABI } from '@/web3/CallOptionABI';
import { optionFactoryABI } from '@/web3/OptionFactoryABI';
import { putOptionABI } from '@/web3/PutOptionABI';
import { erc20ABI } from '@/web3/ERC20ABI';
import { formatTimestamp } from '../buy/interactions';
import { optionFactory, noteAddress, tokenMapping } from '@/web3/constants';

export interface PositionData {
  contractAddr: string;
  tokenName: string;
  strikePrice: number;
  type: 'CALL' | 'PUT';
  quantity: number;
  expiration: string;
  premiumPaid: number;
  positionType: 'Bought' | 'Written';
  bought: boolean;
  executed: boolean;
  rawExpiration: number;
}

export const getPositions = async (address : any, walletProvider: any, chainId: any) => {
  if (!walletProvider) throw new Error('No wallet provider found');

  let ethersProvider : any = new BrowserProvider(walletProvider);
  const signer = await ethersProvider.getSigner();
  
  const factoryContract = new Contract(optionFactory, optionFactoryABI, signer)
  const callOptions = await factoryContract.getCallOptions()
  const putOptions = await factoryContract.getPutOptions()

  let activePositions: PositionData[] = [];
  let closedPositions: PositionData[] = [];

  for(const i in callOptions) {
    const _callContract = new Contract(callOptions[i], callOptionABI, signer)
    const _creator = await _callContract.creator()
    const _inited = await _callContract.inited()
    const _buyer = await _callContract.buyer()
    if(_inited && (_buyer == address || _creator == address)) {
        const _asset = await _callContract.asset()
        let _strikePrice = await _callContract.strikePrice()
        _strikePrice = formatUnits(_strikePrice, 8)
        let _premium = await _callContract.premium()
        _premium = formatUnits(_premium, 18)
        let _raw = await _callContract.expiration()
        let _expiration = formatTimestamp(_raw)
        let _quantity = await _callContract.quantity()
        _quantity = formatUnits(_quantity, 18)
        let _executed = await _callContract.executed()
        if(_executed == false) {
            if(_buyer == address) {
                activePositions.push({contractAddr: callOptions[i], tokenName: tokenMapping[_asset], strikePrice: _strikePrice, type: 'CALL', quantity: _quantity, expiration: _expiration, premiumPaid: _premium, positionType: 'Bought', bought: true, executed: false, rawExpiration: _raw })
            } else {
                activePositions.push({contractAddr: callOptions[i], tokenName: tokenMapping[_asset], strikePrice: _strikePrice, type: 'CALL', quantity: _quantity, expiration: _expiration, premiumPaid: _premium, positionType: 'Written', bought: _buyer != "0x0000000000000000000000000000000000000000", executed: false, rawExpiration: _raw })
            }
        } else {
            if(_buyer == address) {
                closedPositions.push({contractAddr: callOptions[i], tokenName: tokenMapping[_asset], strikePrice: _strikePrice, type: 'CALL', quantity: _quantity, expiration: _expiration, premiumPaid: _premium, positionType: 'Bought', bought: true, executed: true, rawExpiration: _raw })
            } else {
                closedPositions.push({contractAddr: callOptions[i], tokenName: tokenMapping[_asset], strikePrice: _strikePrice, type: 'CALL', quantity: _quantity, expiration: _expiration, premiumPaid: _premium, positionType: 'Written', bought: _buyer != "0x0000000000000000000000000000000000000000", executed: true, rawExpiration: _raw })
            }
        }
      }
    }

    for(const i in putOptions) {
        const _callContract = new Contract(putOptions[i], putOptionABI, signer)
        const _creator = await _callContract.creator()
        const _inited = await _callContract.inited()
        const _buyer = await _callContract.buyer()
        if(_inited && (_buyer == address || _creator == address)) {
            const _asset = await _callContract.asset()
            let _strikePrice = await _callContract.strikePrice()
            _strikePrice = formatUnits(_strikePrice, 8)
            let _premium = await _callContract.premium()
            _premium = formatUnits(_premium, 18)
            let _raw = await _callContract.expiration()
            let _expiration = formatTimestamp(_raw)
            let _quantity = await _callContract.quantity()
            _quantity = formatUnits(_quantity, 18)
            let _executed = await _callContract.executed()
            if(_executed == false) {
                if(_buyer == address) {
                    activePositions.push({contractAddr: putOptions[i], tokenName: tokenMapping[_asset], strikePrice: _strikePrice, type: 'PUT', quantity: _quantity, expiration: _expiration, premiumPaid: _premium, positionType: 'Bought', bought: true, executed: false, rawExpiration: _raw })
                } else {
                    activePositions.push({contractAddr: putOptions[i], tokenName: tokenMapping[_asset], strikePrice: _strikePrice, type: 'PUT', quantity: _quantity, expiration: _expiration, premiumPaid: _premium, positionType: 'Written', bought: _buyer != "0x0000000000000000000000000000000000000000", executed: false,rawExpiration: _raw })
                }
            } else {
                if(_buyer == address) {
                    closedPositions.push({contractAddr: putOptions[i], tokenName: tokenMapping[_asset], strikePrice: _strikePrice, type: 'PUT', quantity: _quantity, expiration: _expiration, premiumPaid: _premium, positionType: 'Bought', bought: true, executed: true, rawExpiration: _raw })
                } else {
                    closedPositions.push({contractAddr: putOptions[i], tokenName: tokenMapping[_asset], strikePrice: _strikePrice, type: 'PUT', quantity: _quantity, expiration: _expiration, premiumPaid: _premium, positionType: 'Written', bought: _buyer != "0x0000000000000000000000000000000000000000", executed: true, rawExpiration: _raw })
                }
            }
        }
    }

  return {
    active: activePositions,
    closed: closedPositions
  };
};

export const executeOption = async (walletProvider: any, chainId: any, optionAddr: string, call: boolean): Promise<void> => {
  if (!walletProvider) throw new Error('No wallet provider found');

  const ethersProvider = new BrowserProvider(walletProvider);
  const signer = await ethersProvider.getSigner();
  
  const optionContract = new Contract(optionAddr, call ? callOptionABI : putOptionABI, signer);

  if(call) {
    const _value = await optionContract.strikeValue();
    const usdtContract = new Contract(noteAddress, erc20ABI, signer);
    const _approve = await usdtContract.approve(optionAddr, _value);
    await _approve.wait();
  } else {
    const _asset = await optionContract.asset();
    const _value = await optionContract.strikeValue();
    const assetContract = new Contract(_asset, erc20ABI, signer);
    const _approve = await assetContract.approve(optionAddr, _value);
    await _approve.wait();
  }

  const tx = await optionContract.execute();
  await tx.wait();
  alert("Option executed successfully!");
};

export const withdrawOption = async (walletProvider: any, chainId: any, optionAddr: string, call: boolean, bought: boolean): Promise<void> => {
  if (!walletProvider) throw new Error('No wallet provider found');

  const ethersProvider = new BrowserProvider(walletProvider);
  const signer = await ethersProvider.getSigner();
  
  const optionContract = new Contract(optionAddr, call ? callOptionABI : putOptionABI, signer);

  if(bought == false) {
    const tx = await optionContract.cancel();
    await tx.wait();
  } else {
    const tx = await optionContract.withdraw();
    await tx.wait();
  }

  alert("Option withdrawn successfully!");
};
