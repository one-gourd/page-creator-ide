window.PI=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=14)}([function(e,t,n){"use strict";var r=n(4),o=function(e,t,n,r){var o,i=arguments.length,c=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(c=(i<3?o(c):i>3?o(t,n,c):o(t,n))||c);return i>3&&c&&Object.defineProperty(t,n,c),c};class i{constructor(){this.store={},this.setProps=((e,t)=>{this.store[e]=t}),this.clear=(()=>{this.store=Object(r.observable)({}),window.$store=this.store})}}o([r.observable],i.prototype,"store",void 0),o([r.action],i.prototype,"setProps",void 0),o([r.action],i.prototype,"clear",void 0);const c=new i;window.$store=c.store,t.a=c},function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"c",function(){return o}),n.d(t,"d",function(){return i}),n.d(t,"b",function(){return c}),n.d(t,"e",function(){return s});const r=e=>e&&c(e)&&e.propTypes,o=e=>s(e)&&e[0].toLowerCase()===e[0],i=e=>s(e)&&/^[A-Z]+$/.test(e[0]),c=e=>"function"==typeof e,s=e=>"string"==typeof e},function(e,t,n){"use strict";n.d(t,"a",function(){return o});var r=n(1);n.d(t,"b",function(){return r.b}),n.d(t,"c",function(){return r.c}),n.d(t,"d",function(){return r.e});n(5);const o=(...e)=>{const t=(...t)=>{e.filter(Boolean).forEach(e=>{e.apply(null,t)})};return t.isCombo=!0,t}},function(e,t,n){"use strict";const r={Components:{}};window.GOURD=r,t.a=r},function(e,t){e.exports=window.mobx},function(e,t,n){"use strict";n.d(t,"a",function(){return o});const r=window.require;function o(e){return new Promise(t=>r([e],e=>t(e)))}r.config({map:{"*":{react:"//npmcdn.alibaba-inc.com/react/umd/react.production.min.js","react-dom":"//npmcdn.alibaba-inc.com/react-dom/umd/react-dom.production.min.js",moment:"//npmcdn.alibaba-inc.com/moment"}}})},function(e,t){e.exports=window.React},function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return getRealComponent}),__webpack_require__.d(__webpack_exports__,"b",function(){return getRealProps});var mustache__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(11),mustache__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(mustache__WEBPACK_IMPORTED_MODULE_0__),_store_gourd__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3),_util__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),_store__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(0);const getRealComponent=e=>{const t=_store_gourd__WEBPACK_IMPORTED_MODULE_1__.a.Components[e]||_store_gourd__WEBPACK_IMPORTED_MODULE_1__.a.Components["Next."+e]||_store_gourd__WEBPACK_IMPORTED_MODULE_1__.a.Components["Gourd."+e];return t||(Object(_util__WEBPACK_IMPORTED_MODULE_2__.c)(e)?e:"div")},getRealProps=(schema,$scope)=>{const{id:id}=schema,realProps=Object.assign({},_store__WEBPACK_IMPORTED_MODULE_3__.a.store[id]);return Object.keys(realProps).forEach(prop=>{let value=realProps[prop];if(Object(_util__WEBPACK_IMPORTED_MODULE_2__.d)(value)){let realValue;try{const arr=mustache__WEBPACK_IMPORTED_MODULE_0___default.a.parse(String(value)).map(([type,val])=>"text"===type?val:"name"===type?eval(val):void 0);realValue=1===arr.length?arr[0]:arr.join(""),realProps[prop]=realValue,"function"==typeof realValue&&(_store__WEBPACK_IMPORTED_MODULE_3__.a.store[id][prop]=realValue)}catch(e){realProps[prop]=void 0}}}),realProps}},function(e,t){e.exports=window.ReactDOM},function(e,t){e.exports=window.mobxReact},function(e,t,n){"use strict";const r=n(12),o=n(13);function i(e,t){return t.encode?t.strict?r(e):encodeURIComponent(e):e}function c(e,t){return t.decode?o(e):e}function s(e){const t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function a(e,t){const n=function(e){let t;switch(e.arrayFormat){case"index":return(e,n,r)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===r[e]&&(r[e]={}),r[e][t[1]]=n):r[e]=n};case"bracket":return(e,n,r)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==r[e]?r[e]=[].concat(r[e],n):r[e]=[n]:r[e]=n};case"comma":return(e,t,n)=>{const r="string"==typeof t&&t.split("").indexOf(",")>-1?t.split(","):t;n[e]=r};default:return(e,t,n)=>{void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}(t=Object.assign({decode:!0,arrayFormat:"none"},t)),r=Object.create(null);if("string"!=typeof e)return r;if(!(e=e.trim().replace(/^[?#&]/,"")))return r;for(const o of e.split("&")){let[e,i]=o.replace(/\+/g," ").split("=");i=void 0===i?null:c(i,t),n(c(e,t),i,r)}return Object.keys(r).sort().reduce((e,t)=>{const n=r[t];return Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(n):e[t]=n,e},Object.create(null))}t.extract=s,t.parse=a,t.stringify=((e,t)=>{if(!e)return"";const n=function(e){switch(e.arrayFormat){case"index":return t=>(n,r)=>{const o=n.length;return void 0===r?n:null===r?[...n,[i(t,e),"[",o,"]"].join("")]:[...n,[i(t,e),"[",i(o,e),"]=",i(r,e)].join("")]};case"bracket":return t=>(n,r)=>void 0===r?n:null===r?[...n,[i(t,e),"[]"].join("")]:[...n,[i(t,e),"[]=",i(r,e)].join("")];case"comma":return t=>(n,r,o)=>r?0===o?[[i(t,e),"=",i(r,e)].join("")]:[[n,i(r,e)].join(",")]:n;default:return t=>(n,r)=>void 0===r?n:null===r?[...n,i(t,e)]:[...n,[i(t,e),"=",i(r,e)].join("")]}}(t=Object.assign({encode:!0,strict:!0,arrayFormat:"none"},t)),r=Object.keys(e);return!1!==t.sort&&r.sort(t.sort),r.map(r=>{const o=e[r];return void 0===o?"":null===o?i(r,t):Array.isArray(o)?o.reduce(n(r),[]).join("&"):i(r,t)+"="+i(o,t)}).filter(e=>e.length>0).join("&")}),t.parseUrl=((e,t)=>{const n=e.indexOf("#");return-1!==n&&(e=e.slice(0,n)),{url:e.split("?")[0]||"",query:a(s(e),t)}})},function(e,t,n){var r,o,i,c;
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */
c=function(e){var t=Object.prototype.toString,n=Array.isArray||function(e){return"[object Array]"===t.call(e)};function r(e){return"function"==typeof e}function o(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function i(e,t){return null!=e&&"object"==typeof e&&t in e}var c=RegExp.prototype.test,s=/\S/;function a(e){return!function(e,t){return c.call(e,t)}(s,e)}var u={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},p=/\s*/,l=/\s+/,f=/\s*=/,d=/\s*\}/,h=/#|\^|\/|>|\{|&|=|!/;function _(e){this.string=e,this.tail=e,this.pos=0}function b(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function m(){this.cache={}}_.prototype.eos=function(){return""===this.tail},_.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},_.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},b.prototype.push=function(e){return new b(e,this)},b.prototype.lookup=function(e){var t,n,o,c=this.cache;if(c.hasOwnProperty(e))t=c[e];else{for(var s,a,u,p=this,l=!1;p;){if(e.indexOf(".")>0)for(s=p.view,a=e.split("."),u=0;null!=s&&u<a.length;)u===a.length-1&&(l=i(s,a[u])||(n=s,o=a[u],null!=n&&"object"!=typeof n&&n.hasOwnProperty&&n.hasOwnProperty(o))),s=s[a[u++]];else s=p.view[e],l=i(p.view,e);if(l){t=s;break}p=p.parent}c[e]=t}return r(t)&&(t=t.call(this.view)),t},m.prototype.clearCache=function(){this.cache={}},m.prototype.parse=function(t,r){var i=this.cache,c=t+":"+(r||e.tags).join(":"),s=i[c];return null==s&&(s=i[c]=function(t,r){if(!t)return[];var i,c,s,u=[],b=[],m=[],y=!1,g=!1;function v(){if(y&&!g)for(;m.length;)delete b[m.pop()];else m=[];y=!1,g=!1}function O(e){if("string"==typeof e&&(e=e.split(l,2)),!n(e)||2!==e.length)throw new Error("Invalid tags: "+e);i=new RegExp(o(e[0])+"\\s*"),c=new RegExp("\\s*"+o(e[1])),s=new RegExp("\\s*"+o("}"+e[1]))}O(r||e.tags);for(var w,j,E,P,x,C,R=new _(t);!R.eos();){if(w=R.pos,E=R.scanUntil(i))for(var k=0,U=E.length;k<U;++k)a(P=E.charAt(k))?m.push(b.length):g=!0,b.push(["text",P,w,w+1]),w+=1,"\n"===P&&v();if(!R.scan(i))break;if(y=!0,j=R.scan(h)||"name",R.scan(p),"="===j?(E=R.scanUntil(f),R.scan(f),R.scanUntil(c)):"{"===j?(E=R.scanUntil(s),R.scan(d),R.scanUntil(c),j="&"):E=R.scanUntil(c),!R.scan(c))throw new Error("Unclosed tag at "+R.pos);if(x=[j,E,w,R.pos],b.push(x),"#"===j||"^"===j)u.push(x);else if("/"===j){if(!(C=u.pop()))throw new Error('Unopened section "'+E+'" at '+w);if(C[1]!==E)throw new Error('Unclosed section "'+C[1]+'" at '+w)}else"name"===j||"{"===j||"&"===j?g=!0:"="===j&&O(E)}if(C=u.pop())throw new Error('Unclosed section "'+C[1]+'" at '+R.pos);return function(e){for(var t,n=[],r=n,o=[],i=0,c=e.length;i<c;++i)switch((t=e[i])[0]){case"#":case"^":r.push(t),o.push(t),r=t[4]=[];break;case"/":o.pop()[5]=t[2],r=o.length>0?o[o.length-1][4]:n;break;default:r.push(t)}return n}(function(e){for(var t,n,r=[],o=0,i=e.length;o<i;++o)(t=e[o])&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}(b))}(t,r)),s},m.prototype.render=function(e,t,n,r){var o=this.parse(e,r),i=t instanceof b?t:new b(t);return this.renderTokens(o,i,n,e,r)},m.prototype.renderTokens=function(e,t,n,r,o){for(var i,c,s,a="",u=0,p=e.length;u<p;++u)s=void 0,"#"===(c=(i=e[u])[0])?s=this.renderSection(i,t,n,r):"^"===c?s=this.renderInverted(i,t,n,r):">"===c?s=this.renderPartial(i,t,n,o):"&"===c?s=this.unescapedValue(i,t):"name"===c?s=this.escapedValue(i,t):"text"===c&&(s=this.rawValue(i)),void 0!==s&&(a+=s);return a},m.prototype.renderSection=function(e,t,o,i){var c=this,s="",a=t.lookup(e[1]);if(a){if(n(a))for(var u=0,p=a.length;u<p;++u)s+=this.renderTokens(e[4],t.push(a[u]),o,i);else if("object"==typeof a||"string"==typeof a||"number"==typeof a)s+=this.renderTokens(e[4],t.push(a),o,i);else if(r(a)){if("string"!=typeof i)throw new Error("Cannot use higher-order sections without the original template");null!=(a=a.call(t.view,i.slice(e[3],e[5]),function(e){return c.render(e,t,o)}))&&(s+=a)}else s+=this.renderTokens(e[4],t,o,i);return s}},m.prototype.renderInverted=function(e,t,r,o){var i=t.lookup(e[1]);if(!i||n(i)&&0===i.length)return this.renderTokens(e[4],t,r,o)},m.prototype.renderPartial=function(e,t,n,o){if(n){var i=r(n)?n(e[1]):n[e[1]];return null!=i?this.renderTokens(this.parse(i,o),t,n,i):void 0}},m.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return n},m.prototype.escapedValue=function(t,n){var r=n.lookup(t[1]);if(null!=r)return e.escape(r)},m.prototype.rawValue=function(e){return e[1]},e.name="mustache.js",e.version="3.0.1",e.tags=["{{","}}"];var y=new m;return e.clearCache=function(){return y.clearCache()},e.parse=function(e,t){return y.parse(e,t)},e.render=function(e,t,r,o){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(n(i=e)?"array":typeof i)+'" was given as the first argument for mustache#render(template, view, partials)');var i;return y.render(e,t,r,o)},e.to_html=function(t,n,o,i){var c=e.render(t,n,o);if(!r(i))return c;i(c)},e.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,function(e){return u[e]})},e.Scanner=_,e.Context=b,e.Writer=m,e},t&&"string"!=typeof t.nodeName?c(t):(o=[t],void 0===(i="function"==typeof(r=c)?r.apply(t,o):r)||(e.exports=i))},function(e,t,n){"use strict";e.exports=(e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))},function(e,t,n){"use strict";var r=new RegExp("%[a-f0-9]{2}","gi"),o=new RegExp("(%[a-f0-9]{2})+","gi");function i(e,t){try{return decodeURIComponent(e.join(""))}catch(e){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),r=e.slice(t);return Array.prototype.concat.call([],i(n),i(r))}function c(e){try{return decodeURIComponent(e)}catch(o){for(var t=e.match(r),n=1;n<t.length;n++)t=(e=i(t,n).join("")).match(r);return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},n=o.exec(e);n;){try{t[n[0]]=decodeURIComponent(n[0])}catch(e){var r=c(n[0]);r!==n[0]&&(t[n[0]]=r)}n=o.exec(e)}t["%C2"]="�";for(var i=Object.keys(t),s=0;s<i.length;s++){var a=i[s];e=e.replace(new RegExp(a,"g"),t[a])}return e}(e)}}},function(e,t,n){"use strict";n.r(t);var r=n(10),o=n.n(r);class i{constructor(e){this.props={},this.events={},this.children=[],Object.assign(this,e)}}var c=n(1),s=n(0);function a(e){!function e(t,n){t.forEach((r,o)=>{r=t[o]=new i(r),n.forEach(e=>e(r)),r.children&&e(r.children,n)})}(e,[u,p])}function u(e){e.fetch&&console.warn(`[@deprecated]: ${e.id}.fetch，请使用 DataFront/Ajax 组件代替`);const t=Object.assign({},e.props,e.events);Object.keys(t).forEach(n=>{const r=t[n];Object(c.e)(r)&&(0!==r.indexOf("$store")&&0!==r.indexOf("__")||(t[n]=`{{${r}}}`),"data_text"===n&&(console.warn(`[@deprecated]: ${e.id}.props.data_text，请使用 props.children 代替`),t.children=r,delete t.data_text))}),e.props=t}function p(e){s.a.setProps(e.id,e.props)}var l=n(3),f=n(5);const{Components:d}=l.a;function h(e){return Promise.all(e.map(e=>Object(f.a)(e.dist))).then(t=>{t.forEach((t,n)=>{const r=e[n];Object(c.a)(t)&&(d[r.name]=t),function e(t,n){("object"==typeof t||Object(c.b)(t))&&Object.keys(t).forEach(r=>{const o=t[r],i=[n,r].join(".");Object(c.a)(o)&&(d[i]=o),Object(c.d)(r)&&e(o,i)})}(t,r.name)})})}var _=n(8),b=n(6),m=n(9),y=n(2),g=n(7);const v={},O=(e,t)=>{const{component:n}=e,r=function(e){if(v[e])return v[e];const t=Object(g.a)(e),n=Object(y.b)(t)?Object(m.observer)(t):t,r=Object(m.observer)(class extends b.Component{render(){const{schema:e,$scope:t}=this.props,r=Object(g.b)(e,t),o=[r.children].concat(e.children.map(e=>O(e,t))).filter(e=>void 0!==e);return b.createElement(n,Object.assign({},this.props,r),...o)}});Object(y.b)(t)&&Object.keys(t).forEach(e=>{r[e]=n[e]});return r.displayName="Observable:"+e,v[e]=r,r}(n);if(r.propTypes&&r.propTypes.value&&r.propTypes.onChange){const t=s.a.store[e.id];!t||t.onChange&&t.onChange.isCombo||(t.onChange=Object(y.a)(window[t.onChange],e=>{t.value=e.target?e.target.value:e}))}return b.createElement(r,Object.assign({$scope:t,schema:e,id:e.id},Object(g.b)(e,t)))};class w{constructor(e,t,n){this.$options={el:document.querySelector("#Gourd")},this.init(e,t,n)}init(e,t,n){this.$page=e,this.$options=Object.assign({},this.$options,t),this.$data=Object.assign({},this.$data,n);const{modules:r,functions:i,components:c}=e,u=h(r);!function(e){if(e){const t=window.Babel.transform(decodeURIComponent(e),{compact:!0,comments:!1,presets:["react"]});let n=t&&t.code;if(n){const e=document.createElement("script");e.innerHTML=n.replace(/React.createElement\((.*?)(,)/g,(e,t)=>`React.createElement(${t[0].match(/[a-zA-Z]/)?`window.GOURD.Components['${t}']`:t},`),document.body.appendChild(e)}}}(i),a(c),s.a.setProps("global",Object.assign({},this.$data,{search:o.a.parse(location.search)})),u.then(()=>{this.mount()})}refresh(e,t,n){Object(_.unmountComponentAtNode)(this.$options.el),s.a.clear(),this.init(e,t,n)}mount(){this.$options.el||(this.$options.el=document.createElement("div"),this.$options.el.id="#Gourd",document.body.appendChild(this.$options.el)),Object(_.render)(this.$page.components.map(O),this.$options.el)}}w.createElement=O;t.default=w}]).default;