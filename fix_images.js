const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// The regex should target the <img> tags that are inside the item cards.
// They typically look like: <img src="/images/..." alt="..." style={{ ... }} />
// Note that character images have height: '100%' and filter: drop-shadow(0 0 25px...)
// We ONLY want to replace the item images, which usually have objectFit: 'contain' and a drop-shadow.

content = content.replace(/<img src="\/images\/([^"]+)" alt="([^"]+)" style=\{\{[\s\S]*?\}\} \/>/g, (match, src, alt) => {
  // If it's a character image, skip it
  if (src.includes('char') || src.includes('frank') || src.includes('thread_guy') || src.includes('banks') || src.includes('biden') || src.includes('trump') || src.includes('obama') || src.includes('jeffrey') || src.includes('ghislaine') || src.includes('prince_andrew') || src.includes('steven_hawking')) {
    return match; // Keep character images as they are
  }
  
  // This is an item image. Standardize its style!
  return `<img src="/images/${src}" alt="${alt}" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '65%', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))', zIndex: 1 }} />`;
});

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed item images!');
