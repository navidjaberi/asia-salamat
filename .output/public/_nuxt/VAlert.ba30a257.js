import{c as I}from"./createSimpleFunctional.17b0ee17.js";import{bM as z,c1 as D,c2 as L,cz as R,ca as F,cb as O,bN as j,bO as w,bP as E,c3 as M,bR as N,bQ as G,bT as Q,bU as U,h as o,bX as W,bY as X,cA as Y,cd as Z,ce as p,bV as q,bW as H,bZ as J,c6 as K,bj as ee,c5 as ae,a as t,b$ as te,f as le,c0 as d,l as ne,aG as se}from"./entry.26e0f55e.js";const oe=I("v-alert-title"),ce=["success","info","warning","error"],re=z({border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:D,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>ce.includes(e)},...L(),...R(),...F(),...O(),...j(),...w(),...E(),...M(),...N(),...G({variant:"flat"})},"VAlert"),de=Q()({name:"VAlert",props:re(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,v){let{emit:m,slots:a}=v;const c=U(e,"modelValue"),n=o(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon}),b=o(()=>({color:e.color??e.type,variant:e.variant})),{themeClasses:y}=W(e),{colorClasses:f,colorStyles:k,variantClasses:P}=X(b),{densityClasses:V}=Y(e),{dimensionStyles:C}=Z(e),{elevationClasses:g}=p(e),{locationStyles:x}=q(e),{positionClasses:S}=H(e),{roundedClasses:_}=J(e),{textColorClasses:A,textColorStyles:T}=K(ee(e,"borderColor")),{t:h}=ae(),r=o(()=>({"aria-label":h(e.closeLabel),onClick(s){c.value=!1,m("click:close",s)}}));return()=>{const s=!!(a.prepend||n.value),B=!!(a.title||e.title),$=!!(a.close||e.closable);return c.value&&t(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},y.value,f.value,V.value,g.value,S.value,_.value,P.value,e.class],style:[k.value,C.value,x.value,e.style],role:"alert"},{default:()=>{var i,u;return[te(!1,"v-alert"),e.border&&t("div",{key:"border",class:["v-alert__border",A.value],style:T.value},null),s&&t("div",{key:"prepend",class:"v-alert__prepend"},[a.prepend?t(d,{key:"prepend-defaults",disabled:!n.value,defaults:{VIcon:{density:e.density,icon:n.value,size:e.prominent?44:28}}},a.prepend):t(le,{key:"prepend-icon",density:e.density,icon:n.value,size:e.prominent?44:28},null)]),t("div",{class:"v-alert__content"},[B&&t(oe,{key:"title"},{default:()=>{var l;return[((l=a.title)==null?void 0:l.call(a))??e.title]}}),((i=a.text)==null?void 0:i.call(a))??e.text,(u=a.default)==null?void 0:u.call(a)]),a.append&&t("div",{key:"append",class:"v-alert__append"},[a.append()]),$&&t("div",{key:"close",class:"v-alert__close"},[a.close?t(d,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var l;return[(l=a.close)==null?void 0:l.call(a,{props:r.value})]}}):t(ne,se({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},r.value),null)])]}})}}});export{de as V};
