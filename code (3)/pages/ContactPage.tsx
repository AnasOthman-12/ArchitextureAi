
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { FiMail, FiMapPin } from 'react-icons/fi';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Thank you for your message! We will get back to you shortly.');
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <PageWrapper className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold">Get In Touch</h1>
        <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
          Have a question or a project in mind? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <FiMail className="w-6 h-6 text-brand-gold mr-4 mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:hello@architexture.ai" className="text-brand-gray hover:text-brand-gold">hello@architexture.ai</a>
              </div>
            </div>
            <div className="flex items-start">
              <FiMapPin className="w-6 h-6 text-brand-gold mr-4 mt-1" />
              <div>
                <h3 className="font-semibold">Studio</h3>
                <p className="text-brand-gray">123 Design Avenue, Metropolis, 10101</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input type="text" id="name" placeholder="Your Name" required className="w-full p-3 border border-brand-stone dark:border-gray-600 rounded-md bg-brand-light dark:bg-gray-700 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input type="email" id="email" placeholder="Your Email" required className="w-full p-3 border border-brand-stone dark:border-gray-600 rounded-md bg-brand-light dark:bg-gray-700 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition" />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" placeholder="Your Message" rows={5} required className="w-full p-3 border border-brand-stone dark:border-gray-600 rounded-md bg-brand-light dark:bg-gray-700 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-md text-lg hover:bg-brand-gold-light transition-transform transform hover:scale-105">
              Send Message
            </button>
            {status && <p className="mt-4 text-center text-green-500">{status}</p>}
          </form>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default ContactPage;
