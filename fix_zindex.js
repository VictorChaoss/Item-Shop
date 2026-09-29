const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const targetImages = [
  'two_state_solution.jpg',
  'talking_point.jpg',
  'ceasefire_report.jpg',
  'little_saint_james_map.png',
  'epstein_files_classified.jpg'
];

targetImages.forEach(img => {
  // Find the string to replace
  const searchStr = `zIndex: 1, mixBlendMode: 'screen'`;
  const replaceStr = `mixBlendMode: 'screen'`;
  
  content = content.replace(searchStr, replaceStr);
});

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed zIndex!');
