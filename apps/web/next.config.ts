import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;

/*
  ===== FILE EXPLANATION (Hinglish) =====

  YE FILE KYU BANI:
  Next.js ka MAIN CONFIG file hai — poore app ki settings yahan
  control hoti hain (images, redirects, environment variables, etc.)

  images.remotePatterns KYU ADD KIYA:
  next/image component SECURITY ke liye by default sirf apne hi
  domain ki images allow karta hai. Humari deal images external URL
  (placehold.co) se aa rahi hain, isliye Next.js ko explicitly batana
  padta hai "ye domain TRUSTED hai, isse images load karne do." Bina
  ye bataye, <Image src="https://placehold.co/..."> error dega.

  protocol: "https" aur hostname: "placehold.co":
  Exact domain specify kar rahe hain jisse images allow karni hain —
  koi bhi RANDOM external URL se image load nahi hone deta, sirf
  jo explicitly whitelist kiya hai.

  FUTURE MEIN:
  Jab real product images S3/CloudFront (Milestone 8) se aayengi,
  tab is list mein uska domain bhi add karna padega.
*/

