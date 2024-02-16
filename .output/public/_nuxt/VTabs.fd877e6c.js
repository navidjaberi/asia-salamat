import{bM as D,bS as re,cp as ce,bT as L,c6 as ve,h as y,bc as k,r as W,b_ as U,l as K,a as f,aG as q,c1 as Q,c2 as de,c3 as se,cQ as fe,cg as be,bL as me,ch as ge,cq as J,cM as he,j as Se,f as Z,cS as ye,cv as xe,cz as pe,bU as Te,cA as ze,c4 as Ce,bj as C,cu as ke,ck as Ve,dh as we}from"./entry.26e0f55e.js";import{a as Pe,s as Re}from"./easing.9f15041e.js";import{c as ee}from"./index.4548580c.js";const ne=Symbol.for("vuetify:v-tabs"),Me=D({fixed:Boolean,sliderColor:String,hideSlider:Boolean,direction:{type:String,default:"horizontal"},...re(ce({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),_e=L()({name:"VTab",props:Me(),setup(e,r){let{slots:n,attrs:c}=r;const{textColorClasses:g,textColorStyles:a}=ve(e,"sliderColor"),o=y(()=>e.direction==="horizontal"),t=k(!1),u=W(),i=W();function v(S){var d,V;let{value:b}=S;if(t.value=b,b){const w=(V=(d=u.value)==null?void 0:d.$el.parentElement)==null?void 0:V.querySelector(".v-tab--selected .v-tab__slider"),B=i.value;if(!w||!B)return;const P=getComputedStyle(w).color,x=w.getBoundingClientRect(),p=B.getBoundingClientRect(),R=o.value?"x":"y",M=o.value?"X":"Y",A=o.value?"right":"bottom",T=o.value?"width":"height",_=x[R],I=p[R],z=_>I?x[A]-p[A]:x[R]-p[R],F=Math.sign(z)>0?o.value?"right":"bottom":Math.sign(z)<0?o.value?"left":"top":"center",m=(Math.abs(z)+(Math.sign(z)<0?x[T]:p[T]))/Math.max(x[T],p[T])||0,O=x[T]/p[T]||0,E=1.5;Pe(B,{backgroundColor:[P,"currentcolor"],transform:[`translate${M}(${z}px) scale${M}(${O})`,`translate${M}(${z/E}px) scale${M}(${(m-1)/E+1})`,"none"],transformOrigin:Array(3).fill(F)},{duration:225,easing:Re})}}return U(()=>{const[S]=K.filterProps(e);return f(K,q({symbol:ne,ref:u,class:["v-tab",e.class],style:e.style,tabindex:t.value?0:-1,role:"tab","aria-selected":String(t.value),active:!1},S,c,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":v}),{default:()=>{var b;return[((b=n.default)==null?void 0:b.call(n))??e.text,!e.hideSlider&&f("div",{ref:i,class:["v-tab__slider",g.value],style:a.value},null)]}})}),{}}});function te(e){const n=Math.abs(e);return Math.sign(e)*(n/((1/.501-2)*(1-n)+1))}function le(e){let{selectedElement:r,containerSize:n,contentSize:c,isRtl:g,currentScrollOffset:a,isHorizontal:o}=e;const t=o?r.clientWidth:r.clientHeight,u=o?r.offsetLeft:r.offsetTop,i=g&&o?c-u-t:u,v=n+a,S=t+i,b=t*.4;return i<=a?a=Math.max(i-b,0):v<=S&&(a=Math.min(a-(v-S-b),c-n)),a}function $e(e){let{selectedElement:r,containerSize:n,contentSize:c,isRtl:g,isHorizontal:a}=e;const o=a?r.clientWidth:r.clientHeight,t=a?r.offsetLeft:r.offsetTop,u=g&&a?c-t-o/2-n/2:t+o/2-n/2;return Math.min(c-n,Math.max(0,u))}const Be=Symbol.for("vuetify:v-slide-group"),oe=D({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Be},nextIcon:{type:Q,default:"$next"},prevIcon:{type:Q,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...de(),...se(),...fe({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),ae=L()({name:"VSlideGroup",props:oe(),emits:{"update:modelValue":e=>!0},setup(e,r){let{slots:n}=r;const{isRtl:c}=be(),{mobile:g}=me(),a=ge(e,e.symbol),o=k(!1),t=k(0),u=k(0),i=k(0),v=y(()=>e.direction==="horizontal"),{resizeRef:S,contentRect:b}=J(),{resizeRef:d,contentRect:V}=J(),w=y(()=>a.selected.value.length?a.items.value.findIndex(l=>l.id===a.selected.value[0]):-1),B=y(()=>a.selected.value.length?a.items.value.findIndex(l=>l.id===a.selected.value[a.selected.value.length-1]):-1);if(he){let l=-1;Se(()=>[a.selected.value,b.value,V.value,v.value],()=>{cancelAnimationFrame(l),l=requestAnimationFrame(()=>{if(b.value&&V.value){const s=v.value?"width":"height";u.value=b.value[s],i.value=V.value[s],o.value=u.value+1<i.value}if(w.value>=0&&d.value){const s=d.value.children[B.value];w.value===0||!o.value?t.value=0:e.centerActive?t.value=$e({selectedElement:s,containerSize:u.value,contentSize:i.value,isRtl:c.value,isHorizontal:v.value}):o.value&&(t.value=le({selectedElement:s,containerSize:u.value,contentSize:i.value,isRtl:c.value,currentScrollOffset:t.value,isHorizontal:v.value}))}})})}const P=k(!1);let x=0,p=0;function R(l){const s=v.value?"clientX":"clientY";p=(c.value&&v.value?-1:1)*t.value,x=l.touches[0][s],P.value=!0}function M(l){if(!o.value)return;const s=v.value?"clientX":"clientY",h=c.value&&v.value?-1:1;t.value=h*(p+x-l.touches[0][s])}function A(l){const s=i.value-u.value;t.value<0||!o.value?t.value=0:t.value>=s&&(t.value=s),P.value=!1}function T(){S.value&&(S.value[v.value?"scrollLeft":"scrollTop"]=0)}const _=k(!1);function I(l){if(_.value=!0,!(!o.value||!d.value)){for(const s of l.composedPath())for(const h of d.value.children)if(h===s){t.value=le({selectedElement:h,containerSize:u.value,contentSize:i.value,isRtl:c.value,currentScrollOffset:t.value,isHorizontal:v.value});return}}}function z(l){_.value=!1}function F(l){var s;!_.value&&!(l.relatedTarget&&((s=d.value)!=null&&s.contains(l.relatedTarget)))&&m()}function X(l){d.value&&(v.value?l.key==="ArrowRight"?m(c.value?"prev":"next"):l.key==="ArrowLeft"&&m(c.value?"next":"prev"):l.key==="ArrowDown"?m("next"):l.key==="ArrowUp"&&m("prev"),l.key==="Home"?m("first"):l.key==="End"&&m("last"))}function m(l){var s,h,Y,j,N;if(d.value)if(!l)(s=ye(d.value)[0])==null||s.focus();else if(l==="next"){const $=(h=d.value.querySelector(":focus"))==null?void 0:h.nextElementSibling;$?$.focus():m("first")}else if(l==="prev"){const $=(Y=d.value.querySelector(":focus"))==null?void 0:Y.previousElementSibling;$?$.focus():m("last")}else l==="first"?(j=d.value.firstElementChild)==null||j.focus():l==="last"&&((N=d.value.lastElementChild)==null||N.focus())}function O(l){const s=t.value+(l==="prev"?-1:1)*u.value;t.value=xe(s,0,i.value-u.value)}const E=y(()=>{let l=t.value>i.value-u.value?-(i.value-u.value)+te(i.value-u.value-t.value):-t.value;t.value<=0&&(l=te(-t.value));const s=c.value&&v.value?-1:1;return{transform:`translate${v.value?"X":"Y"}(${s*l}px)`,transition:P.value?"none":"",willChange:P.value?"transform":""}}),G=y(()=>({next:a.next,prev:a.prev,select:a.select,isSelected:a.isSelected})),H=y(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!g.value;case!0:return o.value||Math.abs(t.value)>0;case"mobile":return g.value||o.value||Math.abs(t.value)>0;default:return!g.value&&(o.value||Math.abs(t.value)>0)}}),ie=y(()=>Math.abs(t.value)>0),ue=y(()=>i.value>Math.abs(t.value)+u.value);return U(()=>f(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!v.value,"v-slide-group--has-affixes":H.value,"v-slide-group--is-overflowing":o.value},e.class],style:e.style,tabindex:_.value||a.selected.value.length?-1:0,onFocus:F},{default:()=>{var l,s,h;return[H.value&&f("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!ie.value}],onClick:()=>O("prev")},[((l=n.prev)==null?void 0:l.call(n,G.value))??f(ee,null,{default:()=>[f(Z,{icon:c.value?e.nextIcon:e.prevIcon},null)]})]),f("div",{key:"container",ref:S,class:"v-slide-group__container",onScroll:T},[f("div",{ref:d,class:"v-slide-group__content",style:E.value,onTouchstartPassive:R,onTouchmovePassive:M,onTouchendPassive:A,onFocusin:I,onFocusout:z,onKeydown:X},[(s=n.default)==null?void 0:s.call(n,G.value)])]),H.value&&f("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!ue.value}],onClick:()=>O("next")},[((h=n.next)==null?void 0:h.call(n,G.value))??f(ee,null,{default:()=>[f(Z,{icon:c.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:a.selected,scrollTo:O,scrollOffset:t,focus:m}}});function Oe(e){return e?e.map(r=>we(r)?r:{text:r,value:r}):[]}const Ae=D({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,sliderColor:String,...oe({mandatory:"force"}),...pe(),...se()},"VTabs"),Ge=L()({name:"VTabs",props:Ae(),emits:{"update:modelValue":e=>!0},setup(e,r){let{slots:n}=r;const c=Te(e,"modelValue"),g=y(()=>Oe(e.items)),{densityClasses:a}=ze(e),{backgroundColorClasses:o,backgroundColorStyles:t}=Ce(C(e,"bgColor"));return ke({VTab:{color:C(e,"color"),direction:C(e,"direction"),stacked:C(e,"stacked"),fixed:C(e,"fixedTabs"),sliderColor:C(e,"sliderColor"),hideSlider:C(e,"hideSlider")}}),U(()=>{const[u]=ae.filterProps(e);return f(ae,q(u,{modelValue:c.value,"onUpdate:modelValue":i=>c.value=i,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--stacked":e.stacked},a.value,o.value,e.class],style:[{"--v-tabs-height":Ve(e.height)},t.value,e.style],role:"tablist",symbol:ne}),{default:()=>[n.default?n.default():g.value.map(i=>f(_e,q(i,{key:i.text}),null))]})}),{}}});export{Ge as V,_e as a};