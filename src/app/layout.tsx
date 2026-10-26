import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: "ITEM SHOP | $VBUCKS — 1% Automatic USDC Rewards",
  description:
    "The site is the Item Shop. $VBUCKS is the currency. Hold $VBUCKS on Solana and earn 1% automatic USDC holder rewards on every transfer via StonkFun.xyz.",
  openGraph: {
    title: "ITEM SHOP | $VBUCKS — 1% Automatic USDC Rewards",
    description:
      "The site is the Item Shop. $VBUCKS is the currency. Hold $VBUCKS on Solana and earn 1% automatic USDC rewards on every transfer.",
    type: "website",
    siteName: "Item Shop ($VBUCKS)",
    images: [
      {
        url: "/images/vbucks_logo.png",
        width: 1000,
        height: 1000,
        alt: "$VBUCKS — Official Item Shop Currency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@STONKVBUCKS",
    creator: "@STONKVBUCKS",
    title: "ITEM SHOP | $VBUCKS — 1% Automatic USDC Rewards",
    description:
      "The site is the Item Shop. $VBUCKS is the currency. Hold $VBUCKS on Solana and earn 1% automatic USDC holder rewards.",
    images: ["/images/vbucks_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
