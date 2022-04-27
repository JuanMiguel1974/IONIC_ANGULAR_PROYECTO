"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7602],{7602:(C,u,r)=>{r.r(u),r.d(u,{ion_picker_column_internal:()=>v});var k=r(5861),o=r(2361),b=r(8686),c=r(206),p=r(2335),I=r(7300);const v=class{constructor(s){(0,o.r)(this,s),this.ionChange=(0,o.e)(this,"ionChange",7),this.hapticsStarted=!1,this.isColumnVisible=!1,this.isActive=!1,this.items=[],this.color="primary",this.numericInput=!1,this.centerPickerItemInView=(e,t=!0)=>{const{el:i,isColumnVisible:l}=this;if(l){const n=e.offsetTop-3*e.clientHeight+e.clientHeight/2;i.scrollTop!==n&&i.scroll({top:n,left:0,behavior:t?"smooth":void 0})}},this.inputModeChange=e=>{if(!this.numericInput)return;const{useInputMode:t,inputModeColumn:i}=e.detail;this.isActive=!(!t||void 0!==i&&i!==this.el)},this.initializeScrollListener=()=>{const{el:e}=this;let t,i=this.activeItem;const l=()=>{(0,c.r)(()=>{t&&(clearTimeout(t),t=void 0),this.hapticsStarted||((0,p.a)(),this.hapticsStarted=!0);const n=e.getBoundingClientRect(),d=e.shadowRoot.elementFromPoint(n.x+n.width/2,n.y+n.height/2);null!==i&&i.classList.remove(a),d!==i&&(0,p.b)(),i=d,d.classList.add(a),t=setTimeout(()=>{const g=d.getAttribute("data-index");if(null===g)return;const x=parseInt(g,10),f=this.items[x];f.value!==this.value&&(this.setValue(f.value),(0,p.h)(),this.hapticsStarted=!1)},250)})};(0,c.r)(()=>{e.addEventListener("scroll",l),this.destroyScrollListener=()=>{e.removeEventListener("scroll",l)}})}}valueChange(){this.isColumnVisible&&this.scrollActiveItemIntoView()}componentWillLoad(){new IntersectionObserver(t=>{var i;if(t[0].isIntersecting){this.isColumnVisible=!0;const n=(0,c.g)(this.el).querySelector(`.${a}`);null==n||n.classList.remove(a),this.scrollActiveItemIntoView(),null===(i=this.activeItem)||void 0===i||i.classList.add(a),this.initializeScrollListener()}else this.isColumnVisible=!1,this.destroyScrollListener&&(this.destroyScrollListener(),this.destroyScrollListener=void 0)},{threshold:.01}).observe(this.el);const e=this.el.closest("ion-picker-internal");null!==e&&e.addEventListener("ionInputModeChange",t=>this.inputModeChange(t))}componentDidRender(){var s;const{activeItem:e,items:t,isColumnVisible:i,value:l}=this;i&&(e?this.scrollActiveItemIntoView():(null===(s=t[0])||void 0===s?void 0:s.value)!==l&&this.setValue(t[0].value))}scrollActiveItemIntoView(){var s=this;return(0,k.Z)(function*(){const e=s.activeItem;e&&s.centerPickerItemInView(e,!1)})()}setValue(s){const{items:e}=this;this.value=s;const t=e.find(i=>i.value===s);t&&this.ionChange.emit(t)}get activeItem(){return(0,c.g)(this.el).querySelector(`.picker-item[data-value="${this.value}"]`)}render(){const{items:s,color:e,isActive:t,numericInput:i}=this,l=(0,b.b)(this);return(0,o.h)(o.H,{tabindex:0,class:(0,I.c)(e,{[l]:!0,"picker-column-active":t,"picker-column-numeric-input":i})},(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),s.map((n,h)=>(0,o.h)("div",{class:"picker-item","data-value":n.value,"data-index":h,onClick:m=>{this.centerPickerItemInView(m.target)}},n.text)),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"),(0,o.h)("div",{class:"picker-item picker-item-empty"},"\xa0"))}get el(){return(0,o.i)(this)}static get watchers(){return{value:["valueChange"]}}},a="picker-item-active";v.style={ios:":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{height:34px;line-height:34px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty{scroll-snap-align:none}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}",md:":host{padding-left:16px;padding-right:16px;padding-top:0px;padding-bottom:0px;height:200px;outline:none;font-size:22px;-webkit-scroll-snap-type:y mandatory;-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory;overflow-x:hidden;overflow-y:scroll;scrollbar-width:none;text-align:center}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}:host::-webkit-scrollbar{display:none}:host .picker-item{height:34px;line-height:34px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;scroll-snap-align:center}:host .picker-item-empty{scroll-snap-align:none}:host(.picker-column-active) .picker-item.picker-item-active{color:var(--ion-color-base)}@media (any-hover: hover){:host(:focus){outline:none;background:rgba(var(--ion-color-base-rgb), 0.2)}}:host .picker-item-active{color:var(--ion-color-base)}"}}}]);