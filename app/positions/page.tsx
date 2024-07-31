"use client";
import React, { useState, useEffect } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { getPositions, executeOption, withdrawOption, PositionData } from './interactions';
import LoadingScreen from "@/components/LoadingScreen";
import Modal from '@/components/Modal';

const PositionsPage = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
  const [positionsData, setPositionsData] = useState<{ active: PositionData[], closed: PositionData[] }>({ active: [], closed: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [newPremium, setNewPremium] = useState('');
  const [newBuyerAddress, setNewBuyerAddress] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<PositionData | null>(null);

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

  const onAdjustPremiumClick = (position: PositionData) => {
    setSelectedPosition(position);
    setShowPremiumModal(true);
  };

  const onTransferBuyerClick = (position: PositionData) => {
    setSelectedPosition(position);
    setShowTransferModal(true);
  };

  const handleAdjustPremium = async () => {
    if (!selectedPosition || !newPremium) return;
    setLoading(true);
    setLoadingMessage("Adjusting premium, please confirm transaction...");
    try {
      if (!isConnected) throw "Connect Wallet";
      // TODO: Implement adjustPremium function
      await fetchPositions();
    } catch (error) {
      alert("Error: " + error);
      console.error("Adjust premium failed:", error);
    } finally {
      setLoading(false);
      setLoadingMessage('');
      setShowPremiumModal(false);
    }
  };

  const handleTransferBuyer = async () => {
    if (!selectedPosition || !newBuyerAddress) return;
    setLoading(true);
    setLoadingMessage("Transferring buyer, please confirm transaction...");
    try {
      if (!isConnected) throw "Connect Wallet";
      // TODO: Implement transferBuyer function
      await fetchPositions();
    } catch (error) {
      alert("Error: " + error);
      console.error("Transfer buyer failed:", error);
    } finally {
      setLoading(false);
      setLoadingMessage('');
      setShowTransferModal(false);
    }
  };

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
      <div className="flex flex-wrap justify-end gap-3 mt-4">
        {position.positionType === 'Written' && activeTab === 'active' && !position.bought && (
          <ActionButton
            onClick={() => onAdjustPremiumClick(position)}
            label="Adjust Premium"
            className="bg-blue-500 hover:bg-blue-700"
          />
        )}
        {position.positionType === 'Bought' && activeTab === 'active' && position.rawExpiration * 1000 > Date.now() && (
          <ActionButton
            onClick={() => onTransferBuyerClick(position)}
            label="Transfer Buyer"
            className="bg-blue-500 hover:bg-blue-700"
          />
        )}
        {position.positionType === 'Bought' && activeTab === "active" && (position.rawExpiration * 1000 > Date.now()) && (
          <ActionButton
            onClick={() => onExecuteClick(position.contractAddr, position.type === 'CALL', position.tokenName)}
            label="Execute"
            className="bg-emerald-500 hover:bg-emerald-700"
          />
        )}
        {position.positionType !== 'Bought' && activeTab === 'active' && (!position.bought || (position.rawExpiration * 1000 < Date.now())) && (
          <ActionButton
            onClick={() => onWithdrawClick(position.contractAddr, position.rawExpiration * 1000 < Date.now(), position.type === 'CALL', position.bought)}
            label="Withdraw"
            className="bg-red-500 hover:bg-red-700"
          />
        )}
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
      <Modal show={showPremiumModal} onClose={() => setShowPremiumModal(false)}>
        <h2 className="text-2xl font-bold mb-6 text-white">Adjust Premium</h2>
        <input
          type="number"
          value={newPremium}
          onChange={(e) => setNewPremium(e.target.value)}
          placeholder="Enter new premium in NOTE"
          className="w-full p-3 mb-6 bg-gray-700 text-white border border-gray-600 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdjustPremium}
          className="w-full bg-blue-500 text-white px-4 py-3 rounded text-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Confirm
        </button>
      </Modal>

      <Modal show={showTransferModal} onClose={() => setShowTransferModal(false)}>
        <h2 className="text-2xl font-bold mb-6 text-white">Transfer Buyer</h2>
        <input
          type="text"
          value={newBuyerAddress}
          onChange={(e) => setNewBuyerAddress(e.target.value)}
          placeholder="Enter new buyer address"
          className="w-full p-3 mb-6 bg-gray-700 text-white border border-gray-600 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleTransferBuyer}
          className="w-full bg-blue-500 text-white px-4 py-3 rounded text-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Confirm
        </button>
      </Modal>
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