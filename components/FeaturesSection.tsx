import React from 'react';

function FeaturesSection() {
  return (
    <div>
      <section className="bg-[#018065] py-12">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Enhance Your Options Experience</h2>
            <p className="text-gray-300 sm:text-xl">Explore the powerful features that make noteFi the ideal platform for decentralized options trading.</p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div className="feature-card bg-emerald-800 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-emerald-900 transition duration-300 ease-in-out transform hover:scale-105">
              <div className="mb-4 w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Advanced Options Trading</h3>
              <p className="text-gray-400">Leverage sophisticated tools to execute and manage options contracts with ease, all on a decentralized platform.</p>
            </div>
            <div className="feature-card bg-emerald-800 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-emerald-900 transition duration-300 ease-in-out transform hover:scale-105">
              <div className="mb-4 w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Leverage NOTE</h3>
              <p className="text-gray-400">Utilize robust risk assessment tools to safeguard your investments and optimize your trading strategies.</p>
            </div>
            <div className="feature-card bg-emerald-800 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-emerald-900 transition duration-300 ease-in-out transform hover:scale-105">
              <div className="mb-4 w-12 h-12 bg-emerald-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">User-Friendly Interface</h3>
              <p className="text-gray-400">work in progress for a seamless and intuitive platform designed to enhance your trading experience, accessible from any device.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeaturesSection;
