
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { PRICING_PLANS } from '../constants';
import { useUser } from '../hooks/useUser';
import { FiCheck, FiThumbsUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PricingCard: React.FC<{ plan: typeof PRICING_PLANS[0]; onSubscribe: () => void }> = ({ plan, onSubscribe }) => {
  return (
    <div
      className={`p-8 rounded-lg shadow-lg h-full flex flex-col ${
        plan.isFeatured
          ? 'bg-brand-dark dark:bg-gray-800 text-white ring-2 ring-brand-gold'
          : 'bg-white dark:bg-gray-800'
      }`}
    >
      {plan.isFeatured && (
        <span className="bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-full self-start mb-4">
          SIMPLE & AFFORDABLE
        </span>
      )}
      <h3 className="text-2xl font-semibold">{plan.title}</h3>
      <p className={`mt-4 ${plan.isFeatured ? 'text-gray-300' : 'text-brand-gray'}`}>{plan.frequency}</p>
      <p className="text-5xl font-bold mt-2">{plan.price}</p>
      
      <ul className="mt-8 space-y-4 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <FiCheck className="w-5 h-5 text-brand-gold mr-3 mt-1 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSubscribe}
        className={`w-full mt-8 font-bold py-3 px-8 rounded-md text-lg transition-transform transform hover:scale-105 ${
          plan.isFeatured
            ? 'bg-brand-gold text-brand-dark hover:bg-brand-gold-light'
            : 'bg-gray-200 dark:bg-gray-700 text-brand-dark dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Subscribe Now
      </button>
    </div>
  );
};

const PricingPage: React.FC = () => {
  const { isSubscribed, subscribeUser } = useUser();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = () => {
    subscribeUser();
    setShowSuccess(true);
  };

  if (isSubscribed || showSuccess) {
    return (
      <PageWrapper className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-md mx-auto bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg">
          <FiThumbsUp className="w-16 h-16 text-brand-gold mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">You're All Set!</h1>
          <p className="text-brand-gray mb-6">
            Thank you for subscribing. You now have unlimited access to our AI rendering service.
          </p>
          <Link to="/render" className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-md text-lg hover:bg-brand-gold-light transition-transform transform hover:scale-105">
            Start Rendering
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold">Simple Pricing</h1>
        <p className="mt-4 text-lg text-brand-gray max-w-2xl mx-auto">
          One plan, unlimited creativity. Get full access to all our features for a simple monthly price.
        </p>
      </div>

      <div className="flex justify-center">
        {PRICING_PLANS.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="w-full max-w-md"
          >
            <PricingCard plan={plan} onSubscribe={handleSubscribe} />
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default PricingPage;
