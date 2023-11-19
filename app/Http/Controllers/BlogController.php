<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Utilities\ContentCache;
use Inertia\Inertia;
use Inertia\Response;
use Request;

class BlogController
{
    public function __construct(
        protected ContentCache $contentCache
    ) {
    }

    public function all(Request $request): Response
    {
        ddd($this->contentCache->getContentMetas());

        return Inertia::render('Blog/Index');
    }

    public function post(Request $request, string $slug): Response
    {
        $contentMeta = $this->contentCache->getContentMeta($slug);

        if (isset($contentMeta)) {
            return Inertia::render('Blog/Pos    t/Index', [
                'contentMeta' => $contentMeta,
            ]);
        }

        abort(404);
    }
}
