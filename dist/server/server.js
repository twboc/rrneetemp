(()=>{"use strict";var e={n:r=>{var n=r&&r.__esModule?()=>r.default:()=>r;return e.d(n,{a:n}),n},d:(r,n)=>{for(var t in n)e.o(n,t)&&!e.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:n[t]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r)};const r=require("express");var n=e.n(r);const t=require("path");var o=e.n(t);console.log("__dirname: ",__dirname);var a=n()();a.get("/",(function(e,r){return r.sendFile(o().resolve(__dirname+"/../public/index.html"))})),a.use("/app",n().static(o().resolve(__dirname,"../app"))),a.use("/public",n().static(o().resolve(__dirname,"../public"))),a.listen(3e3,(function(){return console.log("Example app listening on port 3000")}))})();