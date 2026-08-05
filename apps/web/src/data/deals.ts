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

/*
  ===== FILE EXPLANATION (Hinglish) =====

  YE FILE KYU BANI:
  Milestone 1 mein humein deals dikhane ke liye kuch dummy/fake data
  chahiye tha bina database banaye. Isliye ye file temporary "fake
  database" ki tarah kaam karti hai.

  TYPE "Deal":
  Ye ek contract hai jo bolta hai har deal object mein exactly ye fields
  hone chahiye (id, slug, productName, price, etc.) sahi type ke saath.
  Isse typo/missing field jaisi galtiyan turant editor mein pakad jaati
  hain, run karne se pehle hi.

  PRICE CENTS MEIN KYU:
  Dollars (89.99) directly store karne se decimal rounding errors aa
  sakte hain computer mein. Isliye poora number (8999 cents) store
  karte hain, aur display karte waqt hi 100 se divide karte hain.

  expiresAt STRING KYU HAI, DATE OBJECT NAHI:
  JSON format mein "date" naam ka koi type hota hi nahi — sirf strings/
  numbers/objects hote hain. Isliye date hamesha STRING ki tarah travel
  karti hai jab data database/API se aata hai. Date object banate hain
  sirf jab maths karni ho (jaise "kitna time bacha hai"), fir usse
  .toISOString() se wapas string mein convert karte hain store/send
  karne ke liye.

  deals ARRAY:
  3 sample deals hain. Teesra deal jaanbujhke ALMOST FULL (29/30) aur
  ALMOST EXPIRING (45 min) rakha hai — kyunki yahi exact scenario hai
  jaha Milestone 3 mein race condition test karenge (bahut log ek saath
  last spot ke liye try karenge).

  getAllDeals() vs getDealBySlug():
  - getAllDeals() -> POORA array deta hai (listing page ke liye)
  - getDealBySlug(slug) -> .find() se loop chalake sirf EK matching
    deal deta hai, ya match na mile toh undefined (detail page ke liye)

  IMPORTANT PRINCIPLE (baar baar aayega aage):
  Jab Milestone 2 mein real Postgres database aayega, tab is file ke
  ANDAR ka code badlega (array se lena vs database se query karna,
  function async ban jayega) — LEKIN function ka NAAM aur wo KYA
  RETURN karta hai, wo SAME rahega. Isliye jo pages ye functions call
  karte hain, unka code bilkul nahi badlega. Isi ko kehte hain:
  "implementation ko hide karo, sirf interface expose karo."

  export KEYWORD KA KAAM:
  Kisi type/function ko is file ke BAHAR, doosri files mein use karne
  layak banata hai. Bina export ke, koi doosri file import nahi kar
  paayegi.
*/