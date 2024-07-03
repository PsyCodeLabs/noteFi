"use client"

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const projectId = "def43d1c2ec1fb6d4df35ea7325dd752";

const canto_testnet = {
    chainId: 7701,
    name: 'Canto Testnet',
    currency: 'CANTO',
    explorerUrl: 'https://testnet.tuber.build/',
    rpcUrl: 'https://canto-testnet.plexnode.wtf'
}

const metadata = {
    name: 'noteFi',
    description: 'A truly decentralized Options marketplace',
    url: 'http://localhost:3000',
    icons: ['https://avatars.localhost:3000/']
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
    enableOnramp: true
})

export function Web3Modal({ children } : any) {
    return children
}