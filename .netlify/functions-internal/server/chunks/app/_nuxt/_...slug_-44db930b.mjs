import _sfc_main$1 from './ContentDoc-07657129.mjs';
import { _ as _sfc_main$2 } from './FormattedDate-2afc3c99.mjs';
import _sfc_main$3 from './ContentRenderer-16736ec0.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-e4ece057.mjs';
import __nuxt_component_2 from './Icon-d8adf2b6.mjs';
import { defineComponent, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { b as useRoute, d as useFetch } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import '../../nitro/netlify.mjs';
import 'node:http';
import 'node:https';
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
import 'node:url';
import 'ipx';
import './ContentQuery-2a62b439.mjs';
import './ContentRendererMarkdown-6b4feeaa.mjs';
import 'property-information';
import './state-458c4d4e.mjs';
import './config-91effbe8.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { path } = useRoute();
    useFetch("/api/blogs/view", {
      method: "POST",
      body: { slug: (_a = path.split("/")[2]) != null ? _a : "" }
    }, "$ij35HG41ph");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentDoc = _sfc_main$1;
      const _component_FormattedDate = _sfc_main$2;
      const _component_ContentRenderer = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_ContentDoc, null, {
        default: withCtx(({ doc }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<article class="prose prose-invert mx-auto overflow-hidden pb-12 font-merriweather text-neutral-400 prose-h2:text-neutral-200 prose-a:text-neutral-200 hover:prose-a:text-neutral-300 prose-code:text-neutral-300 prose-img:mx-auto prose-img:rounded-md"${_scopeId}><h1 class="text-center font-merriweather text-2xl text-neutral-300"${_scopeId}>${ssrInterpolate(doc.title)}</h1><div class="flex flex-row items-center justify-center gap-x-2 font-roboto-mono text-sm tracking-tighter"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_FormattedDate, {
              date: new Date(doc.pubDate)
            }, null, _parent2, _scopeId));
            _push2(`<span class="font-bold"${_scopeId}>#${ssrInterpolate(doc.category)}</span></div><img width="540" height="280"${ssrRenderAttr("src", doc.heroImage)} alt="Blog header image"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ContentRenderer, { value: doc }, null, _parent2, _scopeId));
            _push2(`</article>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/blog",
              type: "button",
              class: "mx-auto flex w-40 items-center justify-center gap-x-1.5 rounded-md bg-neutral-800 px-3 py-2 text-sm font-semibold text-neutral-400 shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "ic:round-arrow-back",
                    class: "h-6 w-6"
                  }, null, _parent3, _scopeId2));
                  _push3(` Back to blogs `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "ic:round-arrow-back",
                      class: "h-6 w-6"
                    }),
                    createTextVNode(" Back to blogs ")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("article", { class: "prose prose-invert mx-auto overflow-hidden pb-12 font-merriweather text-neutral-400 prose-h2:text-neutral-200 prose-a:text-neutral-200 hover:prose-a:text-neutral-300 prose-code:text-neutral-300 prose-img:mx-auto prose-img:rounded-md" }, [
                createVNode("h1", { class: "text-center font-merriweather text-2xl text-neutral-300" }, toDisplayString(doc.title), 1),
                createVNode("div", { class: "flex flex-row items-center justify-center gap-x-2 font-roboto-mono text-sm tracking-tighter" }, [
                  createVNode(_component_FormattedDate, {
                    date: new Date(doc.pubDate)
                  }, null, 8, ["date"]),
                  createVNode("span", { class: "font-bold" }, "#" + toDisplayString(doc.category), 1)
                ]),
                createVNode("img", {
                  width: "540",
                  height: "280",
                  src: doc.heroImage,
                  alt: "Blog header image"
                }, null, 8, ["src"]),
                createVNode(_component_ContentRenderer, { value: doc }, null, 8, ["value"])
              ]),
              createVNode(_component_NuxtLink, {
                to: "/blog",
                type: "button",
                class: "mx-auto flex w-40 items-center justify-center gap-x-1.5 rounded-md bg-neutral-800 px-3 py-2 text-sm font-semibold text-neutral-400 shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "ic:round-arrow-back",
                    class: "h-6 w-6"
                  }),
                  createTextVNode(" Back to blogs ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-44db930b.mjs.map
