(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[389],{6264:function(e,r,t){"use strict";t.d(r,{Z:function(){return n}});var s=t(2898);let n=(0,s.Z)("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},3707:function(e,r,t){Promise.resolve().then(t.bind(t,8743))},8743:function(e,r,t){"use strict";t.r(r);var s=t(7437),n=t(7280),i=t(3089),a=t(6582),o=t(6429),l=t(345),c=t(8110),d=t(8291),u=t(6264),f=t(1396),m=t.n(f),g=t(1865),p=t(6851),x=t(2783),h=t(1424),v=t(4033);r.default=()=>{let e=(0,v.useSearchParams)()||new URLSearchParams,r=(0,v.useRouter)(),t="seller"===e.get("as"),f=e.get("origin"),{register:b,handleSubmit:j,formState:{errors:y}}=(0,g.cI)({resolver:(0,c.F)(p.H)}),{mutate:N,isLoading:w}=x.S.auth.signIn.useMutation({onSuccess:async()=>{if(h.toast.success("Logget inn uten feil"),r.refresh(),f){r.push("/".concat(f));return}r.push("/")},onError:e=>{var r;(null===(r=e.data)||void 0===r?void 0:r.code)==="UNAUTHORIZED"&&h.toast.error("Feil epost eller passord.")}});return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("div",{className:"container relative flex pt-20 flex-col items-center justify-center lg:px-0",children:(0,s.jsxs)("div",{className:"mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]",children:[(0,s.jsxs)("div",{className:"flex flex-col items-center space-y-2 text-center",children:[(0,s.jsx)(n.P.logo,{className:"h-20 w-20"}),(0,s.jsxs)("h1",{className:"text-2xl font-semibold tracking-tight",children:["Logg inn p\xe5 din ",t?"seller":""," konto"]}),(0,s.jsxs)(m(),{className:(0,i.d)({variant:"link",className:"gap-1.5"}),href:"/sign-up",children:["Har du ingen konto?",(0,s.jsx)(d.Z,{className:"h-4 w-4"})]})]}),(0,s.jsxs)("div",{className:"grid gap-6",children:[(0,s.jsx)("form",{onSubmit:j(e=>{let{email:r,password:t,phone:s}=e;N({email:r,password:t,phone:s})}),children:(0,s.jsxs)("div",{className:"grid gap-2",children:[(0,s.jsxs)("div",{className:"grid gap-1 py-2",children:[(0,s.jsx)(o._,{htmlFor:"email",children:"Email"}),(0,s.jsx)(a.I,{...b("email"),className:(0,l.cn)({"focus-visible:ring-red-500":y.email}),placeholder:"din@epost.com"}),(null==y?void 0:y.email)&&(0,s.jsx)("p",{className:"text-sm text-red-500",children:y.email.message})]}),(0,s.jsxs)("div",{className:"grid gap-1 py-2",children:[(0,s.jsx)(o._,{htmlFor:"password",children:"Passord"}),(0,s.jsx)(a.I,{...b("password"),type:"password",className:(0,l.cn)({"focus-visible:ring-red-500":y.password}),placeholder:"Password"}),(null==y?void 0:y.password)&&(0,s.jsx)("p",{className:"text-sm text-red-500",children:y.password.message})]}),(0,s.jsxs)(i.z,{disabled:w,children:[w&&(0,s.jsx)(u.Z,{className:"mr-2 h-4 w-4 animate-spin"}),"Logg inn"]})]})}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("div",{"aria-hidden":"true",className:"absolute inset-0 flex items-center",children:(0,s.jsx)("span",{className:"w-full border-t"})}),(0,s.jsx)("div",{className:"relative flex justify-center text-xs uppercase",children:(0,s.jsx)("span",{className:"bg-background px-2 text-muted-foreground",children:"fdb"})})]}),t?(0,s.jsx)(i.z,{onClick:()=>{r.replace("/sign-in",void 0)},variant:"secondary",disabled:w,children:"Fortsett som kj\xf8per"}):null]})]})})})}},7280:function(e,r,t){"use strict";t.d(r,{P:function(){return a}});var s=t(7437),n=t(6691),i=t.n(n);let a={logo:e=>(0,s.jsx)(i(),{src:"https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/Full+logo.PNG",alt:"Logo",width:100,height:30,priority:!0,style:{width:"auto",height:"auto"}})}},3089:function(e,r,t){"use strict";t.d(r,{d:function(){return l},z:function(){return c}});var s=t(7437),n=t(2265),i=t(7256),a=t(9213),o=t(345);let l=(0,a.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=n.forwardRef((e,r)=>{let{className:t,variant:n,size:a,asChild:c=!1,...d}=e,u=c?i.g7:"button";return(0,s.jsx)(u,{className:(0,o.cn)(l({variant:n,size:a,className:t})),ref:r,...d})});c.displayName="Button"},6582:function(e,r,t){"use strict";t.d(r,{I:function(){return a}});var s=t(7437),n=t(2265),i=t(345);let a=n.forwardRef((e,r)=>{let{className:t,type:n,...a}=e;return(0,s.jsx)("input",{type:n,className:(0,i.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",t),ref:r,...a})});a.displayName="Input"},6429:function(e,r,t){"use strict";t.d(r,{_:function(){return c}});var s=t(7437),n=t(2265),i=t(6743),a=t(9213),o=t(345);let l=(0,a.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=n.forwardRef((e,r)=>{let{className:t,...n}=e;return(0,s.jsx)(i.f,{ref:r,className:(0,o.cn)(l(),t),...n})});c.displayName=i.f.displayName},345:function(e,r,t){"use strict";t.d(r,{T:function(){return formatPrice},cn:function(){return cn}});var s=t(7042),n=t(4769);function cn(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,n.m6)((0,s.W)(r))}function formatPrice(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{currency:t="NOK",notation:s="standard"}=r,n="string"==typeof e?parseFloat(e):e;return new Intl.NumberFormat("nb-NO",{style:"currency",currency:t,notation:s,maximumFractionDigits:2}).format(n)}},6851:function(e,r,t){"use strict";t.d(r,{H:function(){return n}});var s=t(4578);let n=s.z.object({email:s.z.string().email(),password:s.z.string().min(8,{message:"Passordet m\xe5 v\xe6re minst 8 tegn langt"}),phone:s.z.string().optional().refine(e=>void 0===e||/^\d{8}$/.test(e),{message:"Telefonnummeret er ikke gyldig"})});s.z.object({email:s.z.string().email(),password:s.z.string().min(8,{message:"Passordet m\xe5 v\xe6re minst 8 tegn langt"}),phone:s.z.string().optional()})},2783:function(e,r,t){"use strict";t.d(r,{S:function(){return n}});var s=t(4244);let n=(0,s.ec)()}},function(e){e.O(0,[413,747,366,424,256,971,472,744],function(){return e(e.s=3707)}),_N_E=e.O()}]);