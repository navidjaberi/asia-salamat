import{bM as h,bU as g,h as V,bc as F,r as b,j as M,aW as R,bj as P,au as k,c2 as w,bT as B,b_ as S,a as j}from"./entry.26e0f55e.js";import{f as D}from"./forwardRefs.e2994a01.js";const y=Symbol.for("vuetify:form"),E=h({disabled:Boolean,fastFail:Boolean,readonly:Boolean,modelValue:{type:Boolean,default:null},validateOn:{type:String,default:"input"}},"form");function O(l){const f=g(l,"modelValue"),d=V(()=>l.disabled),c=V(()=>l.readonly),o=F(!1),a=b([]),u=b([]);async function m(){const e=[];let s=!0;u.value=[],o.value=!0;for(const r of a.value){const t=await r.validate();if(t.length>0&&(s=!1,e.push({id:r.id,errorMessages:t})),!s&&l.fastFail)break}return u.value=e,o.value=!1,{valid:s,errors:u.value}}function i(){a.value.forEach(e=>e.reset())}function n(){a.value.forEach(e=>e.resetValidation())}return M(a,()=>{let e=0,s=0;const r=[];for(const t of a.value)t.isValid===!1?(s++,r.push({id:t.id,errorMessages:t.errorMessages})):t.isValid===!0&&e++;u.value=r,f.value=s>0?!1:e===a.value.length?!0:null},{deep:!0}),R(y,{register:e=>{let{id:s,validate:r,reset:t,resetValidation:v}=e;a.value.some(p=>p.id===s),a.value.push({id:s,validate:r,reset:t,resetValidation:v,isValid:null,errorMessages:[]})},unregister:e=>{a.value=a.value.filter(s=>s.id!==e)},update:(e,s,r)=>{const t=a.value.find(v=>v.id===e);t&&(t.isValid=s,t.errorMessages=r)},isDisabled:d,isReadonly:c,isValidating:o,isValid:f,items:a,validateOn:P(l,"validateOn")}),{errors:u,isDisabled:d,isReadonly:c,isValidating:o,isValid:f,items:a,validate:m,reset:i,resetValidation:n}}function N(){return k(y,null)}const x=h({...w(),...E()},"VForm"),T=B()({name:"VForm",props:x(),emits:{"update:modelValue":l=>!0,submit:l=>!0},setup(l,f){let{slots:d,emit:c}=f;const o=O(l),a=b();function u(i){i.preventDefault(),o.reset()}function m(i){const n=i,e=o.validate();n.then=e.then.bind(e),n.catch=e.catch.bind(e),n.finally=e.finally.bind(e),c("submit",n),n.defaultPrevented||e.then(s=>{var t;let{valid:r}=s;r&&((t=a.value)==null||t.submit())}),n.preventDefault()}return S(()=>{var i;return j("form",{ref:a,class:["v-form",l.class],style:l.style,novalidate:!0,onReset:u,onSubmit:m},[(i=d.default)==null?void 0:i.call(d,o)])}),D(o,a)}});export{T as V,N as u};