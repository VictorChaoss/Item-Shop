const fs = require('fs');
let code = fs.readFileSync('src/app/promo/page.tsx', 'utf8');

const playbookJSX = \`
      {/* Social Media Content Playbook */}
      <div style={{ marginTop: '40px', backgroundColor: '#111', borderRadius: '12px', padding: '30px' }}>
        <h3 className="fortnite-header" style={{ fontSize: '32px', color: '#fce000', marginBottom: '10px' }}>SOCIAL MEDIA PLAYBOOK</h3>
        <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '16px' }}>Dynamic captions for the <strong>{bundle.title}</strong>. Ready to copy & paste.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>1. The Daily Shop Reset</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Post with the 16:9 Promo image.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              🚨 ITEM SHOP UPDATE 🚨<br/><br/>
              The {bundle.title} has entered the shop.<br/><br/>
              Grab the {bundle.items[0] ? formatItem(bundle.items[0]) : 'Item'} before it rotates out. Tag your duo.
            </div>
          </div>

          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>2. Fake Patch Notes</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Use for TikTok text or Twitter.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Patch v2.1:<br/>
              - Nerfed the {bundle.items[0] ? formatItem(bundle.items[0]) : 'Item'} drop rate.<br/>
              - Buffed the {bundle.items[1] ? formatItem(bundle.items[1]) : 'Item'}.<br/>
              - Fixed a bug where players couldn't equip the {bundle.title}.
            </div>
          </div>

          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>3. Where We Dropping?</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Post with an image of {bundle.items[0] ? formatItem(bundle.items[0]) : 'the item'}.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Where we dropping boys?<br/><br/>
              POV: You're trying to survive the {bundle.title} lobby but your duo didn't pack the {bundle.items[0] ? formatItem(bundle.items[0]) : 'Item'}.
            </div>
          </div>

          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>4. Streamer Bait</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Tag the influencers/politicians in the bundle.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              Yo, your signature skins just dropped in the {bundle.title}.<br/><br/>
              Rate the {bundle.items[1] ? formatItem(bundle.items[1]) : 'Item'} out of 10.
            </div>
          </div>

          <div style={{ backgroundColor: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>5. Bundle Gifting Giveaway</h4>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>Engagement farming on Twitter.</p>
            <div style={{ backgroundColor: '#000', padding: '15px', borderRadius: '6px', color: '#00ffcc', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}>
              I'm gifting the {bundle.title} to 3 people today.<br/><br/>
              RT and tag the biggest rugger on your timeline to enter. Must be following to win.
            </div>
          </div>

        </div>
      </div>
\`;

code = code.replace(/    <\/div>\n  \);\n}\n$/, playbookJSX + '\n    </div>\n  );\n}\n');

fs.writeFileSync('src/app/promo/page.tsx', code);
console.log('Added playbook back!');
