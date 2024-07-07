"use client"
import React, { useState } from 'react';
import svg2 from '@/public/Faq.svg';

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const initialFAQItems: FAQItem[] = [
    {
      question: 'What is noteFi?',
      answer: 'noteFi is a decentralized platform designed for trading options contracts. It facilitates options trading using the Canto wallet, providing tools to manage and execute trades securely and efficiently.',
      isOpen: false
    },
    {
      question: 'How do I get started?',
      answer: 'Getting started with noteFi is straightforward. Simply connect your Canto wallet, explore available options contracts, and begin trading. No subscription or account setup is required beyond your Canto wallet.',
      isOpen: false
    },
    {
      question: 'Is noteFi free to use?',
      answer: 'Yes, noteFi is entirely free to use. You can start trading options contracts with your Canto wallet at no cost. There are no subscription fees or premium plans.',
      isOpen: false
    },
    {
      question: 'How secure is noteFi?',
      answer: 'Security is paramount at noteFi. We implement robust testing standards and follow best practices to safeguard our smart contracts and frontend. Smart contracts are yet to be audited so please make your investment decisions accordingly!',
      isOpen: false
    },
  ];
  

const FAQSection: React.FC = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>(initialFAQItems);

  const toggleFAQ = (index: number) => {
    setFaqItems(prevState =>
      prevState.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : { ...item, isOpen: false }
      )
    );
  };

  return (
    <div
      className="bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${svg2.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 pb-12 pt-80 lg:px-6">
        <div className="text-white">
          <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-700">
                <button
                  className="flex justify-between w-full py-4 focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg">{item.question}</span>
                  <svg className={`w-6 h-6 ${item.isOpen ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
                {item.isOpen && (
                  <div className="p-4 text-gray-400">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
