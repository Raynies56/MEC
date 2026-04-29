import { MetadataRoute } from "next";

/**
 * robots.txt — Controls search engine crawling
 * Blocks admin routes, allows everything else
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/dashboard/", "/login/"],
      },
    ],
    sitemap: "https://visionplena.com/sitemap.xml",
  };
}
