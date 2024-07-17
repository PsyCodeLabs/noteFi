"use client";
import React, { useState, useEffect } from 'react';
import { getOptions, onBuy, OptionData } from './interactions';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import Button2 from '@/components/Button2';
import LoadingScreen from "@/components/LoadingScreen";

const Page = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [optionsData, setOptionsData] = useState<{ calls: OptionData[], puts: OptionData[] }>({
    calls: [],
    puts: []
  });

  useEffect(() => {
    if (isConnected && walletProvider) {
      (async () => {
        await fetchOptions();
      })();
    }
  }, [isConnected, walletProvider, chainId, address]);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Fetching Options...")
      const data: any = await getOptions(address, walletProvider, chainId);
      setOptionsData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoadingMessage('');
    }
  }

  const onBuyClick = async (addr: string, call: boolean) => {
    setLoading(true);
    setLoadingMessage("Processing purchase, please confirm the transaction...");
    try {
      await onBuy(walletProvider, chainId, addr, call);
      setLoadingMessage("Updating options...");
      await fetchOptions();
    } catch (error) {
      console.error("Failed to buy option:", error);
      setLoadingMessage("Failed to process transaction, please try again.");
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  }

  return (
    <>
      {loading && <LoadingScreen message={loadingMessage} />}
      {!loading && (
        <div className='flex flex-col md:flex-row h-screen bg-base text-white pt-32'>
          {/* Tables will stack on mobile and be side by side on desktop */}
          {/* Call Options Side */}
          <div className="flex-auto overflow-hidden p-4">
            <div className="overflow-x-auto bg-gray-800 rounded-md">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-400">
                <caption className="p-5 text-xl font-semibold text-left rtl:text-right text-green-500 bg-gray-800">
                  Call Options
                  <p className="mt-1 text-sm font-normal text-gray-500">Buying these kind of contracts mean you have an option to buy the underlying asset at the strike price if the price of the asset rises above the strike price before the expiration.</p>
                </caption>
                <thead className="text-xs text-gray-200 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Token</th>
                    <th scope="col" className="px-6 py-3">Strike Price</th>
                    <th scope="col" className="px-6 py-3">Premium</th>
                    <th scope="col" className="px-6 py-3">Expiration</th>
                    <th scope="col" className="px-6 py-3">Quantity</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {optionsData.calls.map((option, index) => (
                    <tr key={index} className='border-b border-gray-700'>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.tokenImg}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${option.strikePrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${option.premium}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.expirationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.quantity}</td>
                      <td className="px-6 py-4 text-sm"><button onClick={() => onBuyClick(option.contractAddr, true)}><Button2 /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Put Options Side */}
          <div className="flex-auto overflow-hidden p-4">
            <div className="overflow-x-auto bg-gray-800 rounded-md">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-400">
                <caption className="p-5 text-xl font-semibold text-left rtl:text-right text-red-500 bg-gray-800">
                  Put Options
                  <p className="mt-1 text-sm font-normal text-gray-500">Buying these kind of contracts mean you have an option to sell the underlying asset at the strike price if the price of the asset drops below the strike price before the expiration.</p>
                </caption>
                <thead className="text-xs text-gray-200 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Token</th>
                    <th scope="col" className="px-6 py-3">Strike Price</th>
                    <th scope="col" className="px-6 py-3">Premium</th>
                    <th scope="col" className="px-6 py-3">Expiration</th>
                    <th scope="col" className="px-6 py-3">Quantity</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {optionsData.puts.map((option, index) => (
                    <tr key={index} className='border-b border-gray-700'>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.tokenImg}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${option.strikePrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${option.premium}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.expirationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{option.quantity}</td>
                      <td className="px-6 py-4 text-sm"><button onClick={() => onBuyClick(option.contractAddr, false)}><Button2 /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
