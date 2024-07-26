"use client";
import React, { useState, useEffect } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { getPositions, executeOption, withdrawOption, PositionData } from './interactions';
import LoadingScreen from "@/components/LoadingScreen";

const PositionsPage = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
  const [positionsData, setPositionsData] = useState<{ active: PositionData[], closed: PositionData[] }>({ active: [], closed: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  useEffect(() => {
    if (isConnected && walletProvider) {
      (async () => {
        await fetchPositions();
      })();
    } else {
      alert("Error: Connect Wallet");
    }
  }, [isConnected, walletProvider, chainId, address]);

  const fetchPositions = async () => {
    setLoading(true);
    setLoadingMessage("Loading Positions...");
    try {
      const data = await getPositions(address, walletProvider, chainId);
      if (typeof data === 'string') {
        console.error(data);
      } else {
        setPositionsData(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }
  

  const onExecuteClick = async (addr: string, call: boolean, token: string) => {
    setLoading(true);
    setLoadingMessage("Executing option, please confirm (3) transactions...");
    try {
      if(isConnected == false) throw "Connect Wallet";
      await executeOption(walletProvider, token, addr, call);
      await fetchPositions();
    } catch (error) {
      alert("Error: " + error);
      console.error("Execution failed:", error);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }

  const onWithdrawClick = async (addr: string, expired: boolean, call: boolean, bought: boolean) => {
    setLoading(true);
    setLoadingMessage("Withdrawing option, please confirm (1) transaction...");
    try {
      if(isConnected == false) throw "Connect Wallet";
      await withdrawOption(walletProvider, expired, addr, call, bought);
      await fetchPositions();
    } catch (error) {
      alert("Error: " + error);
      console.error("Execution failed:", error);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }

  const renderPosition = (position: PositionData) => (
    <div className="my-8">
    <div className=" p-6 rounded-md text-white shadow-md bg-gray-800">
    <div className="text-xl font-semibold">
      <span className='text-2xl'>{position.tokenName}</span> {' '}
      {position.type === 'CALL' ? (
        <span className='ml-2 px-2 py-2 rounded-md bg-gray-800 border-[0.5px] text-green-400 border-green-200 text-sm'>{position.type}</span>
      ) : (
        <span className='ml-2 px-4 py-2 rounded-md bg-gray-800 border-[0.5px] text-red-400 text-sm border-red-200 '>{position.type}</span>
      )}
    </div>
    
    <div className="flex justify-between items-start mt-2">
  <div className="space-y-2">
  <div>
      <div className='text-white text-lg font-semibold'>${position.strikePrice}</div>
      <div className='text-gray-300 text-sm'>Strike Price</div>
    </div>
    <div>
      <div className='text-white text-lg font-semibold'>{position.quantity}</div>
      <div className='text-gray-300 text-sm'>Quantity</div>
    </div>
    <div>
      <div className='text-white text-lg font-semibold'>{position.expiration}</div>
      <div className='text-gray-300 text-sm'>Expires on</div>
    </div>
    <div>
      <div className='text-white text-lg font-semibold'>{position.positionType}</div>
      <div className='text-gray-300 text-sm'>Position Type</div>
    </div>
  </div>
  <div className='bg-gray-700 p-2 rounded-md'>
    <div className='text-white lg:text-lg sm:text-xs font-semibold'>${position.premiumPaid}</div>
    <div className='text-gray-300 text-sm'>Premium</div>
  </div>
</div>

      
      <div className="mt-2">
        {position.positionType === 'Bought' && activeTab == "active" && (position.rawExpiration * 1000 > Date.now()) ? (
          <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" onClick={() => onExecuteClick(position.contractAddr, position.type === 'CALL', position.tokenName)}>
            Execute
          </button>
        ) : "" }
        {position.positionType != 'Bought' && activeTab == 'active' && (!position.bought || (position.rawExpiration * 1000 < Date.now())) ? (
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => onWithdrawClick(position.contractAddr, position.rawExpiration * 1000 < Date.now(),position.type === 'CALL', position.bought)}>
            Withdraw
          </button>
        ) : ""}
      </div>
      </div>
    </div>

  );

  return (
    <>
      {loading && <LoadingScreen message={loadingMessage} />}
      {!loading && (
        <div className="p-4 md:p-8 min-h-full mt-32 m-8">
          <div className="mb-4 border-b border-gray-700">
            <ul className="flex cursor-pointer text-sm font-medium text-center text-gray-500">
              <li className={`flex-1 text-lg p-4 ${activeTab === 'active' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-500'}`} onClick={() => setActiveTab('active')}>
                Active Positions
              </li>
              <li className={`flex-1 text-lg p-4 ${activeTab === 'closed' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-gray-500'}`} onClick={() => setActiveTab('closed')}>
                Closed Positions
              </li>
            </ul>
          </div>
          <div>
            {activeTab === 'active' ? positionsData.active.map(renderPosition) : positionsData.closed.map(renderPosition)}
          </div>
        </div>
      )}
    </>
  );
};

export default PositionsPage;
