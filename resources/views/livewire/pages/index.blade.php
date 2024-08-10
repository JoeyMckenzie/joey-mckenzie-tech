<div class="mx-auto flex flex-col items-center space-y-12 py-12">
    <div>
        <div class="prose dark:prose-invert">
            <h2 class="text-4xl font-extrabold tracking-tight sm:text-4xl">
                Hi, I'm Joey.
            </h2>
            <p class="mx-auto mt-6">
                I'm a software developer based in Northern California working in
                fintech. I enjoy writing about software, design, dad jokes, and
                cheap beer among a few other things. I like building fast,
                efficient web services, learning new things, and writing code in
                the open source ecosystem.
            </p>
        </div>
        <x-social-buttons />
    </div>
    <x-blog-previews :posts="$posts" />
    <a href="{{ route("blog") }}">
        <x-button lime>
            Blog
            <span class="icon-[gridicons--external] h-5 w-5"></span>
        </x-button>
    </a>
</div>
