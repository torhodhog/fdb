(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[327],{2152:function(e,t,r){Promise.resolve().then(r.bind(r,6115))},6115:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return Contact}});var a=r(7437),s=r(2265),i=r(504),o=r(7922);let EmailJSResponseStatus=class EmailJSResponseStatus{constructor(e=0,t="Network Error"){this.status=e,this.text=t}};let l={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:(()=>{if("undefined"!=typeof localStorage)return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}})()},buildOptions=e=>e?"string"==typeof e?{publicKey:e}:"[object Object]"===e.toString()?e:{}:{},sendPost=async(e,t,r={})=>{let a=await fetch(l.origin+e,{method:"POST",headers:r,body:t}),s=await a.text(),i=new EmailJSResponseStatus(a.status,s);if(a.ok)return i;throw i},validateParams=(e,t,r)=>{if(!e||"string"!=typeof e)throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||"string"!=typeof t)throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!r||"string"!=typeof r)throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},validateTemplateParams=e=>{if(e&&"[object Object]"!==e.toString())throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},isHeadless=e=>e.webdriver||!e.languages||0===e.languages.length,headlessError=()=>new EmailJSResponseStatus(451,"Unavailable For Headless Browser"),validateBlockListParams=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if("string"!=typeof t)throw"The BlockList watchVariable has to be a string"},isBlockListDisabled=e=>!e.list?.length||!e.watchVariable,getValue=(e,t)=>e instanceof FormData?e.get(t):e[t],isBlockedValueInParams=(e,t)=>{if(isBlockListDisabled(e))return!1;validateBlockListParams(e.list,e.watchVariable);let r=getValue(t,e.watchVariable);return"string"==typeof r&&e.list.includes(r)},blockedEmailError=()=>new EmailJSResponseStatus(403,"Forbidden"),validateLimitRateParams=(e,t)=>{if("number"!=typeof e||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&"string"!=typeof t)throw"The LimitRate ID has to be a non-empty string"},getLeftTime=async(e,t,r)=>{let a=Number(await r.get(e)||0);return t-Date.now()+a},isLimitRateHit=async(e,t,r)=>{if(!t.throttle||!r)return!1;validateLimitRateParams(t.throttle,t.id);let a=t.id||e,s=await getLeftTime(a,t.throttle,r);return s>0||(await r.set(a,Date.now().toString()),!1)},limitRateError=()=>new EmailJSResponseStatus(429,"Too Many Requests"),send=async(e,t,r,a)=>{let s=buildOptions(a),i=s.publicKey||l.publicKey,o=s.blockHeadless||l.blockHeadless,n=s.storageProvider||l.storageProvider,m={...l.blockList,...s.blockList},d={...l.limitRate,...s.limitRate};return o&&isHeadless(navigator)?Promise.reject(headlessError()):(validateParams(i,e,t),validateTemplateParams(r),r&&isBlockedValueInParams(m,r))?Promise.reject(blockedEmailError()):await isLimitRateHit(location.pathname,d,n)?Promise.reject(limitRateError()):sendPost("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:i,service_id:e,template_id:t,template_params:r}),{"Content-type":"application/json"})},validateForm=e=>{if(!e||"FORM"!==e.nodeName)throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},findHTMLForm=e=>"string"==typeof e?document.querySelector(e):e,sendForm=async(e,t,r,a)=>{let s=buildOptions(a),i=s.publicKey||l.publicKey,o=s.blockHeadless||l.blockHeadless,n=l.storageProvider||s.storageProvider,m={...l.blockList,...s.blockList},d={...l.limitRate,...s.limitRate};if(o&&isHeadless(navigator))return Promise.reject(headlessError());let c=findHTMLForm(r);validateParams(i,e,t),validateForm(c);let u=new FormData(c);return isBlockedValueInParams(m,u)?Promise.reject(blockedEmailError()):await isLimitRateHit(location.pathname,d,n)?Promise.reject(limitRateError()):(u.append("lib_version","4.4.1"),u.append("service_id",e),u.append("template_id",t),u.append("user_id",i),sendPost("/api/v1.0/email/send-form",u))};var n={init:(e,t="https://api.emailjs.com")=>{if(!e)return;let r=buildOptions(e);l.publicKey=r.publicKey,l.blockHeadless=r.blockHeadless,l.storageProvider=r.storageProvider,l.blockList=r.blockList,l.limitRate=r.limitRate,l.origin=r.origin||t},send:send,sendForm:sendForm,EmailJSResponseStatus:EmailJSResponseStatus},m=r(1424);function Contact(){let e=(0,s.useRef)(null),[t,r]=(0,s.useState)({user_email:"",user_name:"",message:""}),handleChange=e=>{r({...t,[e.target.name]:e.target.value})},resetForm=()=>{r({user_email:"",user_name:"",message:""})},handleSubmit=async t=>{t.preventDefault(),e.current?n.sendForm("service_6lo1mcj","template_xu5g40h",e.current,"TgOIRuM_0f-3pFshq").then(()=>{m.toast.success("Melding sendt uten problemer!"),resetForm()},e=>{m.toast.error("Failed to send email: "+e.text),console.error("Failed to send email",e.text)}):(console.error("Form reference is null"),m.toast.error("Form reference is not available"))};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("form",{ref:e,onSubmit:handleSubmit,className:"flex flex-col mb-28 mt-28 items-center justify-center w-full max-w-lg mx-auto p-12 bg-gray-800 shadow-xl rounded-lg space-y-4",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold text-white",children:"Vi \xf8nsker \xe5 h\xf8re fra deg"}),(0,a.jsxs)("div",{className:"flex flex-col w-full",children:[(0,a.jsx)("label",{htmlFor:"frm-email",className:"text-gray-300",children:"Email"}),(0,a.jsx)("input",{id:"frm-email",type:"email",name:"user_email",value:t.user_email,className:"p-2 rounded bg-gray-700 text-white border border-gray-600",required:!0,onChange:handleChange})]}),(0,a.jsxs)("div",{className:"flex flex-col w-full",children:[(0,a.jsx)("label",{htmlFor:"frm-first",className:"text-gray-300",children:"Navn"}),(0,a.jsx)("input",{id:"frm-first",type:"text",name:"user_name",value:t.user_name,className:"p-2 rounded bg-gray-700 text-white border border-gray-600",required:!0,onChange:handleChange})]}),(0,a.jsxs)("div",{className:"flex flex-col w-full",children:[(0,a.jsx)("label",{htmlFor:"frm-message",className:"text-gray-300",children:"Melding"}),(0,a.jsx)("textarea",{id:"frm-message",name:"message",value:t.message,className:"p-2 rounded bg-gray-700 text-white border border-gray-600",onChange:handleChange})]}),(0,a.jsx)("button",{type:"submit",className:"px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300",children:"Send"})]}),(0,a.jsxs)("div",{className:"flex justify-center items-center flex-col gap-y-3 mb-8",children:[(0,a.jsxs)("p",{children:[(0,a.jsx)(i.G,{icon:o.FGq,color:"green"})," Strandgaten 74, 5004 Bergen"]}),(0,a.jsxs)("p",{children:[(0,a.jsx)(i.G,{icon:o.FU$,color:"green"})," Mail: fdb@fotballdraktbutikken.no"]}),(0,a.jsxs)("p",{children:[(0,a.jsx)(i.G,{icon:o.j1w,color:"green"})," Telefon: +47 979 39 973"]})]})]})}},622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var a=r(2265),s=Symbol.for("react.element"),i=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,l=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n={key:!0,ref:!0,__self:!0,__source:!0};function q(e,t,r){var a,i={},m=null,d=null;for(a in void 0!==r&&(m=""+r),void 0!==t.key&&(m=""+t.key),void 0!==t.ref&&(d=t.ref),t)o.call(t,a)&&!n.hasOwnProperty(a)&&(i[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===i[a]&&(i[a]=t[a]);return{$$typeof:s,type:e,key:m,ref:d,props:i,_owner:l.current}}t.Fragment=i,t.jsx=q,t.jsxs=q},7437:function(e,t,r){"use strict";e.exports=r(622)}},function(e){e.O(0,[676,424,504,971,472,744],function(){return e(e.s=2152)}),_N_E=e.O()}]);