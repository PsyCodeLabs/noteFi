"use client";
import React, { useState, useEffect } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { createOptionCall } from './interactions';
import { priceMulti } from '@/web3/Prices';
import LoadingScreen from '@/components/LoadingScreen';

type Props = {
  params: {
    token: string;
  };
};

const OptionForm: React.FC<Props> = ({ params }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [activeTab, setActiveTab] = useState<'call' | 'put'>('call');
  const [strikePrice, setStrikePrice] = useState('');
  const [premium, setPremium] = useState('');
  const [expiration, setExpiration] = useState('');
  const [quantity, setQuantity] = useState('');
  const [livePrice, setLivePrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const ticker : { [key : string] : string } = {
    "ethereum" : "ETH",
    "wcanto" : "WCANTO"
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const _price: any = await priceMulti(params.token.toLowerCase());
        setLivePrice(_price);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [isConnected, walletProvider, chainId, params.token, address]);

  const tabClass = (tab: 'call' | 'put') => (
    `${activeTab === tab ? 'text-white' : 'text-gray-400'} 
     inline-flex w-full p-4 items-center justify-center hover:bg-opacity-75 focus:outline-none focus:ring-2 rounded-lg`
  );

  const convertToUnixTimestamp = (expiration: string) => {
    const date = new Date(expiration);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    return unixTimestamp;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try{
      if (!strikePrice || !premium || !expiration || !quantity) {
        alert('All fields are required.');
        setLoading(false);
        return;
      }

      let unixExpiration = convertToUnixTimestamp(expiration);
      let strike = Math.ceil(Number(strikePrice) * 10**8);

      const formData = {
        type: activeTab.toUpperCase(),
        token: params.token,
        strike,
        premium,
        unixExpiration,
        quantity
      };

      console.log('Form Data:', formData);
      await createOptionCall(formData, walletProvider, chainId);
    } catch (error) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black bg-dot-white/[0.2] p-6 min-h-screen">
      {loading && <LoadingScreen />}
      {!loading && (
      <div className="max-w-xl mx-auto mt-32">
      <h1 className="mt-36 text-2xl px-4 md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mb-4">{ticker[params.token.toLowerCase()]} Price: ${livePrice.toString().substring(0, livePrice.toString().length - 2)}</h1>
        <div className="mb-4">
          <ul className="flex">
            <li className="flex-1 mr-2">
              <button
                className={tabClass('call')}
                onClick={() => setActiveTab('call')}
                style={{ backgroundColor: activeTab === 'call' ? '#10b981' : '#1a1a1a' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={activeTab === 'call' ? 'white' : 'green'} className="mr-2 h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/>
                </svg>
                Call
              </button>
            </li>
            <li className="flex-1 ml-2">
              <button
                className={tabClass('put')}
                onClick={() => setActiveTab('put')}
                style={{ backgroundColor: activeTab === 'put' ? '#ef4444' : '#1a1a1a' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={activeTab === 'put' ? 'white' : 'red'} className="mr-2 h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"/>
                </svg>
                Put
              </button>
            </li>
          </ul>
        </div>
        <form className="bg-[#1a1a1a] p-5 rounded-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">Strike Price</label>
            <input
              type="number"
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans"
              placeholder="Enter Strike Price (USD)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">Premium</label>
            <input
              type="number"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans"
              placeholder="Enter Premium (NOTE)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">Expiration Date and Time</label>
            <input
            placeholder='55'
              type="datetime-local"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans"
              placeholder={`Enter ${params.token.toUpperCase()}`}
            />
          </div>
          
        <button className="w-full inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Submit
        </button>
      </form>
      </div>
      )}
    </div>
  );
};

export default OptionForm;
