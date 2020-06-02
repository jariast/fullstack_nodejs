(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},20:function(e,n,t){},21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),o=t.n(c),u=(t(20),t(4)),l=t(2),i=(t(21),function(e){var n=e.person,t=e.clickHandler;return r.a.createElement("div",{className:"personDetails"},r.a.createElement("p",null,"".concat(n.name," /// ").concat(n.number)),r.a.createElement("button",{onClick:t},"Delete Person"))}),s=function(e){var n=e.label,t=e.inputValue,a=e.onChangeHandler;return r.a.createElement("label",null,n,r.a.createElement("input",{required:!0,value:t,onChange:a}))},f=function(e){var n=e.label,t=e.inputValue,a=e.onChangeHandler;return r.a.createElement("label",null,n,r.a.createElement("input",{value:t,onChange:a}))},m=function(e){var n=e.notification,t=n.isError?"error":"success";return n.message?r.a.createElement("div",{className:t},n.message):null},d=t(3),b=t.n(d),p={API_URL:"/api/persons"}.API_URL,h=function(){return b.a.get(p).then((function(e){return console.log("Response after getAll: ",e),e.data}))},E=function(e){return b.a.post(p,e).then((function(e){return console.log("Response after create: ",e),e.data}))},v=function(e,n){return b.a.put("".concat(p,"/").concat(e),n).then((function(e){return console.log("Response after update: ",e),e.data}))},g=function(e){return b.a.delete("".concat(p,"/").concat(e)).then((function(e){return console.log("Response after delete: ",e),e.data}))},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),d=Object(l.a)(o,2),b=d[0],p=d[1],j=Object(a.useState)(""),O=Object(l.a)(j,2),k=O[0],w=O[1],C=Object(a.useState)(""),S=Object(l.a)(C,2),y=S[0],H=S[1],R=Object(a.useState)({}),D=Object(l.a)(R,2),V=D[0],A=D[1],P=Object(a.useState)(t),x=Object(l.a)(P,2),I=x[0],L=x[1];Object(a.useEffect)((function(){h().then((function(e){c(e),L(e)}))}),[]);var N=function(){E({name:b,number:k}).then((function(e){var n=t.concat(e);_(!1,'"'.concat(e.name,'" has been created')),U(n)})).catch((function(e){return _(!0,e.response.data.error)}))},J=function(e){var n=t.find((function(n){return n.name===e})),a=Object(u.a)(Object(u.a)({},n),{},{number:k});v(n.id,a).then((function(e){var a=t.map((function(t){return t.id!==n.id?t:e}));_(!1,'"'.concat(e.name,'" number has been updated.')),U(a)})).catch((function(e){_(!0,e.response.data.error)}))},U=function(e){c(e),L(e),p(""),w(""),H("")},_=function(e,n){A({isError:e,message:n}),setTimeout((function(){A({})}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(m,{notification:V}),r.a.createElement("form",{onSubmit:function(e){(e.preventDefault(),t.some((function(e){return e.name===b})))?window.confirm('"'.concat(b,'" already exists, do you want to update the phone number?'))&&J(b):N()}},r.a.createElement("div",null,r.a.createElement(s,{label:"name",inputValue:b,onChangeHandler:function(e){p(e.target.value)}}),r.a.createElement(s,{label:"number",inputValue:k,onChangeHandler:function(e){w(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add"))),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{label:"Filter",inputValue:y,onChangeHandler:function(e){var n=e.target.value;H(n),L(t.filter((function(e){return e.name.toLowerCase().includes(n)})))}}),I.map((function(e){return r.a.createElement(i,{key:e.id,person:e,clickHandler:function(){return function(e){console.log("Deleting person :",e),window.confirm('Do you really want to delete "'.concat(e.name,'" info?'))&&g(e.id).then((function(){var n=t.filter((function(n){return n.id!==e.id}));c(n),L(n),_(!1,'"'.concat(e.name,'" has been deleted'))})).catch((function(n){_(!0,"".concat(e.name," no longer exists in the server."))}))}(e)}})})))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.8c713c63.chunk.js.map