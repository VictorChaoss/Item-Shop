const fs = require('fs');
let code = fs.readFileSync('src/app/promo/page.tsx', 'utf8');

// Change ITEM SHOP text zIndex and size
code = code.replace(
  `          {/* Top Left Text */}\n          <div style={{ position: 'absolute', top: '100px', left: '120px', zIndex: 20 }}>\n            <h1 className="fortnite-header" style={{ fontSize: '180px'`,
  `          {/* Top Left Text */}\n          <div style={{ position: 'absolute', top: '100px', left: '120px', zIndex: 10 }}>\n            <h1 className="fortnite-header" style={{ fontSize: '160px'`
);

// Change Characters wrapper zIndex to 30
code = code.replace(
  `          {/* Characters (Right side) */}\n          <div style={{ \n            position: 'absolute', \n            top: '0', \n            right: '-100px', \n            width: '1400px', \n            height: '100%',\n            display: 'flex',\n            alignItems: 'flex-end',\n            justifyContent: 'center',\n            zIndex: 20\n          }}>`,
  `          {/* Characters (Right side) */}\n          <div style={{ \n            position: 'absolute', \n            top: '0', \n            right: '-100px', \n            width: '1400px', \n            height: '100%',\n            display: 'flex',\n            alignItems: 'flex-end',\n            justifyContent: 'center',\n            zIndex: 30\n          }}>`
);

fs.writeFileSync('src/app/promo/page.tsx', code);
console.log('Fixed overlapping issues');
