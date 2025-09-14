const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/100-urige-werkweek" : "",
  //assetPrefix: isProd ? "/100-urige-werkweek/" : "",
};

export default nextConfig;