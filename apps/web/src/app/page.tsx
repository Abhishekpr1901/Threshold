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