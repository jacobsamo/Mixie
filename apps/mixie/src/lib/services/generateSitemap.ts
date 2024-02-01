import fs from "fs";
import prettier from "prettier";

interface RequiredFelids {
  /**the id of the item */
  id: string;
  /**
   * The date the item was created
   */
  createdAt: Date;
  /**
   * The date the item was last updated
   */
  lastUpdated?: Date;
}

export interface SitemapProps {
  /**
   * This is the route between the domain and the id
   * e.g. https://mixiecooking.com/restaurant/123456
   * the route is `restaurant` in this case
   */
  route: string;
  /**
   * The name of the file to be generated
   * @example
   * generateSiteMap(1, 'restaurant', 1, new Date(), new Date(), 'restaurant')
   *
   * This will generate a file called `sitemap-restaurant.xml`
   */
  fileName: string;
}

export async function generateSiteMap<T extends RequiredFelids>(
  options: SitemapProps,
  data: T[]
) {
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
                    <loc>${`https://mixiecooking.com/${options.route}/${data.id}`}</loc>
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
  fs.writeFileSync(`public/sitemap-${options.fileName}.xml`, formatted);
}
