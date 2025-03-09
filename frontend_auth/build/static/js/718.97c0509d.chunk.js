(self.webpackChunksolana=self.webpackChunksolana||[]).push([[718],{1234:()=>{},5817:()=>{},7566:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>K});var r=o(5043),n=o(5464),a=o(3003),s=o(4046),i=o(713),c=o(6382).Buffer;const l={NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_SOLANA_NETWORK||"https://api.devnet.solana.com",d=(new i.Ng(l,"confirmed"),new i.J3("YourProgramIDHere"));var u=o(4991),p=o(579);const x=n.Ay.div`
  width: 640px;
  height: 480px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,h=n.Ay.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,g=n.Ay.canvas`
  position: absolute;
  top: 0;
  left: 0;
`,f=n.Ay.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
`,y=e=>{let{onPoseDetected:t}=e;const o=(0,r.useRef)(null),n=(0,r.useRef)(null),[a,s]=(0,r.useState)(!1),[i,c]=(0,r.useState)(0),[l,d]=(0,r.useState)(0);(0,r.useEffect)((()=>{let e;const t=async()=>{if(!o.current||!e)return;const r=await e.estimatePoses(o.current);if(r.length>0){const e=r[0].keypoints,t=y(e);v(t)}requestAnimationFrame(t)};return(async()=>{if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){const e=await navigator.mediaDevices.getUserMedia({video:!0});o.current&&(o.current.srcObject=e)}})(),(async()=>{e=await u.Fz(u.JZ.MoveNet)})().then(t),()=>{if(o.current&&o.current.srcObject){o.current.srcObject.getTracks().forEach((e=>e.stop()))}}}),[]);const y=e=>{const t=e.find((e=>"left_hip"===e.name)),o=e.find((e=>"left_knee"===e.name)),r=e.find((e=>"left_ankle"===e.name));return t&&o&&r?b(t,o,r):180},b=(e,t,o)=>{const r=Math.atan2(o.y-t.y,o.x-t.x)-Math.atan2(e.y-t.y,e.x-t.x);let n=Math.abs(180*r/Math.PI);return n>180&&(n=360-n),n},v=e=>{const o=Date.now();e<=110&&!a?s(!0):e>=160&&a&&(o-l>=800&&(c((e=>e+1)),d(o),t({isSquatting:!1})),s(!1))};return(0,p.jsxs)(x,{children:[(0,p.jsx)(h,{ref:o,autoPlay:!0,playsInline:!0}),(0,p.jsx)(g,{ref:n,width:640,height:480}),(0,p.jsxs)(f,{children:["\uc2a4\ucffc\ud2b8 \ud69f\uc218: ",i]})]})};var b=o(7784),v=o(7461);const w=async()=>await(0,v.H2)("/progress/save","POST"),m=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`,S=n.Ay.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
`,A=n.Ay.h2`
  color: #4caf50;
  margin-bottom: 20px;
`,j=n.Ay.p`
  margin-bottom: 20px;
  font-size: 18px;
`,k=n.Ay.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`,_=(0,n.Ay)(k)`
  background-color: #f44336;
  color: white;
`,C=(0,n.Ay)(k)`
  background-color: #4caf50;
  color: white;
`,P=n.Ay.p`
    color: red;
    margin-top: 10px;
  `,E=e=>{let{onClose:t}=e;const{callApi:o,loading:r,error:n}=(0,b._)(w);return(0,p.jsx)(m,{children:(0,p.jsxs)(S,{children:[(0,p.jsx)(A,{children:"Congratulations! \ud83c\udf89"}),(0,p.jsx)(j,{children:"You've reached your daily squat goal!"}),(0,p.jsx)(C,{onClick:async()=>{try{await o(),t()}catch(e){console.error("Failed to save progress:",e)}},disabled:r,children:r?"Saving...":"Save Progress"}),(0,p.jsx)(_,{onClick:t,children:"Close"}),n&&(0,p.jsxs)(P,{children:["Error: ",n]})]})})};var D=o(1579);const O=n.Ay.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`,T=n.Ay.h1`
  color: ${e=>e.theme.colors.primary};
  margin-bottom: 20px;
`,K=()=>{const e=(0,a.wA)(),t=(0,D.v)(),{todayCount:o,dailyGoal:n}=(0,a.d4)((e=>e.squats)),[l,u]=(0,r.useState)(!1);return(0,p.jsxs)(O,{children:[(0,p.jsx)(T,{children:"\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f \uc2a4\ucffc\ud2b8 \ucc4c\ub9b0\uc9c0"}),(0,p.jsx)(y,{onPoseDetected:async r=>{let{isSquatting:a}=r;if(!a){const r=o+1;if(e((0,s.D3)(1)),r%10===0)try{if(!t||!t.publicKey)return void alert("\u274c \uc9c0\uac11\uc774 \uc5f0\uacb0\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4. \ube14\ub85d\uccb4\uc778 \uc800\uc7a5\uc774 \ubd88\uac00\ub2a5\ud569\ub2c8\ub2e4.");const e=await(async(e,t)=>{if(!e||!e.publicKey)throw new Error("\uc9c0\uac11\uc774 \uc5f0\uacb0\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.");try{const o=new i.J3(e.publicKey),r=(c.from(JSON.stringify({squatCount:t,timestamp:Date.now()})),(new i.ZX).add(i.yq.transfer({fromPubkey:o,toPubkey:d,lamports:0}))),n=await e.signAndSendTransaction(r);return console.log(`\u2705 \ud2b8\ub79c\uc7ad\uc158 \uc131\uacf5! \uc870\ud68c \ub9c1\ud06c: https://explorer.solana.com/tx/${n}?cluster=devnet`),n}catch(o){throw console.error("\u274c Solana \ud2b8\ub79c\uc7ad\uc158 \uc2e4\ud328:",o),o}})(t.publicKey.toString(),r);console.log(`\u2705 \ube14\ub85d\uccb4\uc778 \uc800\uc7a5 \uc644\ub8cc: ${e}`)}catch(l){console.error("\u274c \ube14\ub85d\uccb4\uc778 \uc800\uc7a5 \uc2e4\ud328:",l)}r>=n&&u(!0)}}}),l&&(0,p.jsx)(E,{onClose:()=>u(!1),onSave:async()=>console.log("\ubcf4\uc0c1 \uc800\uc7a5!")})]})}},7784:(e,t,o)=>{"use strict";o.d(t,{_:()=>n});var r=o(5043);function n(e){const[t,o]=(0,r.useState)(!1),[n,a]=(0,r.useState)(null);return{callApi:async function(){o(!0);try{return await e(...arguments)}catch(t){throw a(t instanceof Error?t.message:"Unknown error"),t}finally{o(!1)}},loading:t,error:n}}},8590:()=>{}}]);
//# sourceMappingURL=718.97c0509d.chunk.js.map