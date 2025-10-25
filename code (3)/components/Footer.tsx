
import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
  ];

  return (
    <footer className="bg-brand-stone dark:bg-black/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-brand-gray">&copy; {new Date().getFullYear()} Architexture.AI. Created by Anas Othman. All rights reserved.</p>
            <p className="text-sm text-brand-gray">Merging Architecture and Advanced Technology.</p>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gray hover:text-brand-gold dark:hover:text-brand-gold transition-colors"
                aria-label={`Follow us on ${link.icon.type.name}`}
              >
                {React.cloneElement(link.icon, { className: 'w-5 h-5' })}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
