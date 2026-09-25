import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: "Memecoin Item Shop",
  description: "Get your meme skins here",
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
