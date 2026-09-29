const fs = require('fs');

const bundlesData = [
  {
    id: 'breathe',
    title: 'I CANT BREATHE BUNDLE',
    bg: 'radial-gradient(circle at 70% 50%, #175a96 0%, #041224 100%)',
    characters: ['character1.png', 'character2.png'],
    items: ['fried_chicken_koolaid.png', 'fentanyl.png', 'protest_pickaxe.png']
  },
  {
    id: 'offenders',
    title: 'THE OFFENDERS BUNDLE',
    bg: 'radial-gradient(circle at 70% 50%, #8b1010 0%, #1a0202 100%)',
    characters: ['offender1.png', 'offender2.png'],
    items: ['two_state_solution.jpg', 'talking_point.jpg', 'ceasefire_report.jpg']
  },
  {
    id: 'rug',
    title: 'THE SERIAL RUGGER BUNDLE',
    bg: 'radial-gradient(circle at 70% 50%, #1e7a3a 0%, #0a2a14 100%)',
    characters: ['section3_char1.png', 'section3_char2.png', 'section3_char3.png'],
    items: ['exit_liquidity.png', 'blackbull_gta.png', '10x_with_cheese.png']
  },
  {
    id: 'epstein',
    title: 'THE EPSTEIN FILES BUNDLE',
    bg: 'radial-gradient(circle at 70% 50%, #3a1870 0%, #1a0c3a 100%)',
    characters: ['epstein.png'],
    items: ['little_saint_james_map.png', 'epstein_files_classified.jpg', 'lolita_express.png']
  },
  {
    id: 'vape',
    title: 'EXTRA CHROMEYS BUNDLE',
    bg: 'radial-gradient(circle at 70% 50%, #1e8a9a 0%, #0a303a 100%)',
    characters: ['frank.png', 'thread_guy.png', 'banks.png'],
    items: ['chrome_bag.png', 'vape_axe.png', 'curry_potion.png']
  }
];

let promoCode = fs.readFileSync('src/app/promo/page.tsx', 'utf8');

// Replace the bundles array
const newBundlesStr = 'const bundles = ' + JSON.stringify(bundlesData, null, 2) + ';';
promoCode = promoCode.replace(/const bundles = \[[\s\S]*?\];/, newBundlesStr);

fs.writeFileSync('src/app/promo/page.tsx', promoCode);
console.log("Updated bundles!");
