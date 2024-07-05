"use client";
import React from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import eth from '@/public/Ethereum_logo.png';
import canto from "@/public/Canto_logo.png";

const tokens = [
  { id: 1, name: "Ethereum", image: eth },
  { id: 2, name: "WCANTO", image: canto }
];

export default function TokenCards() {
  return (
    <>
      <h1 className="mt-40 text-2xl px-4 md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 font-sans max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">Select Token</h1>
      <div className="flex justify-center items-center p-8">
        <div className="grid grid-cols-3 gap-8 w-full max-w-7xl mx-auto"> {/* Adjusted container width and alignment */}
          {tokens.map(token => (
            <Link href={`/options/write/${token.name.toLowerCase()}`}>
            <CardContainer key={token.id} className="inter-var flex flex-col items-center">
              <CardBody className="group dark:hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-full sm:w-[22rem] h-auto rounded-xl p-6 border text-center">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-white"
                >
                  {token.name}
                </CardItem>
                <CardItem translateZ="100" className="w-full">
                  <Image
                    src={token.image}
                    height={1000}
                    width={1000}
                    className="h-60 w-full object-contain rounded-xl group-hover:shadow-xl"
                    alt={token.name}
                  />
                </CardItem>
                {/* <div className="mt-4">
                  <CardItem
                    as={Link}
                    href={`/options/write/${token.name.toLowerCase()}`}
                    translateZ={20}
                    className="px-6 py-2 rounded-xl bg-red-500 text-white text-sm font-bold"
                  >
                    Write
                  </CardItem>
                </div> */}
              </CardBody>
            </CardContainer>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
