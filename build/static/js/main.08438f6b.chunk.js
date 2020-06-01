(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},20:function(e,n,t){},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(14),r=t.n(c),u=(t(20),t(4)),l=t(2),i=(t(21),function(e){var n=e.person,t=e.clickHandler;return o.a.createElement("div",{className:"personDetails"},o.a.createElement("p",null,"".concat(n.name," /// ").concat(n.number)),o.a.createElement("button",{onClick:t},"Delete Person"))}),s=function(e){var n=e.label,t=e.inputValue,a=e.onChangeHandler;return o.a.createElement("label",null,n,o.a.createElement("input",{required:!0,value:t,onChange:a}))},f=function(e){var n=e.label,t=e.inputValue,a=e.onChangeHandler;return o.a.createElement("label",null,n,o.a.createElement("input",{value:t,onChange:a}))},m=function(e){var n=e.notification,t=n.isError?"error":"success";return n.message?o.a.createElement("div",{className:t},n.message):null},d=t(3),b=t.n(d),p="/api/persons",h=function(){return b.a.get(p).then((function(e){return console.log("Response after getAll: ",e),e.data}))},g=function(e){return b.a.post(p,e).then((function(e){return console.log("Response after create: ",e),e.data}))},E=function(e,n){return b.a.put("".concat(p,"/").concat(e),n).then((function(e){return console.log("Response after update: ",e),e.data}))},v=function(e){return b.a.delete("".concat(p,"/").concat(e)).then((function(e){return console.log("Response after delete: ",e),e.data}))},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),d=Object(l.a)(r,2),b=d[0],p=d[1],j=Object(a.useState)(""),O=Object(l.a)(j,2),k=O[0],w=O[1],C=Object(a.useState)(""),S=Object(l.a)(C,2),y=S[0],H=S[1],D=Object(a.useState)({}),V=Object(l.a)(D,2),x=V[0],R=V[1],N=Object(a.useState)(t),A=Object(l.a)(N,2),J=A[0],P=A[1];console.log("Testing build!!!");Object(a.useEffect)((function(){h().then((function(e){c(e),P(e)}))}),[]);var T=function(){g({name:b,number:k}).then((function(e){var n=t.concat(e);F(!1,'"'.concat(e.name,'" has been created')),B(n)}))},q=function(e){var n=t.find((function(n){return n.name===e})),a=Object(u.a)(Object(u.a)({},n),{},{number:k});E(n.id,a).then((function(e){var a=t.map((function(t){return t.id!==n.id?t:e}));F(!1,'"'.concat(e.name,'" number has been updated.')),B(a)})).catch((function(e){F(!0,"".concat(n.name," no longer exists in the server."))}))},B=function(e){c(e),P(e),p(""),w(""),H("")},F=function(e,n){R({isError:e,message:n}),setTimeout((function(){R({})}),2e3)};return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(m,{notification:x}),o.a.createElement("form",{onSubmit:function(e){(e.preventDefault(),t.some((function(e){return e.name===b})))?window.confirm('"'.concat(b,'" already exists, do you want to update the phone number?'))&&q(b):T()}},o.a.createElement("div",null,o.a.createElement(s,{label:"name",inputValue:b,onChangeHandler:function(e){p(e.target.value)}}),o.a.createElement(s,{label:"number",inputValue:k,onChangeHandler:function(e){w(e.target.value)}})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"Add"))),o.a.createElement("h2",null,"Numbers"),o.a.createElement(f,{label:"Filter",inputValue:y,onChangeHandler:function(e){var n=e.target.value;H(n),P(t.filter((function(e){return e.name.toLowerCase().includes(n)})))}}),J.map((function(e){return o.a.createElement(i,{key:e.id,person:e,clickHandler:function(){return function(e){console.log("Deleting person :",e),window.confirm('Do you really want to delete "'.concat(e.name,'" info?'))&&v(e.id).then((function(){var n=t.filter((function(n){return n.id!==e.id}));c(n),P(n),F(!1,'"'.concat(e.name,'" has been deleted'))})).catch((function(n){F(!0,"".concat(e.name," no longer exists in the server."))}))}(e)}})})))};r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(j,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.08438f6b.chunk.js.map