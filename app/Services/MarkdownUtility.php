<?php

declare(strict_types=1);

namespace App\Services;

use App\Contracts\ContentUtilityContract;
use App\Models\Keyword;
use App\Models\Post;
use App\ValueObjects\ContentMeta;
use Illuminate\Support\Facades\Log;
use League\CommonMark\Extension\FrontMatter\Data\SymfonyYamlFrontMatterParser;
use League\CommonMark\Extension\FrontMatter\FrontMatterParser;
use Override;
use Spatie\LaravelMarkdown\MarkdownRenderer;

final readonly class MarkdownUtility implements ContentUtilityContract
{
    public function __construct(private MarkdownRenderer $renderer)
    {
    }

    #[Override]
    public function getMarkdownFilePaths(): array
    {
        $basePath = base_path();
        $contentPath = "$basePath".'/content';

        Log::info("identified content path as $contentPath, globbing content files");

        /** @var string[] $files */
        $files = app()->environment() === 'local'
            ? glob("$contentPath/**/*.md", GLOB_BRACE)
            : glob("$contentPath/*[!draft]/*.md", GLOB_BRACE);

        $fileCount = count($files);

        Log::info("$fileCount globbed files found");

        return $files;
    }

    #[Override]
    public function getParsedContent(string $filePath): ContentMeta
    {
        Log::info("parsing content for file $filePath");

        /** @var string $contents */
        $contents = file_get_contents($filePath);

        /** @var array{dirname:string, basename:string, extension:string, filename:string} $fileInfo */
        $fileInfo = pathinfo($filePath);
        $extension = $fileInfo['extension'] === ''
            ? ''
            : '.'.$fileInfo['extension'];
        $fileSlug = basename($filePath, $extension);

        Log::info("file parsed, determined slug as $fileSlug");

        $frontMatterParser = new FrontMatterParser(new SymfonyYamlFrontMatterParser());
        $parsedContent = $frontMatterParser->parse($contents);

        /** @var array{title: string, description: string, keywords: string[], pubDate: string, heroImage: string, category: string} $frontMatter */
        $frontMatter = $parsedContent->getFrontMatter();
        $markdown = $parsedContent->getContent();
        $html = $this->renderer
            ->highlightTheme('tokyo-night')
            ->toHtml($markdown);

        Log::info('frontmatter and content parsed');

        return new ContentMeta($fileSlug, $markdown, $html, $frontMatter);
    }

    #[Override]
    public function upsertBlogPost(ContentMeta $contentMeta): Post
    {
        $contentSlug = $contentMeta->slug;

        Log::info("upserting blog post $contentSlug");

        $upsertedBlog = Post::updateOrCreate([
            'slug' => $contentSlug,
        ], [
            'slug' => $contentSlug,
            'title' => $contentMeta->frontMatter->data['title'],
            'description' => $contentMeta->frontMatter->data['description'],
            'category' => $contentMeta->frontMatter->data['category'],
            'published_date' => $contentMeta->frontMatter->data['pubDate'],
            'hero_image' => $contentMeta->frontMatter->data['heroImage'],
            'raw_content' => $contentMeta->markdown,
            'parsed_content' => $contentMeta->html,
        ]);

        foreach ($contentMeta->frontMatter->data['keywords'] as $keyword) {
            $keyword = Keyword::firstOrCreate(['word' => strtolower($keyword)]);
            $upsertedBlog->keywords()->attach($keyword);
        }

        Log::info('blog content updated!');

        return $upsertedBlog;
    }

    #[Override]
    public function upsertBlogPostWithViewCount(ContentMeta $contentMeta, array $views): Post
    {
        $contentSlug = $contentMeta->slug;
        $view = collect($views)->firstWhere('slug', $contentSlug);
        $viewCount = $view['views'] ?? 0;

        Log::info("upserting blog post $contentSlug with view count $viewCount");

        $upsertedBlog = Post::updateOrCreate([
            'slug' => $contentSlug,
        ], [
            'slug' => $contentSlug,
            'title' => $contentMeta->frontMatter->data['title'],
            'description' => $contentMeta->frontMatter->data['description'],
            'category' => $contentMeta->frontMatter->data['category'],
            'published_date' => $contentMeta->frontMatter->data['pubDate'],
            'hero_image' => $contentMeta->frontMatter->data['heroImage'],
            'raw_content' => $contentMeta->markdown,
            'parsed_content' => $contentMeta->html,
            'views' => $viewCount,
        ]);

        foreach ($contentMeta->frontMatter->data['keywords'] as $keyword) {
            $keyword = Keyword::firstOrCreate(['word' => strtolower($keyword)]);
            $upsertedBlog->keywords()->attach($keyword);
        }

        Log::info('blog content updated!');

        return $upsertedBlog;
    }
}
