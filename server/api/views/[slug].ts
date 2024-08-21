import { eq } from 'drizzle-orm';
import { posts } from '~~/database/schema';

const botPatterns = [
  '/googlebot/i', // Google's web crawler
  '/bingbot/i', // Microsoft's Bing bot
  '/slurp/i', // Yahoo's search engine bot
  '/duckduckbot/i', // DuckDuckGo's bot
  '/baiduspider/i', // Baidu's bot
  '/yandexbot/i', // Yandex's bot
];

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? '';
  const headers = getHeaders(event);
  const agent = headers['User-Agent'] ?? '';
  const db = useDb();

  const currentViewCount = await db
    .select({
      views: posts.views,
    })
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  const currentViews = currentViewCount[0].views;

  // Bot crawling the post most likely, no need to increment view count
  if (agent && botPatterns.some(p => new RegExp(p).test(agent))) {
    return {
      views: currentViews,
    };
  }

  if (currentViewCount && currentViewCount.length > 0) {
    const views = currentViewCount[0].views;
    await db
      .update(posts)
      .set({ views: views + 1 })
      .where(eq(posts.slug, slug));
  }
  else {
    await db.insert(posts).values({
      slug,
      views: 1,
    });
  }

  return {
    views: currentViews,
  };
});
