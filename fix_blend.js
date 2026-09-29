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
  // Find the exact img tag
  const regex = new RegExp(`<img src="\\/images\\/${img.replace('.', '\\.')}"([^>]+style=\\{\\{)([^\\}]+)\\}\\}`, 'g');
  
  content = content.replace(regex, (match, p1, p2) => {
    // Remove filter: drop-shadow
    let newStyle = p2.replace(/,? filter: 'drop-shadow\\([^)]+\\)'/, '');
    // Add mixBlendMode: 'screen'
    newStyle += ", mixBlendMode: 'screen'";
    return `<img src="/images/${img}"${p1}${newStyle}}}`;
  });
});

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed blend modes!');
