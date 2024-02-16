import{bM as D,cP as Y,c2 as R,cQ as Z,c3 as z,bR as L,bQ as E,bT as F,bX as T,ch as J,cu as W,bj as r,b_ as ee,a as l,c1 as y,cR as B,c9 as ae,cz as le,cb as te,ci as ne,bP as se,cC as ce,cH as ie,cD as de,c5 as oe,cc as ue,bY as re,cA as ve,ce as fe,bZ as pe,cI as me,bU as ke,cj as be,cF as he,h as C,y as G,b3 as ye,b$ as Ce,f as v,c0 as f,bz as Ve,F as _,aG as Ie}from"./entry.26e0f55e.js";import{a as ge}from"./index.4548580c.js";import{V as x}from"./VAvatar.c6243a7c.js";const $=Symbol.for("vuetify:v-chip-group"),Pe=D({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Y},...R(),...Z({selectedClass:"v-chip--selected"}),...z(),...L(),...E({variant:"tonal"})},"VChipGroup"),_e=F()({name:"VChipGroup",props:Pe(),emits:{"update:modelValue":e=>!0},setup(e,p){let{slots:i}=p;const{themeClasses:o}=T(e),{isSelected:t,select:m,next:k,prev:b,selected:h}=J(e,$);return W({VChip:{color:r(e,"color"),disabled:r(e,"disabled"),filter:r(e,"filter"),variant:r(e,"variant")}}),ee(()=>l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>{var u;return[(u=i.default)==null?void 0:u.call(i,{isSelected:t,select:m,next:k,prev:b,selected:h.value})]}})),{}}}),Ae=D({activeClass:String,appendAvatar:String,appendIcon:y,closable:Boolean,closeIcon:{type:y,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:y,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:B(),onClickOnce:B(),...ae(),...R(),...le(),...te(),...ne(),...se(),...ce(),...ie(),...z({tag:"span"}),...L(),...E({variant:"tonal"})},"VChip"),xe=F()({name:"VChip",directives:{Ripple:de},props:Ae(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,p){let{attrs:i,emit:o,slots:t}=p;const{t:m}=oe(),{borderClasses:k}=ue(e),{colorClasses:b,colorStyles:h,variantClasses:u}=re(e),{densityClasses:w}=ve(e),{elevationClasses:M}=fe(e),{roundedClasses:j}=pe(e),{sizeClasses:O}=me(e),{themeClasses:K}=T(e),V=ke(e,"modelValue"),a=be(e,$,!1),s=he(e,i),Q=C(()=>e.link!==!1&&s.isLink.value),c=C(()=>!e.disabled&&e.link!==!1&&(!!a||e.link||s.isClickable.value)),X=C(()=>({"aria-label":m(e.closeLabel),onClick(n){n.stopPropagation(),V.value=!1,o("click:close",n)}}));function I(n){var d;o("click",n),c.value&&((d=s.navigate)==null||d.call(s,n),a==null||a.toggle())}function q(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),I(n))}return()=>{const n=s.isLink.value?"a":e.tag,d=!!(e.appendIcon||e.appendAvatar),H=!!(d||t.append),N=!!(t.close||e.closable),g=!!(t.filter||e.filter)&&a,P=!!(e.prependIcon||e.prependAvatar),U=!!(P||t.prepend),A=!a||a.isSelected.value;return V.value&&G(l(n,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":c.value,"v-chip--filter":g,"v-chip--pill":e.pill},K.value,k.value,A?b.value:void 0,w.value,M.value,j.value,O.value,u.value,a==null?void 0:a.selectedClass.value,e.class],style:[A?h.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:s.href.value,tabindex:c.value?0:void 0,onClick:I,onKeydown:c.value&&!Q.value&&q},{default:()=>{var S;return[Ce(c.value,"v-chip"),g&&l(ge,{key:"filter"},{default:()=>[G(l("div",{class:"v-chip__filter"},[t.filter?l(f,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},t.filter):l(v,{key:"filter-icon",icon:e.filterIcon},null)]),[[Ve,a.isSelected.value]])]}),U&&l("div",{key:"prepend",class:"v-chip__prepend"},[t.prepend?l(f,{key:"prepend-defaults",disabled:!P,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},t.prepend):l(_,null,[e.prependIcon&&l(v,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&l(x,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),l("div",{class:"v-chip__content"},[((S=t.default)==null?void 0:S.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))??e.text]),H&&l("div",{key:"append",class:"v-chip__append"},[t.append?l(f,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},t.append):l(_,null,[e.appendIcon&&l(v,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&l(x,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),N&&l("div",Ie({key:"close",class:"v-chip__close"},X.value),[t.close?l(f,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},t.close):l(v,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[ye("ripple"),c.value&&e.ripple,null]])}}});export{xe as V,_e as a};