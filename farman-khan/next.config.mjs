/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site is plain HTML/JS and can be hosted anywhere
  // (Vercel, Netlify, Hostinger, cPanel). Remove `output` to run as a Node app.
  output: "export",
  // Off on purpose: React Strict Mode mounts components twice in development,
  // and the original Originkit Vortex releases its WebGL context on unmount,
  // so the second mount would draw nothing. Production builds are unaffected.
  reactStrictMode: false,
  trailingSlash: true,
  images: { unoptimized: true },
  assetPrefix: process.env.PREVIEW ? "." : undefined,
};
export default nextConfig;
