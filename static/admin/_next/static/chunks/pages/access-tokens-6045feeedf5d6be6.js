(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[874],{48689:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(1413),c=n(67294),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},a=n(42135),s=function(e,t){return c.createElement(a.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:t,icon:o}))};s.displayName="DeleteOutlined";var i=c.forwardRef(s)},98082:function(e,t,n){"use strict";var r=n(97685),c=n(67294),o=n(31808);t.Z=function(){var e=c.useState(!1),t=(0,r.Z)(e,2),n=t[0],a=t[1];return c.useEffect((function(){a((0,o.fk)())}),[]),n}},6226:function(e,t,n){"use strict";n.d(t,{Z:function(){return v}});var r=n(4942),c=n(87462),o=n(71002),a=n(67294),s=n(94184),i=n.n(s),l=n(99134),u=n(59844),p=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n};var f=["xs","sm","md","lg","xl","xxl"],d=a.forwardRef((function(e,t){var n,s=a.useContext(u.E_),d=s.getPrefixCls,v=s.direction,m=a.useContext(l.Z),h=m.gutter,y=m.wrap,x=m.supportFlexGap,Z=e.prefixCls,b=e.span,g=e.order,w=e.offset,k=e.push,j=e.pull,O=e.className,C=e.children,E=e.flex,S=e.style,N=p(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),P=d("col",Z),_={};f.forEach((function(t){var n,a={},s=e[t];"number"===typeof s?a.span=s:"object"===(0,o.Z)(s)&&(a=s||{}),delete N[t],_=(0,c.Z)((0,c.Z)({},_),(n={},(0,r.Z)(n,"".concat(P,"-").concat(t,"-").concat(a.span),void 0!==a.span),(0,r.Z)(n,"".concat(P,"-").concat(t,"-order-").concat(a.order),a.order||0===a.order),(0,r.Z)(n,"".concat(P,"-").concat(t,"-offset-").concat(a.offset),a.offset||0===a.offset),(0,r.Z)(n,"".concat(P,"-").concat(t,"-push-").concat(a.push),a.push||0===a.push),(0,r.Z)(n,"".concat(P,"-").concat(t,"-pull-").concat(a.pull),a.pull||0===a.pull),(0,r.Z)(n,"".concat(P,"-rtl"),"rtl"===v),n))}));var z=i()(P,(n={},(0,r.Z)(n,"".concat(P,"-").concat(b),void 0!==b),(0,r.Z)(n,"".concat(P,"-order-").concat(g),g),(0,r.Z)(n,"".concat(P,"-offset-").concat(w),w),(0,r.Z)(n,"".concat(P,"-push-").concat(k),k),(0,r.Z)(n,"".concat(P,"-pull-").concat(j),j),n),O,_),A={};if(h&&h[0]>0){var T=h[0]/2;A.paddingLeft=T,A.paddingRight=T}if(h&&h[1]>0&&!x){var I=h[1]/2;A.paddingTop=I,A.paddingBottom=I}return E&&(A.flex=function(e){return"number"===typeof e?"".concat(e," ").concat(e," auto"):/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?"0 0 ".concat(e):e}(E),!1!==y||A.minWidth||(A.minWidth=0)),a.createElement("div",(0,c.Z)({},N,{style:(0,c.Z)((0,c.Z)({},A),S),className:z,ref:t}),C)}));d.displayName="Col";var v=d},99134:function(e,t,n){"use strict";var r=(0,n(67294).createContext)({});t.Z=r},25968:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var r=n(87462),c=n(4942),o=n(71002),a=n(97685),s=n(67294),i=n(94184),l=n.n(i),u=n(59844),p=n(99134),f=n(93355),d=n(24308),v=n(98082),m=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n},h=((0,f.b)("top","middle","bottom","stretch"),(0,f.b)("start","end","center","space-around","space-between"),s.forwardRef((function(e,t){var n,i=e.prefixCls,f=e.justify,h=e.align,y=e.className,x=e.style,Z=e.children,b=e.gutter,g=void 0===b?0:b,w=e.wrap,k=m(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),j=s.useContext(u.E_),O=j.getPrefixCls,C=j.direction,E=s.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),S=(0,a.Z)(E,2),N=S[0],P=S[1],_=(0,v.Z)(),z=s.useRef(g);s.useEffect((function(){var e=d.ZP.subscribe((function(e){var t=z.current||0;(!Array.isArray(t)&&"object"===(0,o.Z)(t)||Array.isArray(t)&&("object"===(0,o.Z)(t[0])||"object"===(0,o.Z)(t[1])))&&P(e)}));return function(){return d.ZP.unsubscribe(e)}}),[]);var A=O("row",i),T=function(){var e=[0,0];return(Array.isArray(g)?g:[g,0]).forEach((function(t,n){if("object"===(0,o.Z)(t))for(var r=0;r<d.c4.length;r++){var c=d.c4[r];if(N[c]&&void 0!==t[c]){e[n]=t[c];break}}else e[n]=t||0})),e}(),I=l()(A,(n={},(0,c.Z)(n,"".concat(A,"-no-wrap"),!1===w),(0,c.Z)(n,"".concat(A,"-").concat(f),f),(0,c.Z)(n,"".concat(A,"-").concat(h),h),(0,c.Z)(n,"".concat(A,"-rtl"),"rtl"===C),n),y),R={},G=T[0]>0?T[0]/-2:void 0,M=T[1]>0?T[1]/-2:void 0;if(G&&(R.marginLeft=G,R.marginRight=G),_){var F=(0,a.Z)(T,2);R.rowGap=F[1]}else M&&(R.marginTop=M,R.marginBottom=M);var B=s.useMemo((function(){return{gutter:T,wrap:w,supportFlexGap:_}}),[T,w,_]);return s.createElement(p.Z.Provider,{value:B},s.createElement("div",(0,r.Z)({},k,{className:I,style:(0,r.Z)((0,r.Z)({},R),x),ref:t}),Z))})));h.displayName="Row";var y=h},26713:function(e,t,n){"use strict";n.d(t,{u:function(){return v},Z:function(){return h}});var r=n(87462),c=n(4942),o=n(97685),a=n(67294),s=n(94184),i=n.n(s),l=n(50344),u=n(59844);function p(e){var t=e.className,n=e.direction,o=e.index,s=e.marginDirection,i=e.children,l=e.split,u=e.wrap,p=a.useContext(v),f=p.horizontalSize,d=p.verticalSize,m=p.latestIndex,h={};return p.supportFlexGap||("vertical"===n?o<m&&(h={marginBottom:f/(l?2:1)}):h=(0,r.Z)((0,r.Z)({},o<m&&(0,c.Z)({},s,f/(l?2:1))),u&&{paddingBottom:d})),null===i||void 0===i?null:a.createElement(a.Fragment,null,a.createElement("div",{className:t,style:h},i),o<m&&l&&a.createElement("span",{className:"".concat(t,"-split"),style:h},l))}var f=n(98082),d=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n},v=a.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),m={small:8,middle:16,large:24};var h=function(e){var t,n=a.useContext(u.E_),s=n.getPrefixCls,h=n.space,y=n.direction,x=e.size,Z=void 0===x?(null===h||void 0===h?void 0:h.size)||"small":x,b=e.align,g=e.className,w=e.children,k=e.direction,j=void 0===k?"horizontal":k,O=e.prefixCls,C=e.split,E=e.style,S=e.wrap,N=void 0!==S&&S,P=d(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),_=(0,f.Z)(),z=a.useMemo((function(){return(Array.isArray(Z)?Z:[Z,Z]).map((function(e){return function(e){return"string"===typeof e?m[e]:e||0}(e)}))}),[Z]),A=(0,o.Z)(z,2),T=A[0],I=A[1],R=(0,l.Z)(w,{keepEmpty:!0}),G=void 0===b&&"horizontal"===j?"center":b,M=s("space",O),F=i()(M,"".concat(M,"-").concat(j),(t={},(0,c.Z)(t,"".concat(M,"-rtl"),"rtl"===y),(0,c.Z)(t,"".concat(M,"-align-").concat(G),G),t),g),B="".concat(M,"-item"),D="rtl"===y?"marginLeft":"marginRight",H=0,L=R.map((function(e,t){return null!==e&&void 0!==e&&(H=t),a.createElement(p,{className:B,key:"".concat(B,"-").concat(t),direction:j,index:t,marginDirection:D,split:C,wrap:N},e)})),U=a.useMemo((function(){return{horizontalSize:T,verticalSize:I,latestIndex:H,supportFlexGap:_}}),[T,I,H,_]);if(0===R.length)return null;var W={};return N&&(W.flexWrap="wrap",_||(W.marginBottom=-I)),_&&(W.columnGap=T,W.rowGap=I),a.createElement("div",(0,r.Z)({className:F,style:(0,r.Z)((0,r.Z)({},W),E)},P),a.createElement(v.Provider,{value:U},L))}},20550:function(e,t,n){"use strict";n.d(t,{Z:function(){return g}});var r=n(4942),c=n(87462),o=n(97685),a=n(67294),s=n(94184),i=n.n(s),l=n(98423),u=n(97937),p=n(59844),f=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n},d=function(e){var t,n=e.prefixCls,o=e.className,s=e.checked,l=e.onChange,u=e.onClick,d=f(e,["prefixCls","className","checked","onChange","onClick"]),v=(0,a.useContext(p.E_).getPrefixCls)("tag",n),m=i()(v,(t={},(0,r.Z)(t,"".concat(v,"-checkable"),!0),(0,r.Z)(t,"".concat(v,"-checkable-checked"),s),t),o);return a.createElement("span",(0,c.Z)({},d,{className:m,onClick:function(e){null===l||void 0===l||l(!s),null===u||void 0===u||u(e)}}))},v=n(98787),m=n(97202),h=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n},y=new RegExp("^(".concat(v.Y.join("|"),")(-inverse)?$")),x=new RegExp("^(".concat(v.E.join("|"),")$")),Z=function(e,t){var n,s=e.prefixCls,f=e.className,d=e.style,v=e.children,Z=e.icon,b=e.color,g=e.onClose,w=e.closeIcon,k=e.closable,j=void 0!==k&&k,O=h(e,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),C=a.useContext(p.E_),E=C.getPrefixCls,S=C.direction,N=a.useState(!0),P=(0,o.Z)(N,2),_=P[0],z=P[1];a.useEffect((function(){"visible"in O&&z(O.visible)}),[O.visible]);var A=function(){return!!b&&(y.test(b)||x.test(b))},T=(0,c.Z)({backgroundColor:b&&!A()?b:void 0},d),I=A(),R=E("tag",s),G=i()(R,(n={},(0,r.Z)(n,"".concat(R,"-").concat(b),I),(0,r.Z)(n,"".concat(R,"-has-color"),b&&!I),(0,r.Z)(n,"".concat(R,"-hidden"),!_),(0,r.Z)(n,"".concat(R,"-rtl"),"rtl"===S),n),f),M=function(e){e.stopPropagation(),null===g||void 0===g||g(e),e.defaultPrevented||"visible"in O||z(!1)},F="onClick"in O||v&&"a"===v.type,B=(0,l.Z)(O,["visible"]),D=Z||null,H=D?a.createElement(a.Fragment,null,D,a.createElement("span",null,v)):v,L=a.createElement("span",(0,c.Z)({},B,{ref:t,className:G,style:T}),H,j?w?a.createElement("span",{className:"".concat(R,"-close-icon"),onClick:M},w):a.createElement(u.Z,{className:"".concat(R,"-close-icon"),onClick:M}):null);return F?a.createElement(m.Z,null,L):L},b=a.forwardRef(Z);b.displayName="Tag",b.CheckableTag=d;var g=b},17554:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/access-tokens",function(){return n(48849)}])},48849:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return E}});var r=n(28520),c=n.n(r),o=n(85893),a=n(67294),s=n(17256),i=n(56266),l=n(20550),u=n(6226),p=n(32808),f=n(56516),d=n(69677),v=n(25968),m=n(71577),h=n(26713),y=n(49919),x=n(48689),Z=n(58091),b=n(58827);function g(e,t,n,r,c,o,a){try{var s=e[o](a),i=s.value}catch(l){return void n(l)}s.done?t(i):Promise.resolve(i).then(r,c)}function w(e){return function(){var t=this,n=arguments;return new Promise((function(r,c){var o=e.apply(t,n);function a(e){g(o,r,c,a,s,"next",e)}function s(e){g(o,r,c,a,s,"throw",e)}a(void 0)}))}}var k=s.Z.Title,j=s.Z.Paragraph,O={CAN_SEND_SYSTEM_MESSAGES:{name:"System messages",description:"Can send official messages on behalf of the system.",color:"purple"},CAN_SEND_MESSAGES:{name:"User chat messages",description:"Can send chat messages on behalf of the owner of this token.",color:"green"},HAS_ADMIN_ACCESS:{name:"Has admin access",description:"Can perform administrative actions such as moderation, get server statuses, etc.",color:"red"}};function C(e){var t=e.onOk,n=e.onCancel,r=e.visible,c=(0,a.useState)([]),s=c[0],i=c[1],l=(0,a.useState)(""),h=l[0],y=l[1],x=Object.keys(O).map((function(e){return{value:e,label:O[e].description}})),Z={disabled:0===s.length||""===h},b=x.map((function(e){return(0,o.jsx)(u.Z,{span:8,children:(0,o.jsx)(p.Z,{value:e.value,children:e.label})},e.value)}));return(0,o.jsxs)(f.Z,{title:"Create New Access token",visible:r,onOk:function(){t(h,s),i([]),y("")},onCancel:n,okButtonProps:Z,children:[(0,o.jsxs)("p",{children:[(0,o.jsx)("p",{children:"The name will be displayed as the chat user when sending messages with this access token."}),(0,o.jsx)(d.Z,{value:h,placeholder:"Name of bot, service, or integration",onChange:function(e){return y(e.currentTarget.value)}})]}),(0,o.jsx)("p",{children:"Select the permissions this access token will have. It cannot be edited after it's created."}),(0,o.jsx)(p.Z.Group,{style:{width:"100%"},value:s,onChange:function(e){i(e)},children:(0,o.jsx)(v.Z,{children:b})}),(0,o.jsx)("p",{children:(0,o.jsx)(m.Z,{type:"primary",onClick:function(){i(Object.keys(O))},children:"Select all"})})]})}function E(){var e=function(e){console.error("error",e)},t=(0,a.useState)([]),n=t[0],r=t[1],s=(0,a.useState)(!1),u=s[0],p=s[1];function f(){return v.apply(this,arguments)}function v(){return(v=w(c().mark((function t(){var n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,b.rQ)(b.ms);case 3:n=t.sent,r(n),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}function g(){return(g=w(c().mark((function t(n){return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,b.rQ)(b.Wr,{method:"POST",data:{token:n}});case 3:f(),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),e(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))).apply(this,arguments)}function E(){return(E=w(c().mark((function t(o,a){var s;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,b.rQ)(b.IO,{method:"POST",data:{name:o,scopes:a}});case 3:s=t.sent,r(n.concat(s)),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))).apply(this,arguments)}(0,a.useEffect)((function(){f()}),[]);var S=[{title:"",key:"delete",render:function(e,t){return(0,o.jsx)(h.Z,{size:"middle",children:(0,o.jsx)(m.Z,{onClick:function(){return function(e){return g.apply(this,arguments)}(t.accessToken)},icon:(0,o.jsx)(x.Z,{})})})}},{title:"Name",dataIndex:"displayName",key:"displayName"},{title:"Token",dataIndex:"accessToken",key:"accessToken",render:function(e){return(0,o.jsx)(d.Z.Password,{size:"small",bordered:!1,value:e})}},{title:"Scopes",dataIndex:"scopes",key:"scopes",render:function(e){return(0,o.jsx)(o.Fragment,{children:e.map((function(e){return function(e){if(!e||!O[e])return null;var t=O[e];return(0,o.jsx)(i.Z,{title:t.description,children:(0,o.jsx)(l.Z,{color:t.color,children:t.name})},e)}(e)}))})}},{title:"Last Used",dataIndex:"lastUsed",key:"lastUsed",render:function(e){if(!e)return"Never";var t=new Date(e);return(0,Z.Z)(t,"P p")}}];return(0,o.jsxs)("div",{children:[(0,o.jsx)(k,{children:"Access Tokens"}),(0,o.jsx)(j,{children:"Access tokens are used to allow external, 3rd party tools to perform specific actions on your Owncast server. They should be kept secure and never included in client code, instead they should be kept on a server that you control."}),(0,o.jsxs)(j,{children:["Read more about how to use these tokens, with examples, at"," ",(0,o.jsx)("a",{href:"https://owncast.online/docs/integrations/?source=admin",target:"_blank",rel:"noopener noreferrer",children:"our documentation"}),"."]}),(0,o.jsx)(y.Z,{rowKey:"token",columns:S,dataSource:n,pagination:!1}),(0,o.jsx)("br",{}),(0,o.jsx)(m.Z,{type:"primary",onClick:function(){p(!0)},children:"Create Access Token"}),(0,o.jsx)(C,{visible:u,onOk:function(e,t){p(!1),function(e,t){E.apply(this,arguments)}(e,t)},onCancel:function(){p(!1)}})]})}}},function(e){e.O(0,[919,516,91,774,888,179],(function(){return t=17554,e(e.s=t);var t}));var t=e.O();_N_E=t}]);