const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? "/100-urige-werkweek" : "",
  assetPrefix: isProd ? "/100-urige-werkweek/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/100-urige-werkweek" : ""
  }
};