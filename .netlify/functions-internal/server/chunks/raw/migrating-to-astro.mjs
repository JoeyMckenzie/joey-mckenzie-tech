// ROLLUP_NO_REPLACE 
 const migratingToAstro = "{\"parsed\":{\"_path\":\"/blog/migrating-to-astro\",\"_dir\":\"blog\",\"_draft\":false,\"_partial\":false,\"_locale\":\"\",\"title\":\"Migrating to Astro\",\"description\":\"Astro, Svelte, and Rust walk into a bar...\",\"pubDate\":\"Mar 15 2023\",\"heroImage\":\"/blog/migrating-to-astro/astro_meme.jpg\",\"category\":\"astro\",\"body\":{\"type\":\"root\",\"children\":[{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"During a recent quarter (third?) life crisis, I decided to do what every developer does when they need something to work on - I rewrote my blog from the ground up. I consider rebuilding personal blogs/portfolios a right of passage and have so far been able to squeeze a rewrite out about once every two years.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Are the rewrites ever justified? No.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Were the previous iterations functional enough for my needs? Yes.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Am I eventually going to rewrite it again in a few years? Probably.\"}]},{\"type\":\"element\",\"tag\":\"h2\",\"props\":{\"id\":\"diminishing-focus-on-content\"},\"children\":[{\"type\":\"text\",\"value\":\"Diminishing focus on content\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"My previous portfolio/blog was written with \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://nextjs.org\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"next.js\"}]},{\"type\":\"text\",\"value\":\" and while it satisfied all my developer needs to produce content, write posts, etc. I wanted to go back to the drawing board as I find I was focusing more on framework detail concerns rather than what my blog was intended to be - a resource for developer content. I was quickly losing sight of writing new content regularly and was seeking a return to basics.\"}]},{\"type\":\"element\",\"tag\":\"h2\",\"props\":{\"id\":\"astro-to-the-rescue\"},\"children\":[{\"type\":\"text\",\"value\":\"Astro to the rescue\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Enter \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://astro.build/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"astro\"}]},{\"type\":\"text\",\"value\":\", a web framework focused on content rather than framework internals. With astro, the focus is on shipping the minimal amount of JS to the client for blazingly fast\"},{\"type\":\"element\",\"tag\":\"sup\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"tm\"}]},{\"type\":\"text\",\"value\":\" static websites. My blog is nothing more than static content, and astro seemed like the perfect choice with the icing on the cake being their recently shipped \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://docs.astro.build/en/guides/content-collections/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"content collections\"}]},{\"type\":\"text\",\"value\":\" allowing developers to write type-safe markdown content.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"What's even better about astro are the various \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://docs.astro.build/en/core-concepts/framework-components/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"UI integrations\"}]},{\"type\":\"text\",\"value\":\" that users can plug and play for when rich interactivity is needed. Better yet, astro allows for full control of \"},{\"type\":\"element\",\"tag\":\"em\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"how\"}]},{\"type\":\"text\",\"value\":\" the interactive framework components should be shipped to the client. This leads us to the concept of \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://jasonformat.com/islands-architecture/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"component islands\"}]},{\"type\":\"text\",\"value\":\", or rich interactive sections of a web page that are individualistic from their static peers. Astro was built on the \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://docs.astro.build/en/concepts/islands/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"concept of islands\"}]},{\"type\":\"text\",\"value\":\", allowing users to bring in interactive JS \"},{\"type\":\"element\",\"tag\":\"em\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"without\"}]},{\"type\":\"text\",\"value\":\" affecting the rest of the page.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"What this leads to, in practice, is being able to selectively choose bits of the page to be interactive (i.e. require JS) without holding up the rendering of the rest of the page. Astro components are isolated from one another, in this sense, and default to statically rendered HTML which means \"},{\"type\":\"element\",\"tag\":\"em\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"wicked\"}]},{\"type\":\"text\",\"value\":\" fast page loading.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"This ultimately allowed me to build a primarily static site with content in markdown (this blog you're reading, for example) while giving me the ability to bring in my JS framework of choice in \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://svelte.dev/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"Svelte\"}]},{\"type\":\"text\",\"value\":\" for \\\"micro\\\" components. I refer to the integration components as \\\"micro\\\" as they're simply a rendered subset of the entire static site - we're not working within the context of a full-blown Svelte web application.\"}]},{\"type\":\"element\",\"tag\":\"h2\",\"props\":{\"id\":\"statically-dynamic\"},\"children\":[{\"type\":\"text\",\"value\":\"Statically dynamic\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Inevitably, I hit a point where rich interactivity was needed to interact with the Spotify API, adding a bit of flare to my site in the form of a widget to display whatever song/podcast I might be listening to at the moment (shout out to \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://leerob.io/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"Lee Robinson\"}]},{\"type\":\"text\",\"value\":\", he had this on a previous version of his site). Since astro is meant for primarily content-driven static websites, the SSG that astro runs pulls in all the necessary data at build time, which meant the calls to the Spotify API were snapshots of whatever I had happened to be listening to at build time rather than in real-time.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"While there were multiple ways to attack the problem of providing rich interactivity and real-time Spotify data, I went with Svelte to build out a small widget that simply retrieved data from Spotify on page load. The only issue I had with this approach was exposing my Spotify refresh token for authentication and my hashed client credentials (not a \"},{\"type\":\"element\",\"tag\":\"em\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"huge\"}]},{\"type\":\"text\",\"value\":\" issue, but one could use the hash to retrieve access tokens).\"}]},{\"type\":\"element\",\"tag\":\"h2\",\"props\":{\"id\":\"keeping-things-secure\"},\"children\":[{\"type\":\"text\",\"value\":\"Keeping things secure\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"element\",\"tag\":\"em\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"In theory\"}]},{\"type\":\"text\",\"value\":\", anyone could simply open a dev tools window and inspect the outbound requests to Spotify, grab my token, and start making requests to Spotify on my behalf - not great, as I'd eventually hit a quota/threshold in the number of calls in this scenario if this were to happen. While not a \"},{\"type\":\"element\",\"tag\":\"em\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"huge deal\"}]},{\"type\":\"text\",\"value\":\" as the song/podcast I'm currently listening to isn't exactly top-secret security clearance level information, I didn't want to have to deal with swapping my client credentials and rotating my refresh token regularly.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"The solution?\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Move the Spotify API interaction behind a serverless function. This approach allowed me to hide my credentials on the server without risk of exposure and simplifies the data fetching components on the frontend, as they're simply just retrieving the most basic information they need to display the Spotify widget without having to sift through giant JSON responses to pull out the necessary data each time a page is loaded on my site.\"}]},{\"type\":\"element\",\"tag\":\"h2\",\"props\":{\"id\":\"simply-serverless\"},\"children\":[{\"type\":\"text\",\"value\":\"Simply serverless\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Since I host using \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://vercel.com/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"Vercel\"}]},{\"type\":\"text\",\"value\":\", the most obvious solution was to use edge functions... but where's the fun in that? I write JS/TS all the time, and quite frankly, I was ready for a change of pace.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Another option was to \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"enable SSR\"}]},{\"type\":\"text\",\"value\":\" with astro, but then I lose the benefits of SSG. Astro's SSR also requires an adapter to the hosting platform to be installed and configured, and while not a painful task to do by any means, it would require a bit of lifting and shifting if I woke up tomorrow and decided to deploy to \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://pages.cloudflare.com/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"Cloudflare Pages\"}]},{\"type\":\"text\",\"value\":\" instead of Vercel.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"I've been looking for an excuse to write as much \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://www.rust-lang.org/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"Rust\"}]},{\"type\":\"text\",\"value\":\" as humanly possible in my day-to-day developer tasks, and this was the perfect opportunity to use it.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"So, I had a few options. I could write my own Rust web server and host it on \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://fly.io/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"fly.io\"}]},{\"type\":\"text\",\"value\":\", \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://www.digitalocean.com/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"DigitalOcean\"}]},{\"type\":\"text\",\"value\":\", etc. but that would have required me to manage the infrastructure a bit more closely than I would have cared for. There's also a Rust runtime for \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://docs.aws.amazon.com/sdk-for-rust/latest/dg/lambda.html\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"AWS lambda functions\"}]},{\"type\":\"text\",\"value\":\", but again, this would require more AWS infrastructure management from me for such a simple use case.\"}]},{\"type\":\"element\",\"tag\":\"h2\",\"props\":{\"id\":\"if-can-be-written-in-rust-it-will-written-rust\"},\"children\":[{\"type\":\"text\",\"value\":\"If \"},{\"type\":\"element\",\"tag\":\"em\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"can\"}]},{\"type\":\"text\",\"value\":\" be written in Rust, it \"},{\"type\":\"element\",\"tag\":\"em\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"will\"}]},{\"type\":\"text\",\"value\":\" written Rust\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Enter \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://shuttle.rs/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"shuttle\"}]},{\"type\":\"text\",\"value\":\", a relatively new platform providing users the ability to write serverless Rust functions and simply deploy on their infrastructure - little to no management on my end, fully capable of doing anything you want in Rust. Perfect!\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"At the end of the day, I'm not exactly writing mission-critical production code - I just need data from Spotify.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"But... I don't want to use JS/TS.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"And I don't want to want to fall back into SSR as I'll miss out on some nice benefits of SSG.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"And I want to write Rust.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"So let's do all of that.\"}]},{\"type\":\"element\",\"tag\":\"h2\",\"props\":{\"id\":\"many-hours-later\"},\"children\":[{\"type\":\"text\",\"value\":\"Many hours later\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Fast-forward some time, and with the help of shuttle, I was able to spin up a mighty small \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://docs.rs/axum/latest/axum/\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"axum\"}]},{\"type\":\"text\",\"value\":\" server with a single route to call out to Spotify, get some data, and marshal it into a simple response for the frontend end all while securely keeping my credentials and refresh token hidden from the outside world.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"When a page on my site loads, astro sends the necessary JS to render the Svelte Spotify widget (as you can see in the footer), and once loaded the component calls out to my serverless Rust function. Neat!\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"For the curious, all of the serverless Rust code can be found \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://github.com/JoeyMckenzie/joey-mckenzie-tech/tree/main/src/serverless\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"here\"}]},{\"type\":\"text\",\"value\":\" in the same repository that hosts this blog.\"}]},{\"type\":\"element\",\"tag\":\"h2\",\"props\":{\"id\":\"wrapping-up\"},\"children\":[{\"type\":\"text\",\"value\":\"Wrapping up\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"Project rewrites can be fun, allowing for the exploration of new technologies and language ecosystems as I'm sure we've all seen at one point or another during a company migration of existing services onto the latest shiny thing in the dev world.\"}]},{\"type\":\"element\",\"tag\":\"p\",\"props\":{},\"children\":[{\"type\":\"text\",\"value\":\"You can find all the source code of my most recent portfolio iteration on my \"},{\"type\":\"element\",\"tag\":\"a\",\"props\":{\"href\":\"https://github.com/JoeyMckenzie/joey-mckenzie-tech\",\"rel\":[\"nofollow\"]},\"children\":[{\"type\":\"text\",\"value\":\"GitHub\"}]},{\"type\":\"text\",\"value\":\" - feel free to fork your version!\"}]}],\"toc\":{\"title\":\"\",\"searchDepth\":2,\"depth\":2,\"links\":[{\"id\":\"diminishing-focus-on-content\",\"depth\":2,\"text\":\"Diminishing focus on content\"},{\"id\":\"astro-to-the-rescue\",\"depth\":2,\"text\":\"Astro to the rescue\"},{\"id\":\"statically-dynamic\",\"depth\":2,\"text\":\"Statically dynamic\"},{\"id\":\"keeping-things-secure\",\"depth\":2,\"text\":\"Keeping things secure\"},{\"id\":\"simply-serverless\",\"depth\":2,\"text\":\"Simply serverless\"},{\"id\":\"if-can-be-written-in-rust-it-will-written-rust\",\"depth\":2,\"text\":\"If can be written in Rust, it will written Rust\"},{\"id\":\"many-hours-later\",\"depth\":2,\"text\":\"Many hours later\"},{\"id\":\"wrapping-up\",\"depth\":2,\"text\":\"Wrapping up\"}]}},\"_type\":\"markdown\",\"_id\":\"content:blog:migrating-to-astro.md\",\"_source\":\"content\",\"_file\":\"blog/migrating-to-astro.md\",\"_extension\":\"md\"},\"hash\":\"x2aGPnFZvP\"}";

export { migratingToAstro as default };
//# sourceMappingURL=migrating-to-astro.mjs.map
