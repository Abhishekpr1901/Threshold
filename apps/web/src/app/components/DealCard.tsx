import Link from "next/link";
import Image from "next/image";
import { Deal } from "@/data/deals";

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function getTimeLeft(expiresAt: string): string {
  const diffMs = new Date(expiresAt).getTime() - Date.now();
  if (diffMs <= 0) return "Expired";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

export function DealCard({ deal }: { deal: Deal }) {
  const percentFull = Math.round(
    (deal.currentParticipants / deal.targetParticipants) * 100
  );

  return (
    <Link
      href={`/deal/${deal.slug}`}
      className="block rounded-lg border border-slate-200 overflow-hidden hover:shadow-md hover:border-indigo-300 transition-all"
    >
      <div className="aspect-square relative bg-slate-50">
        <Image
          src={deal.productImage}
          alt={deal.productName}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-slate-900">{deal.productName}</h3>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-indigo-600">
            {formatPrice(deal.dealPrice)}
          </span>
          <span className="text-sm text-slate-400 line-through">
            {formatPrice(deal.originalPrice)}
          </span>
        </div>

        <div className="mt-3">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600"
              style={{ width: `${percentFull}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-500">
            <span>
              {deal.currentParticipants} of {deal.targetParticipants} joined
            </span>
            <span>{getTimeLeft(deal.expiresAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}


/*
  ===== FILE EXPLANATION (Hinglish) =====

  YE FILE KYU BANI:
  Ye ek REUSABLE "card" component hai — ek deal ka data do, ye uska
  image, price, discount, progress bar, aur time-left sab sundar
  tareeke se ek clickable box mein dikha deta hai. Home page pe isi
  component ko LOOP mein baar baar call karenge, har deal ke liye
  ek alag card.

  IMPORTS:
  - Link (next/link) -> clickable link banata hai, pura page reload
    nahi hota, sirf zaroori part change hota hai
  - Image (next/image) -> Next.js ka special image component, auto
    optimize karta hai
  - Deal (from deals.ts) -> wahi type import kiya jo deals.ts mein
    banaya tha, taaki pata rahe deal object mein kaunse fields hain

  formatPrice() FUNCTION:
  Price cents mein store hota hai (jaise 8999). Ye function usko
  display-ready dollar format ($89.99) mein badalta hai. cents/100 se
  dollars milta hai, Intl.NumberFormat sahi currency symbol/format
  ke saath dikhata hai.

  getTimeLeft() FUNCTION:
  Deal ka expiresAt (string) leke "kitna time bacha hai" nikalta hai:
  1. String ko Date object mein convert karke uska time nikalta hai
  2. Usme se ABHI ka time (Date.now()) minus karta hai -> bacha hua
     time milliseconds mein
  3. Agar negative/zero hai -> "Expired" return
  4. Warna milliseconds ko hours/minutes mein todke "Xh Ym left"
     jaisa string banata hai

  DealCard COMPONENT:
  - Ek prop leta hai "deal" (type Deal ka), jo bhi data pass hoga
    usi deal ka card banega
  - percentFull calculate karta hai (currentParticipants /
    targetParticipants * 100) -> progress bar ke liye
  - Poora card ek Link hai -> click karne pe /deal/[slug] page pe
    le jaata hai
  - Image dikhata hai (unoptimized lagaya hai kyunki abhi placeholder
    URLs use kar rahe hain, real photos nahi)
  - dealPrice bold dikhata hai, originalPrice STRIKETHROUGH
    (line-through) ke saath -> discount jaisa effect
  - Progress bar: bahar wala div grey background (full width), andar
    wala div sirf percentFull% tak bharta hai (inline style se width
    set kiya kyunki ye DYNAMIC value hai, Tailwind class se fixed
    nahi ho sakta)
  - Neeche text mein "14 of 20 joined" aur "6h 30m left" dikhata hai,
    dono helper functions ka use yahi ho raha hai

  IMPORTANT BUG FIX (yaad rakhna):
  Pehle deals.ts galti se app/data/ ke andar ban gayi thi, honi
  chahiye thi src/data/ ke andar (app folder ke BAHAR, sibling ki
  tarah). Isi wajah se "@/data/deals" import error aa raha tha -
  path alias "@/*" sirf src/ ko point karta hai, app/data/ ko nahi.
*/
