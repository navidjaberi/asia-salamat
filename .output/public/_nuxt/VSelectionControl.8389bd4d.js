import{bM as I,c1 as B,cP as z,c2 as w,cz as L,bR as O,bT as R,bU as U,ct as _,h as u,aW as W,aR as J,cu as K,bj as n,b_ as $,a as d,cD as Q,bc as G,r as X,cn as Y,aG as D,y as Z,b3 as p,F as ee,f as le,au as ae,cA as te,cl as T,c6 as oe,c4 as ne,cO as ue,aH as re}from"./entry.26e0f55e.js";import{a as ie}from"./VInput.46c0eb00.js";const M=Symbol.for("vuetify:selection-control-group"),j=I({color:String,disabled:{type:Boolean,default:null},defaultsTarget:String,error:Boolean,id:String,inline:Boolean,falseIcon:B,trueIcon:B,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:z},...w(),...L(),...O()},"SelectionControlGroup"),ce=I({...j({defaultsTarget:"VSelectionControl"})},"VSelectionControlGroup"),me=R()({name:"VSelectionControlGroup",props:ce(),emits:{"update:modelValue":e=>!0},setup(e,r){let{slots:v}=r;const l=U(e,"modelValue"),t=_(),m=u(()=>e.id||`v-selection-control-group-${t}`),c=u(()=>e.name||m.value),a=new Set;return W(M,{modelValue:l,forceUpdate:()=>{a.forEach(o=>o())},onForceUpdate:o=>{a.add(o),J(()=>{a.delete(o)})}}),K({[e.defaultsTarget]:{color:n(e,"color"),disabled:n(e,"disabled"),density:n(e,"density"),error:n(e,"error"),inline:n(e,"inline"),modelValue:l,multiple:u(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),name:c,falseIcon:n(e,"falseIcon"),trueIcon:n(e,"trueIcon"),readonly:n(e,"readonly"),ripple:n(e,"ripple"),type:n(e,"type"),valueComparator:n(e,"valueComparator")}}),$(()=>{var o;return d("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline},e.class],style:e.style,role:e.type==="radio"?"radiogroup":void 0},[(o=v.default)==null?void 0:o.call(v)])}),{}}}),se=I({label:String,trueValue:null,falseValue:null,value:null,...w(),...j()},"VSelectionControl");function de(e){const r=ae(M,void 0),{densityClasses:v}=te(e),l=U(e,"modelValue"),t=u(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),m=u(()=>e.falseValue!==void 0?e.falseValue:!1),c=u(()=>!!e.multiple||e.multiple==null&&Array.isArray(l.value)),a=u({get(){const f=r?r.modelValue.value:l.value;return c.value?f.some(i=>e.valueComparator(i,t.value)):e.valueComparator(f,t.value)},set(f){if(e.readonly)return;const i=f?t.value:m.value;let s=i;c.value&&(s=f?[...T(l.value),i]:T(l.value).filter(C=>!e.valueComparator(C,t.value))),r?r.modelValue.value=s:l.value=s}}),{textColorClasses:o,textColorStyles:b}=oe(u(()=>a.value&&!e.error&&!e.disabled?e.color:void 0)),{backgroundColorClasses:V,backgroundColorStyles:S}=ne(u(()=>a.value&&!e.error&&!e.disabled?e.color:void 0)),k=u(()=>a.value?e.trueIcon:e.falseIcon);return{group:r,densityClasses:v,trueValue:t,falseValue:m,model:a,textColorClasses:o,textColorStyles:b,backgroundColorClasses:V,backgroundColorStyles:S,icon:k}}const ye=R()({name:"VSelectionControl",directives:{Ripple:Q},inheritAttrs:!1,props:se(),emits:{"update:modelValue":e=>!0},setup(e,r){let{attrs:v,slots:l}=r;const{group:t,densityClasses:m,icon:c,model:a,textColorClasses:o,textColorStyles:b,backgroundColorClasses:V,backgroundColorStyles:S,trueValue:k}=de(e),f=_(),i=u(()=>e.id||`input-${f}`),s=G(!1),C=G(!1),g=X();t==null||t.onForceUpdate(()=>{g.value&&(g.value.checked=a.value)});function h(y){s.value=!0,ue(y.target,":focus-visible")!==!1&&(C.value=!0)}function A(){s.value=!1,C.value=!1}function E(y){e.readonly&&t&&re(()=>t.forceUpdate()),a.value=y.target.checked}return $(()=>{var P,x;const y=l.label?l.label({label:e.label,props:{for:i.value}}):e.label,[H,N]=Y(v),F=d("input",D({ref:g,checked:a.value,disabled:!!(e.readonly||e.disabled),id:i.value,onBlur:A,onFocus:h,onInput:E,"aria-disabled":!!(e.readonly||e.disabled),type:e.type,value:k.value,name:e.name,"aria-checked":e.type==="checkbox"?a.value:void 0},N),null);return d("div",D({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":s.value,"v-selection-control--focus-visible":C.value,"v-selection-control--inline":e.inline},m.value,e.class]},H,{style:e.style}),[d("div",{class:["v-selection-control__wrapper",o.value],style:b.value},[(P=l.default)==null?void 0:P.call(l,{backgroundColorClasses:V,backgroundColorStyles:S}),Z(d("div",{class:["v-selection-control__input"]},[((x=l.input)==null?void 0:x.call(l,{model:a,textColorClasses:o,textColorStyles:b,backgroundColorClasses:V,backgroundColorStyles:S,inputNode:F,icon:c.value,props:{onFocus:h,onBlur:A,id:i.value}}))??d(ee,null,[c.value&&d(le,{key:"icon",icon:c.value},null),F])]),[[p("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),y&&d(ie,{for:i.value,clickable:!0,onClick:q=>q.stopPropagation()},{default:()=>[y]})])}),{isFocused:s,input:g}}});export{ye as V,j as a,me as b,se as m};