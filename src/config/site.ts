// ============================================================
// SINGLE SOURCE OF TRUTH FOR LAUNCH LINKS & CONTRACT ADDRESS
// Paste your live Solana Contract Address into LIVE_CA below!
// ============================================================

const LIVE_CA = 'COMING SOON — LAUNCHING ON STONKFUN.XYZ';
const IS_LIVE = !LIVE_CA.startsWith('COMING SOON');

export const SITE_CONFIG = {
  ticker: '$VBUCKS',
  contractAddress: LIVE_CA,
  isLive: IS_LIVE,
  xUrl: 'https://x.com/STONKVBUCKS',
  xHandle: '@STONKVBUCKS',
  xCommunityUrl: 'https://x.com/STONKVBUCKS',
  stonkfunUrl: IS_LIVE ? `https://stonkfun.xyz/token/${LIVE_CA}` : 'https://stonkfun.xyz',
  dexScreenerUrl: IS_LIVE ? `https://dexscreener.com/solana/${LIVE_CA}` : 'https://dexscreener.com',
};
