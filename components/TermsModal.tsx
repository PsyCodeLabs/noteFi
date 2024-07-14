"use client"
import React, { useEffect, useState } from 'react';

const TermsModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem('hasAcceptedTerms');
        if (!hasAccepted) {
            setIsModalOpen(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('hasAcceptedTerms', 'true');
        setIsModalOpen(false);
    };

    const handleDecline = () => {
        setIsModalOpen(false);
    };

    if (!isModalOpen) return null;

    return (
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="relative p-5 w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-gray-800 rounded-lg shadow">
                    <div className="flex items-start justify-between p-5 border-b border-gray-600">
                        <h3 className="text-xl font-semibold text-white">
                            Disclaimer
                        </h3>
                    </div>
                    <div className="p-5">
                        <p className="text-md text-gray-400">
                            Welcome to noteFi, a completely decentralized options protocol. Please be aware that noteFi is an open-source project with unaudited contracts and is still under development.
                        </p>
                        <h4 className="text-lg text-white mt-4 mb-2">Important Notice:</h4>
                        <ul className="list-disc list-inside text-gray-400">
                            <li>Do Your Own Research: Users and traders are advised to conduct their own research before investing or interacting with the protocol.</li>
                            <li>Risk Acknowledgment: By using this platform, you acknowledge that you are doing so at your own risk. noteFi and its developers are not responsible for any loss of funds, flaws, or vulnerabilities in the contracts.</li>
                        </ul>
                        <p className="text-sm text-gray-400 mt-4">
                            By proceeding, you agree to these terms and acknowledge that you have read and understood the risks involved.
                        </p>
                    </div>
                    <div className="flex items-center p-5 border-t border-gray-600">
                        <button type="button" className="w-full mr-3 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-800 rounded-lg px-5 py-2.5 text-center" onClick={handleAccept}>
                            I Understad
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
