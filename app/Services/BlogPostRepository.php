<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\ContentRepositoryContract;
use App\Models\BlogPost;
use DateInterval;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Override;

final readonly class BlogPostRepository implements ContentRepositoryContract
{
    private const string POSTS_CACHE_KEY = 'allPosts';

    #[Override]
    public function getBlogPostBySlug(string $slug): BlogPost
    {
        // We won't cache the blogs, easier to let the view counts ride
        $post = BlogPost::select([
            'id',
            'slug',
            'keywords',
            'hero_image',
            'published_date',
            'category',
            'title',
            'views',
            'parsed_content',
        ])->firstWhere('slug', $slug);

        if (is_null($post)) {
            abort(404);
        }

        // While we're at it, add a view count
        // AddView::dispatch($post);

        $post->views += 1;
        $post->save();

        return $post;
    }

    #[Override]
    public function getLatestBlogPostMetadata(): Collection
    {
        /** @var Collection<int, BlogPost> $posts */
        $posts = self::getBlogPostMetadata()
            ->sortByDesc('published_date')
            ->take(3);

        return $posts;
    }

    #[Override]
    public function getBlogPostMetadata(): Collection
    {
        if (Cache::has(self::POSTS_CACHE_KEY)) {
            /** @var Collection<int, BlogPost> $allPosts */
            $allPosts = Cache::get(self::POSTS_CACHE_KEY);

            return $allPosts;
        }

        /** @var Collection<int, BlogPost> $posts */
        $posts = BlogPost::select([
            'slug',
            'published_date',
            'category',
            'description',
            'title',
            'views',
        ])
            ->orderByDesc('published_date')
            ->get();

        Cache::set(self::POSTS_CACHE_KEY, $posts, new DateInterval('PT5M'));

        return $posts;
    }
}
