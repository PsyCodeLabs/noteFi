import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import eth from '@/public/Ethereum_logo.png'
import can from '@/public/Canto_logo.png'
import atom from '@/public/Atom_logo.png'

const tokens = [
  { id: 1, name: "Ethereum", image: eth },
  { id: 2, name: "WCANTO", image: can },
  { id: 3, name: "Atom", image: atom }
];
export default function TokenCards() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="pt-16 text-center text-3xl lg:text-4xl font-bold text-gray-200 mb-6">Select a Token</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {tokens.map(token => (
          <Link href={`/write/${token.name.toLowerCase()}`} key={token.id}>
            <div className="block transform transition duration-300 hover:scale-105">
              <div className="bg-gray-800 hover:bg-gray-950 text-gray-200 transition-all duration-300 ease-in-out p-4 lg:p-10 border-2 border-emerald-500 rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-48 lg:h-60">
                  <Image
                    src={token.image}
                    alt={`${token.name} logo`}
                    layout="fill"
                    objectFit="contain" // This ensures the image scales correctly within the container
                  />
                </div>
                <div className="p-4 flex justify-between mt-2">
                  <h3 className="text-lg font-semibold bg-primary px-4 py-2 rounded-md ">{token.name}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
