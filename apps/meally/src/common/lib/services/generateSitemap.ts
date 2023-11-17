import prettier from "prettier";
import fs from "fs";

export async function generateSiteMap<
  T extends {
    id?: string;
    userName?: string;
    lastUpdated?: Date;
    createdAt: Date;
  },
>(data: T[], route: string, fileName: string) {
  const prettierConfig = await prettier.resolveConfig(
    "../../../../../../prettier.config.js"
  );
  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${data
            .map((data) => {
              const time = data.lastUpdated || data.createdAt;
              return `
                <url>
                    <loc>${`https://meally.com.au/${route}/${
                      data.id || data.userName
                    }`}</loc>
                    <lastmod>${time.toString()}</lastmod>
                </url>
              `;
            })
            .join("")}
      </urlset>
      `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync(`sitemap-${fileName}.xml`, formatted);
}
