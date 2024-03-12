<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Contracts\ContentRepositoryContract;
use App\Models\Note;
use Inertia\Inertia;
use Inertia\Response;

final class HomeController extends Controller
{
    public function __construct(private readonly ContentRepositoryContract $contentRepository)
    {
    }

    public function __invoke(): Response
    {
        $frontMatters = collect($this->contentRepository->getLatestBlogPostMetadata())
            ->toArray();
        $notes = Note::select(['description', 'title'])
            ->orderByDesc('created_at')
            ->limit(3)
            ->get()
            ->toArray();

        return Inertia::render('Index', [
            'frontMatters' => array_values($frontMatters),
            'notes' => array_values($notes),
        ]);
    }
}
