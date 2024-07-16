"use client"

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = "efbb82bbd6fed87deab04de00f9f9e4d";

const canto_testnet = {
    chainId: 7701,
    name: 'Canto Testnet',
    currency: 'CANTO',
    explorerUrl: 'https://testnet.tuber.build/',
    rpcUrl: 'https://canto-testnet.plexnode.wtf'
}

const metadata = {
    name: 'noteFi',
    description: 'A truly decentralized options platform on Canto',
    url: 'https://note-fi.vercel.app/',
    icons: ['https://note-fi.vercel.app/']
}

const ethersConfig = defaultConfig({
    metadata,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
})

createWeb3Modal({
    ethersConfig,
    chains: [canto_testnet],
    projectId,
    enableAnalytics: true,
    enableOnramp: true,
    themeVariables: {
        '--w3m-color-mix': '#001321',
        '--w3m-color-mix-strength': 40,
        '--w3m-accent': '#047956'
      }
})

export function Web3Modal({ children } : any) {
    return children
}