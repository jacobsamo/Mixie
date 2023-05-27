import prettier from 'prettier';
import fs from 'fs';
import { Timestamp } from 'firebase/firestore';

export async function generateSiteMap<
  T extends {
    id?: string;
    uid?: string;
    lastUpdated?: Timestamp;
    createdAt: Timestamp;
  }
>(data: T[], fileName: string) {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc');
  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          ${data
            .map((data) => {
              return `
                <url>
                    <loc>${`https://meally.com.au/recipes/${
                      data.id || data.uid
                    }`}</loc>
                    <lastmod>${
                      data.lastUpdated || data.createdAt.toDate().toISOString()
                    }</lastmod>
                </url>
              `;
            })
            .join('')}
      </urlset>
      `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync(`public/sitemap-${fileName}.xml`, formatted);
}
