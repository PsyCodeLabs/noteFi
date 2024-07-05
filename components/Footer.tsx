import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001220] text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} noteFi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
