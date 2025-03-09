"use strict";(self.webpackChunksolana=self.webpackChunksolana||[]).push([[975],{5975:(r,e,t)=>{t.r(e),t.d(e,{default:()=>m});var s=t(5043),o=t(5464),n=t(3003),a=t(4046),l=t(7461),i=t(7784),c=t(2153),d=t(579);const x=o.Ay.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`,p=o.Ay.h1`
  color: ${r=>r.theme.colors.primary};
  margin-bottom: 20px;
`,h=o.Ay.p`
  font-size: 1.1em;
  color: ${r=>r.theme.colors.text};
  margin-bottom: 15px;
`,u=o.Ay.input`
  padding: 8px;
  font-size: 1em;
  width: 80px;
  margin-left: 10px;
  border: 1px solid ${r=>r.theme.colors.primary};
  border-radius: 5px;
  text-align: center;
`,g=o.Ay.button`
  background-color: ${r=>r.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    background-color: ${r=>r.theme.colors.primaryHover};
  }
`,m=()=>{const r=(0,n.wA)(),{walletAddress:e}=(0,n.d4)((r=>r.auth)),{totalSquats:t,todayCount:o,dailyGoal:m,bestStreak:b,lastSessionDate:y}=(0,n.d4)((r=>r.squats||{totalSquats:0,todayCount:0,dailyGoal:30,bestStreak:0,lastSessionDate:null})),{callApi:j,loading:f,error:w}=(0,i._)(l.tO),[S,k]=(0,s.useState)(m);(0,s.useEffect)((()=>{(async()=>{const e=await j();e&&r((0,a.$Z)(e))})()}),[r,j]);const A=y?new Date(y).toISOString().split("T")[0]:"\uae30\ub85d \uc5c6\uc74c";return(0,d.jsxs)(x,{children:[(0,d.jsx)(p,{children:"\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f \ub300\uc2dc\ubcf4\ub4dc"}),f&&(0,d.jsx)("p",{children:"\u23f3 \ub370\uc774\ud130 \ubd88\ub7ec\uc624\ub294 \uc911..."}),w&&(0,d.jsxs)("p",{style:{color:"red"},children:["\u274c \ub370\uc774\ud130 \ub85c\ub529 \uc2e4\ud328: ","object"===typeof w&&null!==w?w.message:JSON.stringify(w)]}),!f&&!w&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(h,{children:["\ud83d\udd39 \ub0b4 \uc9c0\uac11 \uc8fc\uc18c: ",e?`${e.slice(0,4)}...${e.slice(-4)}`:"\uc5f0\uacb0\ub418\uc9c0 \uc54a\uc74c"]}),(0,d.jsxs)(h,{children:["\ud83d\udd25 \ucd1d \uc6b4\ub3d9 \ud69f\uc218: ",(0,d.jsxs)("strong",{children:[t," \ud68c"]})]}),(0,d.jsxs)(h,{children:["\ud83c\udfc6 \ucd5c\uace0 \uc5f0\uc18d \uc6b4\ub3d9 \uae30\ub85d: ",(0,d.jsxs)("strong",{children:[b," \uc77c"]})]}),(0,d.jsxs)(h,{children:["\ud83d\udcc5 \ub9c8\uc9c0\ub9c9 \uc6b4\ub3d9 \ub0a0\uc9dc: ",(0,d.jsx)("strong",{children:A})]}),(0,d.jsx)(c.A,{progress:Math.min(o/m*100,100)}),(0,d.jsxs)(h,{children:["\ud83d\udcca \uc624\ub298 \uc6b4\ub3d9: ",(0,d.jsxs)("strong",{children:[o,"/",m," \ud68c"]})]}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("label",{children:["\ud83c\udfaf \ubaa9\ud45c \uc124\uc815:",(0,d.jsx)(u,{type:"number",value:S,onChange:r=>k(Number(r.target.value))})]}),(0,d.jsx)(g,{onClick:()=>{S>0&&(r((0,a.Zb)(S)),localStorage.setItem("dailyGoal",S.toString()),alert(`\u2705 \uc6b4\ub3d9 \ubaa9\ud45c\uac00 ${S}\ud68c\ub85c \uc124\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4.`))},children:"\ubaa9\ud45c \ubcc0\uacbd"})]})]})]})}},7784:(r,e,t)=>{t.d(e,{_:()=>o});var s=t(5043);function o(r){const[e,t]=(0,s.useState)(!1),[o,n]=(0,s.useState)(null);return{callApi:async function(){t(!0);try{return await r(...arguments)}catch(e){throw n(e instanceof Error?e.message:"Unknown error"),e}finally{t(!1)}},loading:e,error:o}}}}]);
//# sourceMappingURL=975.45d5b4f8.chunk.js.map