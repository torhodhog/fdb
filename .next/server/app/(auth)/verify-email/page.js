(()=>{var e={};e.id=552,e.ids=[552],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},81057:(e,t,s)=>{"use strict";s.d(t,{Z:()=>i});var r=s(3528);let i=(0,r.Z)("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]])},72285:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>a.a,__next_app__:()=>x,originalPathname:()=>m,pages:()=>d,routeModule:()=>u,tree:()=>c});var r=s(67096),i=s(16132),n=s(37284),a=s.n(n),l=s(32564),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);s.d(t,o);let c=["",{children:["(auth)",{children:["verify-email",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,46038)),"/Users/torgeirhogheim/Downloads/torgeirtried-main-main 2/src/app/(auth)/verify-email/page.tsx"]}]},{}]},{"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(s.bind(s,21316)),"/Users/torgeirhogheim/Downloads/torgeirtried-main-main 2/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9291,23)),"next/dist/client/components/not-found-error"]}],d=["/Users/torgeirhogheim/Downloads/torgeirtried-main-main 2/src/app/(auth)/verify-email/page.tsx"],m="/(auth)/verify-email/page",x={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/(auth)/verify-email/page",pathname:"/verify-email",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},89936:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,46686,23)),Promise.resolve().then(s.bind(s,65907))},65907:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var r=s(30784),i=s(37422),n=s(81057),a=s(80087),l=s(52451),o=s.n(l),c=s(11440),d=s.n(c),m=s(45304);let __WEBPACK_DEFAULT_EXPORT__=({token:e})=>{let{data:t,isLoading:s,isError:l}=i.S.auth.verifyEmail.useQuery({token:e});return l?(0,r.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[r.jsx(n.Z,{className:"h-8 w-8 text-red-600"}),r.jsx("h3",{className:"font-semibold text-xl",children:"There was a problem"}),r.jsx("p",{className:"text-muted-foreground text-sm",children:"This token is not valid or might be expired. Please try again."})]}):t?.success?(0,r.jsxs)("div",{className:"flex h-full flex-col items-center justify-center",children:[r.jsx("div",{className:"relative mb-4 h-60 w-60 text-muted-foreground",children:r.jsx(o(),{src:"/hippo-email-sent.png",fill:!0,alt:"the email was sent"})}),r.jsx("h3",{className:"font-semibold text-2xl",children:"You're all set!"}),r.jsx("p",{className:"text-muted-foreground text-center mt-1",children:"Thank you for verifying your email."}),r.jsx(d(),{className:(0,m.d)({className:"mt-4"}),href:"/sign-in",children:"Sign in"})]}):s?(0,r.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[r.jsx(a.Z,{className:"animate-spin h-8 w-8 text-zinc-300"}),r.jsx("h3",{className:"font-semibold text-xl",children:"Verifying..."}),r.jsx("p",{className:"text-muted-foreground text-sm",children:"This won't take long."})]}):void 0}},46038:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>page});var r=s(4656),i=s(95153);let n=(0,i.createProxy)(String.raw`/Users/torgeirhogheim/Downloads/torgeirtried-main-main 2/src/components/VerifyEmail.tsx`),{__esModule:a,$$typeof:l}=n,o=n.default;var c=s(58639),d=s.n(c);let page=({searchParams:e})=>{let t=e.token,s=e.to;return r.jsx("div",{className:"container relative flex pt-20 flex-col items-center justify-center lg:px-0",children:r.jsx("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:t&&"string"==typeof t?r.jsx("div",{className:"grid gap-6",children:r.jsx(o,{token:t})}):(0,r.jsxs)("div",{className:"flex h-full flex-col items-center justify-center space-y-1",children:[r.jsx("div",{className:"relative mb-4 h-60 w-60 text-muted-foreground",children:r.jsx(d(),{src:"/logo.png",fill:!0,alt:"logo"})}),r.jsx("h3",{className:"font-semibold text-2xl",children:"Sjekk mailen"}),s?(0,r.jsxs)("p",{className:"text-muted-foreground text-center",children:["Vi har sendt en verifikasjonsmail til"," ",r.jsx("span",{className:"font-semibold",children:s}),"."]}):r.jsx("p",{className:"text-muted-foreground text-center",children:"Vi har sendt en verifikasjonsmail til din mail."}),r.jsx("p",{children:"Finner du den ikke? Sjekk s\xf8ppelpost, eller ta kontakt med oss"})]})})})}}};var t=require("../../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[524,18],()=>__webpack_exec__(72285));module.exports=s})();