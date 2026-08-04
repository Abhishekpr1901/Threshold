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


