
import { NavLink, GalleryItem, PricingPlan, Testimonial, FaqItem } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Render', path: '/render' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Deploy Guide', path: '/deployment-guide' },
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, before: 'https://picsum.photos/seed/b1/800/600', after: 'https://picsum.photos/seed/a1/800/600', prompt: 'Modernist villa, concrete and glass, dusk lighting, lush garden.' },
  { id: 2, before: 'https://picsum.photos/seed/b2/800/600', after: 'https://picsum.photos/seed/a2/800/600', prompt: 'Riyadh-style palace, sandstone facade, palm trees, golden hour.' },
  { id: 3, before: 'https://picsum.photos/seed/b3/800/600', after: 'https://picsum.photos/seed/a3/800/600', prompt: 'Scandinavian cabin, dark wood, snowy forest, winter afternoon.' },
  { id: 4, before: 'https://picsum.photos/seed/b4/800/600', after: 'https://picsum.photos/seed/a4/800/600', prompt: 'Coastal home, white panels, ocean view, bright sunny day.' },
  { id: 5, before: 'https://picsum.photos/seed/b5/800/600', after: 'https://picsum.photos/seed/a5/800/600', prompt: 'Urban skyscraper, reflective glass, bustling city, night time.' },
  { id: 6, before: 'https://picsum.photos/seed/b6/800/600', after: 'https://picsum.photos/seed/a6/800/600', prompt: 'Traditional Japanese house, bamboo garden, overcast sky.' },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    title: 'Monthly Plan',
    price: '$1',
    frequency: 'per month',
    features: [
        'Unlimited Renders', 
        'Advanced AI Model', 
        'Priority Queue', 
        'Dedicated Support', 
        'Full Gallery Access'
    ],
    isFeatured: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, quote: 'Architexture AI transformed our client presentations. The speed and quality are unmatched.', name: 'Elena Vasquez', company: 'Vasquez Architects' },
  { id: 2, quote: 'The ability to iterate on design concepts in minutes is a game-changer for our workflow.', name: 'Johnathan Chen', company: 'UrbanScape Developments' },
  { id: 3, quote: 'Incredible realism and attention to detail. Our clients are consistently wowed by the results.', name: 'Aisha Khan', company: 'Khan & Associates' },
];

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: 'How does the AI rendering process work?',
        answer: 'Our system uses a sophisticated generative AI model. You upload a base image (like a 3D model screenshot or a photo) and provide a text prompt describing the style, materials, lighting, and environment. The AI then re-imagines your image based on your description, producing a photorealistic rendering.'
    },
    {
        question: 'What kind of images can I upload?',
        answer: 'For best results, upload clear, well-lit images of your building\'s exterior. This can include architectural drawings, 3D model exports (e.g., from SketchUp, Revit, or 3ds Max), or even high-quality photographs of an existing structure you wish to re-style.'
    },
    {
        question: 'How long does a render take?',
        answer: 'While a traditional render can take hours or days, our AI-powered service typically generates a high-quality image in just a few minutes. The exact time can vary based on server load and the complexity of your request.'
    },
    {
        question: 'What is the resolution of the final images?',
        answer: 'Our standard renders are delivered in high-resolution (4K), suitable for digital presentations and most print applications. Higher resolutions may be available under our enterprise plans.'
    }
];
