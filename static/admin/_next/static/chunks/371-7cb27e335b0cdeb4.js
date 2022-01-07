"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[371],{82911:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(1413),a=t(67294),o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 708c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm62.9-219.5a48.3 48.3 0 00-30.9 44.8V620c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-21.5c0-23.1 6.7-45.9 19.9-64.9 12.9-18.6 30.9-32.8 52.1-40.9 34-13.1 56-41.6 56-72.7 0-44.1-43.1-80-96-80s-96 35.9-96 80v7.6c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V420c0-39.3 17.2-76 48.4-103.3C430.4 290.4 470 276 512 276s81.6 14.5 111.6 40.7C654.8 344 672 380.7 672 420c0 57.8-38.1 109.8-97.1 132.5z"}}]},name:"question-circle",theme:"filled"},s=t(42135),i=function(e,n){return a.createElement(s.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:n,icon:o}))};i.displayName="QuestionCircleFilled";var c=a.forwardRef(i)},84674:function(e,n,t){t.d(n,{Z:function(){return c}});var r=t(1413),a=t(67294),o={icon:function(e,n){return{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm288.5 682.8L277.7 224C258 240 240 258 224 277.7l522.8 522.8C682.8 852.7 601 884 512 884c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372c0 89-31.3 170.8-83.5 234.8z",fill:e}},{tag:"path",attrs:{d:"M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372c89 0 170.8-31.3 234.8-83.5L224 277.7c16-19.7 34-37.7 53.7-53.7l522.8 522.8C852.7 682.8 884 601 884 512c0-205.4-166.6-372-372-372z",fill:n}}]}},name:"stop",theme:"twotone"},s=t(42135),i=function(e,n){return a.createElement(s.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:n,icon:o}))};i.displayName="StopTwoTone";var c=a.forwardRef(i)},27049:function(e,n,t){var r=t(87462),a=t(4942),o=t(67294),s=t(94184),i=t.n(s),c=t(59844),l=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(t[r[a]]=e[r[a]])}return t};n.Z=function(e){return o.createElement(c.C,null,(function(n){var t,s=n.getPrefixCls,c=n.direction,u=e.prefixCls,d=e.type,f=void 0===d?"horizontal":d,m=e.orientation,h=void 0===m?"center":m,p=e.orientationMargin,v=e.className,x=e.children,y=e.dashed,b=e.plain,j=l(e,["prefixCls","type","orientation","orientationMargin","className","children","dashed","plain"]),g=s("divider",u),Z=h.length>0?"-".concat(h):h,w=!!x,C="left"===h&&null!=p,k="right"===h&&null!=p,N=i()(g,"".concat(g,"-").concat(f),(t={},(0,a.Z)(t,"".concat(g,"-with-text"),w),(0,a.Z)(t,"".concat(g,"-with-text").concat(Z),w),(0,a.Z)(t,"".concat(g,"-dashed"),!!y),(0,a.Z)(t,"".concat(g,"-plain"),!!b),(0,a.Z)(t,"".concat(g,"-rtl"),"rtl"===c),(0,a.Z)(t,"".concat(g,"-no-default-orientation-margin-left"),C),(0,a.Z)(t,"".concat(g,"-no-default-orientation-margin-right"),k),t),v),A=(0,r.Z)((0,r.Z)({},C&&{marginLeft:p}),k&&{marginRight:p});return o.createElement("div",(0,r.Z)({className:N},j,{role:"separator"}),x&&o.createElement("span",{className:"".concat(g,"-inner-text"),style:A},x))}))}},66192:function(e,n,t){t.d(n,{Z:function(){return h}});var r=t(28520),a=t.n(r),o=t(85893),s=t(56516),i=t(71577),c=t(21640),l=t(82911),u=t(84674),d=t(58827);function f(e,n,t,r,a,o,s){try{var i=e[o](s),c=i.value}catch(l){return void t(l)}i.done?n(c):Promise.resolve(c).then(r,a)}function m(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function s(e){f(o,r,a,s,i,"next",e)}function i(e){f(o,r,a,s,i,"throw",e)}s(void 0)}))}}function h(e){var n=e.user,t=e.isEnabled,r=e.label,f=e.onClick;function h(){return(h=m(a().mark((function e(n){var r,o,s;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.id,o={userId:r,enabled:!t},e.prev=2,e.next=5,(0,d.rQ)(d.NM,{data:o,method:"POST",auth:!0});case 5:return s=e.sent,e.abrupt("return",s.success);case 9:e.prev=9,e.t0=e.catch(2),console.error(e.t0);case 12:return e.abrupt("return",!1);case 13:case"end":return e.stop()}}),e,null,[[2,9]])})))).apply(this,arguments)}var p=t?"ban":"unban",v=t?(0,o.jsx)(c.Z,{style:{color:"var(--ant-error)"}}):(0,o.jsx)(l.Z,{style:{color:"var(--ant-warning)"}}),x=(0,o.jsxs)(o.Fragment,{children:["Are you sure you want to ",p," ",(0,o.jsx)("strong",{children:n.displayName}),t?" and remove their messages?":"?"]});return(0,o.jsx)(i.Z,{onClick:function(){s.Z.confirm({title:"Confirm ".concat(p),content:x,onCancel:function(){},onOk:function(){return new Promise((function(e,t){var r=function(e){return h.apply(this,arguments)}(n);r?setTimeout((function(){e(r),null===f||void 0===f||f()}),3e3):t()}))},okType:"danger",okText:t?"Absolutely":null,icon:v})},size:"small",icon:t?(0,o.jsx)(u.Z,{twoToneColor:"#ff4d4f"}):null,className:"block-user-button",children:r||p})}h.defaultProps={label:"",onClick:null}},85584:function(e,n,t){t.d(n,{Z:function(){return T}});var r=t(85893),a=t(67294),o=t(56266),s=t(56516),i=t(17256),c=t(25968),l=t(6226),u=t(27049),d=t(85533),f=t(58091),m=t(96486),h=t(66192),p=t(28520),v=t.n(p),x=t(71577),y=t(21640),b=t(82911),j=t(84674),g=t(58827);function Z(e,n,t,r,a,o,s){try{var i=e[o](s),c=i.value}catch(l){return void t(l)}i.done?n(c):Promise.resolve(c).then(r,a)}function w(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function s(e){Z(o,r,a,s,i,"next",e)}function i(e){Z(o,r,a,s,i,"throw",e)}s(void 0)}))}}function C(e){var n,t=e.user,a=e.onClick;function o(){return(o=w(v().mark((function e(n,t){var r,a,o;return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.id,a={userId:r,isModerator:t},e.prev=2,e.next=5,(0,g.rQ)(g.jr,{data:a,method:"POST",auth:!0});case 5:return o=e.sent,e.abrupt("return",o.success);case 9:e.prev=9,e.t0=e.catch(2),console.error(e.t0);case 12:return e.abrupt("return",!1);case 13:case"end":return e.stop()}}),e,null,[[2,9]])})))).apply(this,arguments)}var i=null===(n=t.scopes)||void 0===n?void 0:n.includes("MODERATOR"),c=i?"remove moderator":"add moderator",l=i?(0,r.jsx)(y.Z,{style:{color:"var(--ant-error)"}}):(0,r.jsx)(b.Z,{style:{color:"var(--ant-warning)"}}),u=(0,r.jsxs)(r.Fragment,{children:["Are you sure you want to ",c," ",(0,r.jsx)("strong",{children:t.displayName}),"?"]});return(0,r.jsx)(x.Z,{onClick:function(){s.Z.confirm({title:"Confirm ".concat(c),content:u,onCancel:function(){},onOk:function(){return new Promise((function(e,n){var r=function(e,n){return o.apply(this,arguments)}(t,!i);r?setTimeout((function(){e(r),null===a||void 0===a||a()}),3e3):n()}))},okType:"danger",okText:i?"Yup!":null,icon:l})},size:"small",icon:i?(0,r.jsx)(j.Z,{twoToneColor:"#ff4d4f"}):null,className:"block-user-button",children:c})}C.defaultProps={onClick:null};var k=t(20643),N=t(2766);function A(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function T(e){var n=e.user,t=e.connectionInfo,p=e.children,v=(0,a.useState)(!1),x=v[0],y=v[1],b=function(){y(!1)},j=n.displayName,g=n.createdAt,Z=n.previousNames,w=n.nameChangedAt,T=n.disabledAt,O=t||{},P=O.connectedAt,D=O.messageCount,E=O.userAgent,S=null,M=Z&&A(Z);Z&&Z.length>1&&w&&(S=new Date(w),M.reverse());var z=new Date(g),I=(0,f.Z)(z,"PP pp"),F=S?(0,d.Z)(S):null;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Z,{title:(0,r.jsxs)(r.Fragment,{children:["Created at: ",I,".",(0,r.jsx)("br",{})," Click for more info."]}),placement:"bottomLeft",children:(0,r.jsx)("button",{type:"button","aria-label":"Display more details about this user",className:"user-item-container",onClick:function(){y(!0)},children:p})}),(0,r.jsx)(s.Z,{destroyOnClose:!0,width:600,cancelText:"Close",okButtonProps:{style:{display:"none"}},title:"User details: ".concat(j),visible:x,onOk:b,onCancel:b,children:(0,r.jsxs)("div",{className:"user-details",children:[(0,r.jsx)(i.Z.Title,{level:4,children:j}),(0,r.jsxs)("p",{className:"created-at",children:["User created at ",I,"."]}),(0,r.jsxs)(c.Z,{gutter:16,children:[t&&(0,r.jsxs)(l.Z,{md:S?12:24,children:[(0,r.jsx)(i.Z.Title,{level:5,children:"This user is currently connected to Chat."}),(0,r.jsxs)("ul",{className:"connection-info",children:[(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"Active for:"})," ",(0,d.Z)(new Date(P))]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"Messages sent:"})," ",D]}),(0,r.jsxs)("li",{children:[(0,r.jsx)("strong",{children:"User Agent:"}),(0,r.jsx)("br",{}),(0,N.AB)(E)]})]})]}),S&&(0,r.jsxs)(l.Z,{md:t?12:24,children:[(0,r.jsx)(i.Z.Title,{level:5,children:"This user is also seen as:"}),(0,r.jsx)("ul",{className:"previous-names-list",children:(0,m.uniq)(M).map((function(e,n){return(0,r.jsxs)("li",{className:0===n?"latest":"",children:[(0,r.jsx)("span",{className:"user-name-item",children:e}),0===n?" (Changed ".concat(F," ago)"):""]})}))})]})]}),(0,r.jsx)(u.Z,{}),T?(0,r.jsxs)(r.Fragment,{children:["This user was banned on ",(0,r.jsx)("code",{children:(0,k.u)(T)}),".",(0,r.jsx)("br",{}),(0,r.jsx)("br",{}),(0,r.jsx)(h.Z,{label:"Unban this user",user:n,isEnabled:!1,onClick:b})]}):(0,r.jsx)(h.Z,{label:"Ban this user",user:n,isEnabled:!0,onClick:b}),(0,r.jsx)(C,{user:n,onClick:b})]})})]})}T.defaultProps={connectionInfo:null}},20643:function(e,n,t){t.d(n,{u:function(){return c},Z:function(){return l}});var r=t(85893),a=t(49919),o=t(58091),s=t(85584),i=t(66192);function c(e){return(0,o.Z)(new Date(e),"MMM d H:mma")}function l(e){var n=e.data,t=[{title:"Last Known Display Name",dataIndex:"displayName",key:"displayName",render:function(e,n){return(0,r.jsx)(s.Z,{user:n,children:(0,r.jsx)("span",{className:"display-name",children:e})})}},{title:"Created",dataIndex:"createdAt",key:"createdAt",render:function(e){return c(e)},sorter:function(e,n){return new Date(e.createdAt).getTime()-new Date(n.createdAt).getTime()},sortDirections:["descend","ascend"]},{title:"Disabled at",dataIndex:"disabledAt",key:"disabledAt",defaultSortOrder:"descend",render:function(e){return e?c(e):null},sorter:function(e,n){return new Date(e.disabledAt).getTime()-new Date(n.disabledAt).getTime()},sortDirections:["descend","ascend"]},{title:"",key:"block",className:"actions-col",render:function(e,n){return(0,r.jsx)(i.Z,{user:n,isEnabled:!n.disabledAt})}}];return(0,r.jsx)(a.Z,{pagination:{hideOnSinglePage:!0},className:"table-container",columns:t,dataSource:n,size:"small",rowKey:"id"})}}}]);