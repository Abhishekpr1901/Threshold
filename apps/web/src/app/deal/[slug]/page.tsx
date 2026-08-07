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