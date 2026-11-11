import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://littlekingdomedu.com";
  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  const siteUrl = withProtocol.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
