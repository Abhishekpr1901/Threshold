import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllDeals, getDealBySlug } from "@/data/deals";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

// Pre-render every deal page at build time — Static Site Generation.
export function generateStaticParams() {
  return getAllDeals().map((deal) => ({ slug: deal.slug }));
}

export default async function DealPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  const percentFull = Math.round(
    (deal.currentParticipants / deal.targetParticipants) * 100
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="aspect-square relative bg-slate-50 rounded-lg overflow-hidden">
          <Image
            src={deal.productImage}
            alt={deal.productName}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {deal.productName}
          </h1>

          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-2xl font-bold text-indigo-600">
              {formatPrice(deal.dealPrice)}
            </span>
            <span className="text-lg text-slate-400 line-through">
              {formatPrice(deal.originalPrice)}
            </span>
          </div>

          <p className="text-slate-600 mt-4">{deal.description}</p>

          <div className="mt-6">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600"
                style={{ width: `${percentFull}%` }}
              />
            </div>
            <p className="text-sm text-slate-500 mt-2">
              {deal.currentParticipants} of {deal.targetParticipants} joined
              — deal unlocks once target is hit
            </p>
          </div>

          <button className="mt-6 w-full sm:w-auto px-8 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
            Join this deal
          </button>
          <p className="text-xs text-slate-400 mt-3">
            Real join logic (with concurrency protection) arrives in
            Milestone 2–3.
          </p>
        </div>
      </div>
    </main>
  );
}


/*
  ===== FILE EXPLANATION (Hinglish) =====

  YE FILE KYU BANI:
  Ye ek SPECIFIC deal ka DETAIL page hai — jab kisi deal card pe click
  karte hain, ye page khulta hai us exact deal ka poora data dikhane
  ke liye.

  [slug] FOLDER NAME (square brackets):
  Ye Next.js ko batata hai "ye ek DYNAMIC ROUTE SEGMENT hai" — matlab
  URL mein us jagah KOI BHI TEXT aa sakta hai (jaise /deal/headphones,
  /deal/keyboard). Wo text automatically "slug" naam ke parameter mein
  mil jaata hai code ke andar use karne ke liye.

  generateStaticParams():
  Next.js ko batata hai "in saari specific slugs ke liye pages BUILD
  TIME PE HI bana do" (static generation) — na ki har request pe
  compute karna pade runtime pe. Isliye page load bahut FAST hota hai.

  params: Promise<{ slug: string }> aur await params:
  Naye Next.js versions mein params ek PROMISE hoti hai (async), isliye
  await karke uska actual VALUE nikaalna padta hai use karne se pehle.

  getDealBySlug(slug):
  URL se mile slug ko use karke deals.ts mein .find() se matching deal
  dhoondh rahe hain.

  if (!deal) { notFound(); }:
  Agar koi deal match nahi hua (galat/invalid slug URL mein), Next.js
  ka BUILT-IN notFound() function call karke user ko proper 404 page
  dikhate hain — app crash hone ki jagah graceful handling.

  percentFull CALCULATION (duplicate note):
  Yahan bhi wahi progress % wala calculation hai jo DealCard.tsx mein
  tha. Ye CODE DUPLICATION hai — future mein isko ek SHARED helper
  function mein nikaal sakte hain (jaise lib/format.ts mein), taaki
  dono jagah same function reuse ho, copy-paste na karna pade.
*/