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
      fetchPositions();
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
      if (isConnected == false) throw "Connect Wallet";
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
      if (isConnected == false) throw "Connect Wallet";
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
    <div
      key={position.contractAddr}
      className={`bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg
        ${position.type === 'CALL'
          ? 'border-b-4 border-green-500'
          : 'border-b-4 border-red-500'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white flex items-center">
          {position.tokenName}
        </h3>
        <div className="flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 border-white ${position.positionType == 'Bought' ? 'text-green-500' : 'text-red-500'}`}>
            {position.positionType}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${position.type === 'CALL' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {position.type}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InfoItem label="Strike Price" value={`$${position.strikePrice}`} />
        <InfoItem label="Quantity" value={position.quantity} />
        <InfoItem label="Expiration" value={position.expiration} />
        <InfoItem label="Premium" value={`$${position.premiumPaid}`} />
      </div>
      <div className="flex justify-end">
        {position.positionType === 'Bought' && activeTab === "active" && (position.rawExpiration * 1000 > Date.now()) ? (
          <ActionButton
            onClick={() => onExecuteClick(position.contractAddr, position.type === 'CALL', position.tokenName)}
            label="Execute"
            className="bg-emerald-500 hover:bg-emerald-700"
          />
        ) : position.positionType !== 'Bought' && activeTab === 'active' && (!position.bought || (position.rawExpiration * 1000 < Date.now())) ? (
          <ActionButton
            onClick={() => onWithdrawClick(position.contractAddr, position.rawExpiration * 1000 < Date.now(), position.type === 'CALL', position.bought)}
            label="Withdraw"
            className="bg-red-500 hover:bg-red-700"
          />
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <LoadingScreen message={loadingMessage} />
      ) : (
        <div className='m-20'>
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeTab === 'active'
              ? positionsData.active.map(renderPosition)
              : positionsData.closed.map(renderPosition)
            }
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
);

const ActionButton = ({ onClick, label, className }: { onClick: () => void; label: string; className?: string }) => (
  <button
    onClick={onClick}
    className={`text-white font-bold py-2 px-4 rounded transition duration-300 ${className}`}
  >
    {label}
  </button>
);

const TabButtons = ({ activeTab, setActiveTab }: { activeTab: 'active' | 'closed'; setActiveTab: (tab: 'active' | 'closed') => void }) => (
  <div className="flex justify-center mb-8">
    <button
      onClick={() => setActiveTab('active')}
      className={`px-6 py-2 text-lg font-medium rounded-l-lg transition-colors duration-300 border-2 ${activeTab === 'active' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      Active Positions
    </button>
    <button
      onClick={() => setActiveTab('closed')}
      className={`px-6 py-2 text-lg font-medium rounded-r-lg transition-colors duration-300 border-2 ${activeTab === 'closed' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
    >
      Closed Positions
    </button>
  </div>
);

export default PositionsPage;