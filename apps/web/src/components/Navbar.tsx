import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
            threshold<span className="text-indigo-600">.</span>
          </Link>
          <nav className="text-sm font-medium text-slate-500">
            Group deals that unlock together
          </nav>
        </div>
      </div>
    </header>
  );
}



/*
  ===== FILE EXPLANATION (Hinglish) =====

  YE FILE KYU BANI:
  Ye NAVBAR hai — website ke sabse upar hamesha dikhne wali strip
  (logo + tagline). Isko layout.tsx mein wire karte hain taaki HAR
  page pe automatically upar dikhe, bina har page mein alag-alag
  copy-paste kiye.

  Link COMPONENT:
  next/link se aaya hai — normal <a> tag jaisa hi kaam karta hai
  (clickable), lekin FAST hai kyunki pura page reload nahi hota,
  sirf zaroori part hi change hota hai.

  href="/" :
  Logo pe click karne se HOME PAGE pe le jaata hai (root URL).

  IMPORTANT BUG (yaad rakhna):
  File ka naam GALTI SE lowercase "navbar.tsx" ban gaya tha, lekin
  import statement mein capital "Navbar" likha tha ("@/components/
  Navbar"). Linux/Codespaces mein filenames CASE-SENSITIVE hote hain
  — navbar.tsx aur Navbar.tsx DO ALAG files samjhi jaati hain. Isliye
  import fail ho raha tha. Fix: file ko rename kiya "mv navbar.tsx
  Navbar.tsx" se, exact capital N ke saath jo import mein likha tha.
*/
