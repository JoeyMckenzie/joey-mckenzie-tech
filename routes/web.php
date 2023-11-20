<?php

declare(strict_types=1);

use App\Http\Controllers\ProfileController;
use App\Utilities\ContentCache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', fn () => Inertia::render('Home'))
    ->name('home');

Route::get('about', fn () => Inertia::render('About'))
    ->name('about');

Route::get('blog', fn (ContentCache $contentCache) => Inertia::render('Blog/Index', [
    'contentMetas' => $contentCache->getContentMetas(),
]))
    ->name('blogs');

Route::get('blog/{slug}', fn (string $slug, ContentCache $contentCache) => Inertia::render('Blog/Post/Index', [
    'contentMeta' => $contentCache->getContentMeta($slug),
]))
    ->name('post');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
