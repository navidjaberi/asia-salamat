import{m as k,V as p,a as C,b as h}from"./VSelectionControl.8389bd4d.js";import{bM as V,bT as f,b_ as b,a,aG as n,bS as A,c1 as c,ct as O,h as U,bU as F,cn as _,F as x}from"./entry.26e0f55e.js";import{m as M,V as m,a as N}from"./VInput.46c0eb00.js";const T=V({...k({falseIcon:"$radioOff",trueIcon:"$radioOn"})},"VRadio"),B=f()({name:"VRadio",props:T(),setup(e,l){let{slots:s}=l;return b(()=>a(p,n(e,{class:["v-radio",e.class],style:e.style,type:"radio"}),s)),{}}});const D=V({height:{type:[Number,String],default:"auto"},...M(),...A(C(),["multiple"]),trueIcon:{type:c,default:"$radioOn"},falseIcon:{type:c,default:"$radioOff"},type:{type:String,default:"radio"}},"VRadioGroup"),E=f()({name:"VRadioGroup",inheritAttrs:!1,props:D(),emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:s,slots:o}=l;const y=O(),i=U(()=>e.id||`radio-group-${y}`),t=F(e,"modelValue");return b(()=>{const[v,I]=_(s),[R,L]=m.filterProps(e),[g,j]=p.filterProps(e),r=o.label?o.label({label:e.label,props:{for:i.value}}):e.label;return a(m,n({class:["v-radio-group",e.class],style:e.style},v,R,{modelValue:t.value,"onUpdate:modelValue":u=>t.value=u,id:i.value}),{...o,default:u=>{let{id:d,messagesId:P,isDisabled:G,isReadonly:S}=u;return a(x,null,[r&&a(N,{id:d.value},{default:()=>[r]}),a(h,n(g,{id:d.value,"aria-describedby":P.value,defaultsTarget:"VRadio",trueIcon:e.trueIcon,falseIcon:e.falseIcon,type:e.type,disabled:G.value,readonly:S.value,"aria-labelledby":r?d.value:void 0,multiple:!1},I,{modelValue:t.value,"onUpdate:modelValue":$=>t.value=$}),o)])}})}),{}}});export{E as V,B as a};