import { writeFileSync } from 'fs';
import { globby } from 'globby';
// import RecipeService from '../src/common/libs/service/RecipeService.js';
import prettier from 'prettier';


async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc');
  const now = new Date();
  const sitemap = `
  <sitmapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
      <loc>http://meally.com.au/sitemap-static.xml</loc>
      <lastmod>${now.toISOString()}</lastmod>
  </sitemap>
  <sitemap>
      <loc>http://meally.com.au/sitemap-recipes.xml</loc>
      <lastmod>${now.toISOString()}</lastmod>
  </sitemap>
</sitmapindex>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted);
}

async function generateStatic() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc');
  const pages = await globby([
    'pages/*.js',
    'pages/*.tsx',
    'pages/*.ts',
    'pages/*.tsx',
    'data/**/*.mdx',
    '!data/*.mdx',
    '!pages/_*.js',
    '!pages/api',
    '!pages/404.tsx',
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('data', '')
              .replace('.js', '')
              .replace('.jsx', '')
              .replace('.ts', '')
              .replace('.tsx', '')
              .replace('.mdx', '');
            const route = path === '/index' ? '' : path;

            return `
              <url>
                  <loc>${`https://meally.com.au${route}`}</loc>
                  <changefreq>weekly</changefreq>
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
  writeFileSync('public/sitemap-static.xml', formatted);
}

// async function generateRecipes() {
//   const prettierConfig = await prettier.resolveConfig('./.prettierrc');
//   const recipes = await RecipeService.getAllRecipes();
//   const sitemap = `
//     <?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${recipes
//           .map((recipe) => {
//             return `
//               <url>
//                   <loc>${`https://meally.com.au/recipes/${recipe.id}`}</loc>
//                   <lastmod>${recipe.lastUpdated
//                     .toDate()
//                     .toISOString()}</lastmod>
//               </url>
//             `;
//           })
//           .join('')}
//     </urlset>
//     `;

//   const formatted = prettier.format(sitemap, {
//     ...prettierConfig,
//     parser: 'html',
//   });

//   // eslint-disable-next-line no-sync
//   writeFileSync('public/sitemap-recipes.xml', formatted);
// }
// generateRecipes();

generate();
generateStatic();