import { getAllDeals } from "@/data/deals";
import { DealCard } from "@/components/DealCard";

export default function HomePage() {
  const deals = getAllDeals();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Group deals ending soon
        </h1>
        <p className="text-slate-500 mt-1">
          {deals.length} active deals — join before they expire.
        </p>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </section>
    </main>
  );
}

/*
  ===== FILE EXPLANATION (Hinglish) =====

  YE FILE KYU BANI:
  Ye humara HOME PAGE hai — root URL ("/") pe ye page render hota hai.
  App folder ke andar jo bhi page.tsx file hoti hai, uska DEFAULT export
  hi wo actual page component hota hai jo browser mein dikhta hai.

  getAllDeals():
  deals.ts se saari deals ka POORA array le rahe hain.

  .map() KA KAAM:
  deals.map((deal) => <DealCard deal={deal} />) — har DEAL OBJECT ko ek
  <DealCard> COMPONENT mein convert kar rahe hain. 3 deals the toh 3
  cards ban gaye. Ye ek NAYA array hai jo JSX elements ka hai, original
  deals array change nahi hota.

  key={deal.id} KYU ZAROORI HAI:
  Jab bhi .map() se list render karte hain, React ko har item ki UNIQUE
  IDENTITY chahiye hoti hai taaki agar list change ho (add/remove/reorder),
  React efficiently pata laga sake kaunsa specific item update karna hai
  — bina POORI list ko dobara render kiye. Bina key ke React warning
  deta hai console mein.

  IMPORTANT BUG (yaad rakhna):
  Pehle DealCard.tsx galti se app/components/ ke andar ban gayi thi,
  honi chahiye thi src/components/ ke andar (app ke BAHAR, sibling ki
  tarah) — kyunki "@/components/..." alias sirf src/ ko point karta hai.
*/