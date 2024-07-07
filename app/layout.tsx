import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {Web3Modal} from '../web3/web3Modal';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "noteFi",
  description: "A Truly Decentralized Options Marketplace On Canto 🚀",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Modal>
          <Navbar/>
            {children}
        </Web3Modal>
      </body>
    </html>
  );
}
