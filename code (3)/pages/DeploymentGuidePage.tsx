
import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { FiUpload, FiGitBranch, FiGlobe, FiKey, FiSave } from 'react-icons/fi';

const GuideStep: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center mb-4">
      <div className="bg-brand-gold/20 text-brand-gold p-3 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <div className="text-brand-gray space-y-2 prose prose-sm dark:prose-invert max-w-none">
      {children}
    </div>
  </motion.div>
);

const DeploymentGuidePage: React.FC = () => {
  return (
    <PageWrapper className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold">Publishing Your Website</h1>
        <p className="mt-4 text-lg text-brand-gray max-w-3xl mx-auto">
          Follow these steps to take your new website from code to a live, public URL with a custom domain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GuideStep icon={<FiSave size={24} />} title="Step 1: Save Your Code">
          <p>First, you need to save all the generated code files to your local computer. Recreate the exact file and folder structure as provided.</p>
          <p>Your project structure should look like this:</p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-2 rounded text-xs">
{`my-architexture-app/
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── ...
├── pages/
│   ├── HomePage.tsx
│   ├── RenderPage.tsx
│   └── ...
├── services/
│   └── geminiService.ts
├── hooks/
│   └── useTheme.tsx
├── App.tsx
├── constants.ts
├── index.html
├── index.tsx
├── metadata.json
└── types.ts`}
          </pre>
        </GuideStep>

        <GuideStep icon={<FiUpload size={24} />} title="Step 2: Deploy to a Host">
          <p>This website is "static," meaning it doesn't need a complex backend server. You can host it easily on services like Netlify or Vercel.</p>
          <h4 className="font-bold">Easiest Method: Drag & Drop</h4>
          <ol className="list-decimal list-inside">
            <li>Go to a service like <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="text-brand-gold">Netlify Drop</a>.</li>
            <li>Place all your project files into a single folder.</li>
            <li>Drag and drop the folder onto their website.</li>
            <li>Your site will be live on a temporary URL in seconds!</li>
          </ol>
        </GuideStep>

        <GuideStep icon={<FiGitBranch size={24} />} title="Step 3: Use Git (Recommended)">
          <p>For easier updates, using Git and GitHub is the best approach.</p>
          <ol className="list-decimal list-inside">
            <li>Create a new repository on <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold">GitHub</a>.</li>
            <li>Initialize a Git repository in your project folder and push your code.</li>
            <li>Sign up for Netlify or Vercel and connect your GitHub account.</li>
            <li>Select your new repository. Since this project has no build step, you can leave the build settings blank or set the publish directory to the root.</li>
            <li>Your site will deploy automatically. Any future `git push` will trigger a new deploy.</li>
          </ol>
        </GuideStep>

        <GuideStep icon={<FiGlobe size={24} />} title="Step 4: Add a Custom Domain">
          <p>Make your site professional with a custom domain (e.g., `www.yourstudio.com`).</p>
          <ol className="list-decimal list-inside">
            <li>Purchase a domain from a registrar like GoDaddy, Namecheap, or Google Domains.</li>
            <li>In your hosting provider's dashboard (Netlify/Vercel), go to the "Domains" section for your site.</li>
            <li>Add your custom domain. The provider will give you DNS records (like an `A` or `CNAME` record).</li>
            <li>Go to your domain registrar's DNS settings and add the records provided by your host.</li>
            <li>DNS changes can take a few hours to propagate across the internet. Your host will automatically provision an SSL certificate for HTTPS.</li>
          </ol>
        </GuideStep>

        <GuideStep icon={<FiKey size={24} />} title="Step 5: Configure API Key">
          <p className="font-bold text-red-500">This is a critical security step.</p>
          <p>The AI rendering functionality requires a Google Gemini API key. You must keep this key secret.</p>
          <ol className="list-decimal list-inside">
            <li>In your hosting provider's dashboard (Netlify/Vercel), find the "Environment Variables" settings for your site.</li>
            <li>Create a new variable with the name <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">API_KEY</code>.</li>
            <li>Paste your actual Google Gemini API key as the value.</li>
            <li>The deployed application will now be able to use this key securely without exposing it in the public code.</li>
          </ol>
          <p className="font-bold text-red-500">Never commit your API key to a public Git repository.</p>
        </GuideStep>
      </div>
    </PageWrapper>
  );
};

export default DeploymentGuidePage;
