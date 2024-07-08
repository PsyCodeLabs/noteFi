"use client";
import React, { useState, useEffect } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { getPositions, executeOption, withdrawOption, PositionData } from './interactions';
import LoadingScreen from "@/components/LoadingScreen";
import { updatePrices } from '@/web3/Prices';

const PositionsPage = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
  const [positionsData, setPositionsData] = useState<{ active: PositionData[], closed: PositionData[] }>({ active: [], closed: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && walletProvider) {
      (async () => {
        await fetchPositions();
      })();
    }
  }, [isConnected, walletProvider, chainId, address]);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const data = await getPositions(address, walletProvider, chainId);
      if (typeof data === 'string') {
        console.error(data);
      } else {
        setPositionsData(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  

  const onExecuteClick = async (addr: string, call: boolean) => {
    await updatePrices(walletProvider);
    await executeOption(walletProvider, chainId, addr, call);
    await fetchPositions();
  }

  const onWithdrawClick = async (addr: string, call: boolean, bought: boolean) => {
    await withdrawOption(walletProvider, chainId, addr, call, bought);
    await fetchPositions();
  }

  const renderPosition = (position: PositionData) => (
    <div className="my-8">
    <div className="bg-gray-900 p-6 rounded-md text-white shadow-md">
    <div className="text-xl font-semibold">
      <span>{position.tokenName}</span> {' '}
      <span>${position.strikePrice}</span> {' '}
      {position.type === 'CALL' ? (
        <span className='ml-2 px-2 py-2 rounded-md bg-gray-800 border-[0.5px] text-green-400 border-green-200 text-sm'>{position.type}</span>
      ) : (
        <span className='ml-2 px-4 py-2 rounded-md bg-gray-800 border-[0.5px] text-red-400 text-sm border-red-200 '>{position.type}</span>
      )}
    </div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <div className='text-gray-300'>Quantity: {position.quantity}</div>
          <div className='text-gray-300'>Expires on: {position.expiration}</div>
          <div className='text-gray-300'>{position.positionType}</div>
        </div>
        <div className='px-4 py-2 rounded-md bg-gray-800 text-lg'>
          Premium ${position.premiumPaid}
        </div>
      </div>
      <div className="mt-2">
        {position.positionType === 'Bought' && activeTab == "active" ? (
          <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded" onClick={() => onExecuteClick(position.contractAddr, position.type === 'CALL')}>
            Execute
          </button>
        ) : "" }
        {activeTab == 'active' && position.positionType != 'Bought' && activeTab == "active" ? (
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => onWithdrawClick(position.contractAddr, position.type === 'CALL', position.bought)}>
            Withdraw
          </button>
        ) : ""}
      </div>
    </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-black min-h-full mt-32 m-8">
      {loading && <LoadingScreen />}  {/* Conditionally render the loading screen */}
      {!loading && (
        <>
          <div className="mb-4 border-b border-gray-700">
            <ul className="flex cursor-pointer text-sm font-medium text-center text-gray-500">
              <li className={`flex-1 p-4 ${activeTab === 'active' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`} onClick={() => setActiveTab('active')}>
                Active Positions
              </li>
              <li className={`flex-1 p-4 ${activeTab === 'closed' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`} onClick={() => setActiveTab('closed')}>
                Closed Positions
              </li>
            </ul>
          </div>
          <div>
            {activeTab === 'active' ? positionsData.active.map(renderPosition) : positionsData.closed.map(renderPosition)}
          </div>
        </>
      )}
    </div>
  );
};

export default PositionsPage;
