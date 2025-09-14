import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: "export",          // enable static export
  images: { unoptimized: true }, // disable next/image optimization
  basePath: isProd ? "/100-urige-werkweek" : "",
  assetPrefix: isProd ? "/100-urige-werkweek/" : "",
}