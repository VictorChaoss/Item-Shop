const fs = require('fs');
let code = fs.readFileSync('src/app/promo/page.tsx', 'utf8');

// 1. Add all_assets arrays at the top
const assetsCode = `
const ALL_CHARACTERS = [
  'character1.png', 'character2.png', 'offender1.png', 'offender2.png', 
  'section3_char1.png', 'section3_char2.png', 'section3_char3.png', 
  'epstein.png', 'frank.png', 'thread_guy.png', 'banks.png'
];

const ALL_ITEMS = [
  'fried_chicken_koolaid.png', 'fentanyl.png', 'protest_pickaxe.png', 
  'two_state_solution.jpg', 'talking_point.jpg', 'ceasefire_report.jpg', 
  'exit_liquidity.png', 'blackbull_gta.png', '10x_with_cheese.png', 
  'little_saint_james_map.png', 'epstein_files_classified.jpg', 'lolita_express.png', 
  'chrome_bag.png', 'vape_axe.png', 'curry_potion.png'
];

const RANDOM_TITLES = [
  'THE CHAOS BUNDLE', 'MYSTERY DROP', 'THE RUGPULL COLLECTION', 
  'CANCELED ON TWITTER BUNDLE', 'THE FORBIDDEN STASH', 'DEGEN STARTER PACK',
  'THE TRENCHES BUNDLE'
];

const RANDOM_BGS = [
  'radial-gradient(circle at 50% 30%, #175a96 0%, #041224 100%)',
  'radial-gradient(circle at 50% 30%, #8b1010 0%, #1a0202 100%)',
  'radial-gradient(circle at 50% 30%, #1e7a3a 0%, #0a2a14 100%)',
  'radial-gradient(circle at 50% 30%, #3a1870 0%, #1a0c3a 100%)',
  'radial-gradient(circle at 50% 30%, #1e8a9a 0%, #0a303a 100%)',
  'radial-gradient(circle at 50% 30%, #996600 0%, #332200 100%)'
];
`;

code = code.replace('const bundles = [', assetsCode + '\nconst bundles = [');

// 2. Add customBundle state
code = code.replace(
  'const [selectedBundleId, setSelectedBundleId] = useState(bundles[0].id);',
  'const [selectedBundleId, setSelectedBundleId] = useState(bundles[0].id);\n  const [customBundle, setCustomBundle] = useState<any>(null);'
);

// 3. Update active bundle logic
code = code.replace(
  'const bundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];',
  'const bundle = customBundle || bundles.find(b => b.id === selectedBundleId) || bundles[0];'
);

// 4. Add randomize function
const randomizeFn = `
  const generateRandomBundle = () => {
    // Shuffle helper
    const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());
    
    // Pick 1 to 3 characters
    const numChars = Math.floor(Math.random() * 3) + 1;
    const randomChars = shuffle(ALL_CHARACTERS).slice(0, numChars);
    
    // Pick exactly 3 items
    const randomItems = shuffle(ALL_ITEMS).slice(0, 3);
    
    // Pick title and bg
    const randomTitle = RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)];
    const randomBg = RANDOM_BGS[Math.floor(Math.random() * RANDOM_BGS.length)];

    setCustomBundle({
      id: 'custom',
      title: randomTitle,
      bg: randomBg,
      characters: randomChars,
      items: randomItems
    });
    setSelectedBundleId('custom');
  };
`;
code = code.replace('const handleDownload = async () => {', randomizeFn + '\n  const handleDownload = async () => {');

// 5. Add Custom to dropdown if selected, and add the Dice button
code = code.replace(
  '<select \n            value={selectedBundleId} \n            onChange={(e) => setSelectedBundleId(e.target.value)}',
  `<button onClick={generateRandomBundle} style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#6b21a8', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>🎲 Randomize</button>
          <select 
            value={selectedBundleId} 
            onChange={(e) => {
              if (e.target.value !== 'custom') setCustomBundle(null);
              setSelectedBundleId(e.target.value);
            }}`
);

code = code.replace(
  '{bundles.map(b => (\n              <option key={b.id} value={b.id}>{b.title}</option>\n            ))}',
  `{customBundle && <option value="custom">{customBundle.title} (Custom)</option>}
            {bundles.map(b => (
              <option key={b.id} value={b.id}>{b.title}</option>
            ))}`
);

fs.writeFileSync('src/app/promo/page.tsx', code);
console.log('Added randomizer!');
