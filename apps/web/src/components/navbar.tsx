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

