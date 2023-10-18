import { _ as _sfc_main$2 } from './SectionHeader-1944ba4b.mjs';
import { defineComponent, useSSRContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as useSeoMeta, _ as _export_sfc } from '../server.mjs';
import './HtmlTag-e3b0f009.mjs';
import '../../nitro/vercel.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'shikiji';
import 'unified';
import 'mdast-util-to-string';
import 'micromark';
import 'unist-util-stringify-position';
import 'micromark-util-character';
import 'micromark-util-chunked';
import 'micromark-util-resolve-all';
import 'micromark-util-sanitize-uri';
import 'slugify';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'hast-util-to-string';
import 'github-slugger';
import 'detab';
import 'remark-emoji';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'unist-util-visit';
import 'feed';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "prose mx-auto flex max-w-2xl flex-col text-sm leading-6 text-neutral-400" }, _attrs))}><p class="mt-6"> I&#39;m Joey. I&#39;ve got a passion for the web and developing services and applications with performance in mind. I&#39;ve spent nearly a decade working on technologies across the stack, from Java, IBM, .NET, and most of the major web frontend frameworks you&#39;ll see folks arguing about over on <a class="text-indigo-400 hover:text-indigo-500" href="https://reddit.com/r/webdev">r/webdev</a>. </p><p> By day, I&#39;m a Senior Software Engineer working on mostly .NET technologies in the web space. I&#39;ve worked professionally as a developer in healthcare, insurance, SaaS startups, manufacturing, and now finance. I enjoy building fast and efficient web services, exploring new technologies, and arguing with other developers about the value of pre-commit hooks when used wisely. </p><p> In my spare time, I work primarily within the TypeScript and Rust ecosystems (I&#39;m even writing a <a class="text-indigo-400 hover:text-indigo-500" href="https://fullstackrust.netlify.app/"> Rust web series!</a>), contributing to projects I find interesting and exploring new frontiers. I like to write about things I come across in the wild (of software), design, frameworks, and language features among other things. If I find the time, you can catch any of my content on <a class="text-indigo-400 hover:text-indigo-500" href="https://www.youtube.com/channel/UCkdpN-mQSyJ_2XJMU1kQ5fA#"> YouTube </a> or streaming live on <a class="text-indigo-400 hover:text-indigo-500" href="https://twitch.tv/JoeTheDevMan">Twitch</a>. Checkout my <a href="/blog" class="text-indigo-400 hover:text-indigo-500"> blog</a> for things I publish that mostly deal with my questionable takes on development. </p><p> Outside of refactoring legacy code and convincing managers that estimates are not deadlines, I enjoy spending time with my wife and dog, family and friends, and sampling the latest installment of adult beverages at my local breweries. </p></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about/BioSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "joeymckenzie.tech",
      ogTitle: "About | joeymckenzie.tech",
      description: "A blog about code, software, and sometimes beer.",
      ogDescription: "A blog about code, software, and sometimes beer.",
      ogImage: "https://joeymckenzie.tech/favicon-32x32.png",
      twitterCard: "summary_large_image"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SectionHeader = _sfc_main$2;
      const _component_AboutBioSection = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_SectionHeader, { title: "About" }, null, _parent));
      _push(ssrRenderComponent(_component_AboutBioSection, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-d7d46128.mjs.map
