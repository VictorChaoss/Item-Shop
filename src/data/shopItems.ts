export interface ShopItem {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  emoji: string;
  imageUrl?: string;
  tag?: string;
  bg: string;
}

export interface ShopBundle {
  title: string;
  name: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  emojis: string[];
  heroEmoji: string;
  heroImageUrl?: string;
  bg: string;
}

export interface ShopSectionData {
  id: string;
  title: string;
  items: ShopItem[];
}

export const featuredBundle: ShopBundle = {
  title: 'PEPE',
  name: 'Pepe Meme Bundle',
  price: 3400,
  originalPrice: 6800,
  tag: 'NEW!',
  emojis: ['🎒', '⛏️', '🖼️', '💃', '🎵', '🪂', '🧸'],
  heroEmoji: '🐸',
  heroImageUrl: '/images/frog_character_1790339890726.jpg',
  bg: 'linear-gradient(135deg, #5ec6a0 0%, #3ba8d8 50%, #4db8cc 100%)',
};

export const shopSections: ShopSectionData[] = [
  {
    id: 'featured',
    title: 'FEATURED',
    items: [
      { id: '1', name: 'Moon Walker', type: 'Outfit', price: 2000, emoji: '🚀', tag: 'NEW!', bg: 'linear-gradient(135deg, #4da8da 0%, #3578b5 100%)' },
      { id: '2', name: 'Diamond Hands', type: 'Outfit', price: 1500, emoji: '💎', imageUrl: '/images/diamond_hands_character_1790339914537.jpg', tag: 'NEW!', bg: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' },
      { id: '3', name: 'Doge King', type: 'Outfit', price: 1800, emoji: '🐕', imageUrl: '/images/doge_character_1790339902808.jpg', bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
    ],
  },
  {
    id: 'daily',
    title: 'DAILY',
    items: [
      { id: '4', name: 'Laser Eyes', type: 'Emote', price: 800, emoji: '😼', imageUrl: '/images/laser_eyes_character_1790339956063.jpg', bg: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' },
      { id: '5', name: 'Whale Alert', type: 'Back Bling', price: 400, emoji: '🐋', imageUrl: '/images/whale_character_1790339939506.jpg', bg: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)' },
      { id: '6', name: 'Stonks Glider', type: 'Glider', price: 1200, emoji: '📈', imageUrl: '/images/rocket_glider_1790339929525.jpg', bg: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' },
      { id: '7', name: 'Paper Hands', type: 'Emote', price: 200, emoji: '📄', bg: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)' },
      { id: '8', name: 'Rare Pepe Wrap', type: 'Wrap', price: 500, emoji: '🐸', bg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)' },
      { id: '9', name: 'NGMI Pickaxe', type: 'Pickaxe', price: 800, emoji: '⛏️', bg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)' },
    ],
  },
  {
    id: 'special',
    title: 'SPECIAL OFFERS',
    items: [
      { id: '10', name: 'Rug Pull', type: 'Back Bling', price: 800, emoji: '🧶', bg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)' },
      { id: '11', name: 'GM Spray', type: 'Spray', price: 200, emoji: '☀️', bg: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)' },
      { id: '12', name: 'Wojak Cry', type: 'Emote', price: 500, emoji: '😭', originalPrice: 800, bg: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' },
    ],
  },
];

export const allSectionIds = ['bundle', ...shopSections.map(s => s.id)];
