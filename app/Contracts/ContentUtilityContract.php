<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Post;
use App\ValueObjects\ContentMeta;

interface ContentUtilityContract
{
    /**
     * @return string[]
     */
    public function getMarkdownFilePaths(): array;

    public function getParsedContent(string $filePath): ContentMeta;

    public function upsertBlogPost(ContentMeta $contentMeta): Post;

    /** @param array<int, array{slug: string, views: int}> $views */
    public function upsertBlogPostWithViewCount(ContentMeta $contentMeta, array $views): Post;
}
