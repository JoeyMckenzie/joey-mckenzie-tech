import{_ as w}from"./nuxt-link.a1576515.js";import{g as h,o as c,i as b,w as r,r as u,c as l,a as t,b as s,F as k,j as N,d as v,t as x,_ as y,n as j,q as f,A as L}from"./entry.f5d3264e.js";import{_ as S}from"./HtmlTag.vue.0a43214f.js";import g from"./Icon.10f87f20.js";import{u as C}from"./fetch.3fac2d02.js";import"./state.98fb7f43.js";import"./config.e014599e.js";import"./index.462b31df.js";const P=h({__name:"NavLink",props:{href:{}},setup(o){const n=o;return(e,a)=>{const i=w;return c(),b(i,{to:n.href,class:"inline-flex rounded px-2 py-1 font-roboto-mono font-medium text-neutral-400 hover:bg-neutral-700","active-class":"border border-transparent bg-neutral-800 text-neutral-300 focus:outline-none"},{default:r(()=>[u(e.$slots,"default")]),_:3},8,["to"])}}}),B={class:"flex flex-row items-center justify-center gap-x-2 px-6 pt-8"},J=h({__name:"LayoutNavbar",setup(o){const n=[{display:"Home",href:"/"},{display:"About",href:"/about"},{display:"Blog",href:"/blog"}];return(e,a)=>{const i=P,_=S;return c(),l("header",null,[t("nav",B,[s(_,{"additional-classes":"hidden sm:block","tag-name":"menu"},{default:r(()=>[(c(),l(k,null,N(n,m=>s(i,{key:m.display,href:m.href},{default:r(()=>[v(x(m.display),1)]),_:2},1032,["href"])),64))]),_:1})])])}}}),T={},I={class:"flex justify-center space-x-6 md:order-2"},M={href:"https://twitter.com/_joeyMcKenzie",class:"text-neutral-400 hover:text-neutral-500"},z=t("span",{class:"sr-only"},"Twitter",-1),A={href:"https://github.com/JoeyMcKenzie",class:"text-neutral-400 hover:text-neutral-500"},F=t("span",{class:"sr-only"},"GtiHub",-1),V={href:"https://www.youtube.com/channel/UCkdpN-mQSyJ_2XJMU1kQ5fA#",class:"text-neutral-400 hover:text-neutral-500"},D=t("span",{class:"sr-only"},"YouTube",-1),H={href:"https://twitch.tv/JoeTheDevMan",class:"text-neutral-400 hover:text-neutral-500"},K=t("span",{class:"sr-only"},"Twitch",-1),Q={href:"https://linkedin.com/in/JoeyMcKenzie",class:"text-neutral-400 hover:text-neutral-500"},R=t("span",{class:"sr-only"},"LinkedIn",-1);function U(o,n){const e=g;return c(),l("div",null,[t("div",I,[t("a",M,[z,s(e,{name:"mdi:twitter",class:"h-6 w-6","aria-hidden":"true"})]),t("a",A,[F,s(e,{name:"mdi:github",class:"h-6 w-6","aria-hidden":"true"})]),t("a",V,[D,s(e,{name:"mdi:youtube",class:"h-6 w-6","aria-hidden":"true"})]),t("a",H,[K,s(e,{name:"mdi:twitch",class:"h-6 w-6","aria-hidden":"true"})]),t("a",Q,[R,s(e,{name:"mdi:linkedin",class:"h-6 w-6","aria-hidden":"true"})])])])}const q=y(T,[["render",U]]),E={class:"flex flex-col space-y-1"},G={class:"flex flex-row items-center justify-center space-x-2"},X={class:"flex flex-col"},Y={class:"text-xs text-neutral-500"},O=h({__name:"NotCurrentlyListening",props:{text:{type:String,default:"Not currently listening"}},setup(o){const n=o;return(e,a)=>(c(),l("div",E,[t("div",G,[u(e.$slots,"default"),t("div",X,[t("h4",Y,x(n.text),1)])])]))}}),W=["href"],Z=t("h2",{class:"inline-flex justify-center font-ubuntu text-xs text-neutral-400"}," Now listening ",-1),tt={class:"flex flex-row items-center justify-center space-x-2"},et=["src"],st={class:"flex flex-col truncate"},nt={class:"text-xs font-semibold text-neutral-300"},ot={class:"text-xs text-neutral-400"},at=h({__name:"CurrentlyPlaying",props:{response:{}},setup(o){const n=o;return(e,a)=>(c(),l("a",{href:n.response.href,target:"_blank",rel:"noreferrer",class:"flex flex-col space-y-1"},[Z,t("div",tt,[u(e.$slots,"default"),t("img",{src:n.response.albumImageSrc,width:"30",height:"30",alt:"Spotify listenting to",class:"rounded-sm"},null,8,et),t("div",st,[t("h4",nt,x(n.response.trackTitle),1),t("p",ot,x(n.response.artist),1)])])],8,W))}}),ct={key:0},rt={key:1},lt={key:2},it=h({__name:"NowPlaying",async setup(o){let n,e;const{data:a,pending:i}=([n,e]=j(()=>C("/api/spotify","$jreJfgp754")),n=await n,e(),n);return(_,m)=>{var $;const d=O,p=at;return f(i)?(c(),l("div",ct,[s(d,{text:"Loading..."},{default:r(()=>[u(_.$slots,"default")]),_:3})])):!f(i)&&(($=f(a))!=null&&$.nowPlaying)?(c(),l("div",rt,[s(p,{response:f(a)},{default:r(()=>[u(_.$slots,"default")]),_:3},8,["response"])])):(c(),l("div",lt,[s(d,null,{default:r(()=>[u(_.$slots,"default")]),_:3})]))}}}),_t={class:"mx-auto inline-flex flex-row items-center gap-x-2 md:order-1 md:mx-0"},ut=t("p",{class:"text-center font-ubuntu text-xs leading-5 text-neutral-500"}," Powered by ",-1),dt=t("span",{class:"sr-only"},"Vue",-1),pt=t("span",{class:"sr-only"},"vercel",-1),ht=t("span",{class:"sr-only"},"Nuxt",-1),mt=h({__name:"PoweredBy",setup(o){const e=L().public.commitSha,a=`https://github.com/JoeyMckenzie/joey-mckenzie-tech/commit/${e}`,i=e==null?void 0:e.substring(0,6);return(_,m)=>{const d=g,p=w;return c(),l("div",_t,[ut,s(p,{external:!0,to:"https://vuejs.org"},{default:r(()=>[dt,s(d,{name:"logos:vue",class:"h-4 w-4"})]),_:1}),s(p,{external:!0,to:"https://vercel.com"},{default:r(()=>[pt,s(d,{name:"simple-icons:vercel",class:"h-4 w-4 text-gray-100 hover:text-gray-200"})]),_:1}),s(p,{external:!0,to:"https://nuxt.com"},{default:r(()=>[ht,s(d,{name:"simple-icons:nuxtdotjs",class:"h-6 w-6 text-green-500 hover:text-green-400"})]),_:1}),s(p,{external:!0,to:a,class:"text-center font-ubuntu text-xs leading-5 text-neutral-500 hover:text-neutral-400"},{default:r(()=>[v(x(f(i)),1)]),_:1})])}}}),ft={},xt={class:"mx-auto flex max-w-4xl flex-col gap-y-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:gap-y-0 lg:px-8"};function yt(o,n){const e=q,a=g,i=it,_=mt;return c(),l("footer",xt,[s(e),s(i,null,{default:r(()=>[s(a,{class:"h-6 w-6",name:"logos:spotify-icon"})]),_:1}),s(_)])}const gt=y(ft,[["render",yt]]),$t={},wt={class:"mx-auto max-w-screen-lg px-6 pt-12 lg:px-8"};function vt(o,n){const e=J,a=gt;return c(),l("div",null,[s(e),t("main",wt,[u(o.$slots,"default")]),s(a)])}const Bt=y($t,[["render",vt]]);export{Bt as default};
