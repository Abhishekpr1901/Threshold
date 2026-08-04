// Milestone 1: static seed data. From Milestone 2 onward this gets
// replaced by real Postgres queries — the shape is deliberately close
// to what the `deals` and `products` tables will look like.

export type Deal = {
  id: string;
  slug: string;
  productName: string;
  productImage: string;
  originalPrice: number; // cents
  dealPrice: number; // cents
  targetParticipants: number;
  currentParticipants: number;
  expiresAt: string; // ISO timestamp
  description: string;
};

export const deals: Deal[] = [
  {
    id: "1",
    slug: "wireless-headphones-groupbuy",
    productName: "Wireless Over-Ear Headphones",
    productImage: "https://placehold.co/600x600?text=Headphones",
    originalPrice: 8999,
    dealPrice: 5999,
    targetParticipants: 20,
    currentParticipants: 14,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(), // 6h from now
    description: "Noise-cancelling wireless headphones, 30-hour battery.",
  },
  {
    id: "2",
    slug: "mechanical-keyboard-groupbuy",
    productName: "Mechanical Keyboard",
    productImage: "https://placehold.co/600x600?text=Keyboard",
    originalPrice: 6499,
    dealPrice: 4499,
    targetParticipants: 15,
    currentParticipants: 6,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(), // 20h from now
    description: "Hot-swappable mechanical keyboard with RGB backlight.",
  },
  {
    id: "3",
    slug: "coffee-french-press-groupbuy",
    productName: "French Press Coffee Maker",
    productImage: "https://placehold.co/600x600?text=French+Press",
    originalPrice: 2999,
    dealPrice: 1899,
    targetParticipants: 30,
    currentParticipants: 29,
    expiresAt: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // 45 min from now
    description: "34oz stainless steel French press.",
  },
];

export function getAllDeals() {
  return deals;
}

export function getDealBySlug(slug: string) {
  return deals.find((d) => d.slug === slug);
}