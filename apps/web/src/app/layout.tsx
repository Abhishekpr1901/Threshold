import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Threshold — group deals that unlock together",
  description: "A group-buy marketplace where deals unlock once enough buyers join.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        </body>
    </html>
  );
}


/*
  ===== FILE EXPLANATION (Hinglish) =====

  YE FILE KYU BANI:
  layout.tsx poore app ki "CHHAT/FRAME" hai — har page ke UPAR/AROUND
  wraps hota hai. Isme jo bhi likhoge (jaise Navbar), wo HAR page pe
  automatically dikhega, bina baar baar copy-paste kiye.

  {children} KA MATLAB:
  Ye ek SPECIAL PLACEHOLDER hai jaha ACTUAL PAGE ka content aata hai.
  Home page pe ho toh {children} = home page ka content. Deal detail
  page pe ho toh {children} = detail page ka content. Navbar hamesha
  SAME rehta hai upar, sirf beech ka content badalta hai.

  <Navbar /> KAHAN LIKHA:
  {children} se UPAR likha hai <body> ke andar — isliye Navbar hamesha
  content ke UPAR dikhta hai, har page pe consistently.

  metadata OBJECT:
  Browser tab ka TITLE aur page ka DESCRIPTION (SEO/search engines ke
  liye) yahan set karte hain — humne "Create Next App" default ko
  "Threshold — group deals that unlock together" se replace kiya.

  IMPORT ADD KIYA:
  import { Navbar } from "@/components/Navbar"; — ye line add ki
  taaki Navbar component is file mein use kar sakein.
*/