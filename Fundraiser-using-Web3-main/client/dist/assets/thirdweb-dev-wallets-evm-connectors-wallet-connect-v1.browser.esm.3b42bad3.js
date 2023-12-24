import{aQ as _,aG as c,aH as f,aK as I,aJ as s,aI as v,aR as S,aL as P,aS as M,aM as N}from"./index.ff31cc21.js";import{C as D,U,n as L,S as E}from"./normalizeChainId-e4cc0175.browser.esm.c234b792.js";const C="last-used-chain-id",y="last-session";var a=new WeakMap,l=new WeakMap,A=new WeakSet,q=new WeakSet;class x extends D{constructor(e){super(e),_(this,q),_(this,A),c(this,"id","walletConnectV1"),c(this,"name","WalletConnectV1"),c(this,"ready",!0),f(this,a,{writable:!0,value:void 0}),f(this,l,{writable:!0,value:void 0}),c(this,"walletName",void 0),c(this,"onSwitchChain",()=>{this.emit("message",{type:"switch_chain"})}),c(this,"onDisplayUri",async(t,i)=>{t&&this.emit("message",{data:t,type:"display_uri_error"}),this.emit("message",{data:i.params[0],type:"display_uri"})}),c(this,"onRequestSent",(t,i)=>{t&&this.emit("message",{data:t,type:"request"}),this.emit("message",{data:i.params[0],type:"request"})}),c(this,"onMessage",t=>{this.emit("message",t)}),c(this,"onAccountsChanged",t=>{t.length===0?this.emit("disconnect"):this.emit("change",{account:v(t[0])})}),c(this,"onChainChanged",t=>{const i=L(t),d=this.isChainUnsupported(i);s(this,l).setItem(C,String(t)),this.emit("change",{chain:{id:i,unsupported:d}})}),c(this,"onDisconnect",async()=>{this.walletName=void 0,s(this,l).removeItem(C),s(this,l).removeItem(y),S(this,q,k).call(this),this.emit("disconnect")}),I(this,l,e.storage)}async connect(){var t,i,d;let{chainId:e}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};try{let n=e;if(!n){const m=await s(this,l).getItem(C),w=m?parseInt(m):void 0;w&&!this.isChainUnsupported(w)&&(n=w)}const h=await this.getProvider({chainId:n,create:!0});this.setupListeners(),setTimeout(()=>this.emit("message",{type:"connecting"}),0);const r=await h.enable(),u=v(r[0]);let o=await this.getChainId(),g=this.isChainUnsupported(o);if(this.walletName=(d=(i=(t=h.connector)==null?void 0:t.peerMeta)==null?void 0:i.name)!=null?d:"",e)try{await this.switchChain(e),o=e,g=this.isChainUnsupported(o)}catch(m){console.error(`could not switch to desired chain id: ${e} `,m)}return S(this,A,W).call(this),this.emit("connect",{account:u,chain:{id:o,unsupported:g},provider:h}),{account:u,chain:{id:o,unsupported:g},provider:new P(h)}}catch(n){throw/user closed modal/i.test(n.message)?new U(n):n}}async disconnect(){await(await this.getProvider()).disconnect()}async getAccount(){const t=(await this.getProvider()).accounts;return v(t[0])}async getChainId(){const e=await this.getProvider();return L(e.chainId)}async getProvider(){var i,d,n;let{chainId:e,create:t}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!s(this,a)||e||t){const h=(i=this.options)!=null&&i.infuraId?{}:this.chains.reduce((g,m)=>({...g,[m.chainId]:m.rpc[0]}),{}),r=(await M(()=>import("./index-42b0f5f5.browser.esm.3fba6532.js"),["assets/index-42b0f5f5.browser.esm.3fba6532.js","assets/index.ff31cc21.js","assets/index.de3edb75.css","assets/hooks.module.0b80d235.js"])).default,u=await s(this,l).getItem(y),o=u?JSON.parse(u):void 0;this.walletName=((d=o==null?void 0:o.peerMeta)==null?void 0:d.name)||void 0,I(this,a,new r({...this.options,chainId:e,rpc:{...h,...(n=this.options)==null?void 0:n.rpc},session:o||void 0}))}return s(this,a)}async getSigner(){let{chainId:e}=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const[t,i]=await Promise.all([this.getProvider({chainId:e}),this.getAccount()]);return new P(t,e).getSigner(i)}async isAuthorized(){try{return!!await this.getAccount()}catch{return!1}}async switchChain(e){var d;const t=await this.getProvider(),i=N(e);try{return await Promise.race([t.request({method:"wallet_switchEthereumChain",params:[{chainId:i}]}),new Promise(n=>this.on("change",h=>{let{chain:r}=h;(r==null?void 0:r.id)===e&&n(e)}))]),(d=this.chains.find(n=>n.chainId===e))!=null?d:{chainId:e,name:`Chain ${i}`,network:`${i}`,nativeCurrency:{name:"Ether",decimals:18,symbol:"ETH"},rpc:[""],shortName:"eth",chain:"ETH",slug:"ethereum",testnet:!1}}catch(n){const h=typeof n=="string"?n:n==null?void 0:n.message;if(/user rejected request/i.test(h))throw new U(n);const r=this.chains.find(u=>u.chainId===e);if(!r)throw new E(`Chain ${e} is not added in the list of supported chains`);if(console.log({chain:r}),/Unrecognized chain ID/i.test(h)){this.emit("message",{type:"add_chain"});const u=this.getBlockExplorerUrls(r);return await t.request({method:"wallet_addEthereumChain",params:[{chainId:i,chainName:r.name,nativeCurrency:r.nativeCurrency,rpcUrls:r.rpc,blockExplorerUrls:u}]}),r}else throw new E(n)}}async setupListeners(){!s(this,a)||(s(this,a).on("accountsChanged",this.onAccountsChanged),s(this,a).on("chainChanged",this.onChainChanged),s(this,a).on("disconnect",this.onDisconnect),s(this,a).on("message",this.onMessage),s(this,a).on("switchChain",this.onSwitchChain),s(this,a).on("display_uri",this.onDisplayUri),s(this,a).on("call_request_sent",this.onRequestSent))}}async function W(){var t,i;const p=(t=s(this,a))==null?void 0:t.connector.session;this.walletName=((i=p==null?void 0:p.peerMeta)==null?void 0:i.name)||"";const e=JSON.stringify(p);s(this,l).setItem(y,e)}function k(){!s(this,a)||(s(this,a).removeListener("accountsChanged",this.onAccountsChanged),s(this,a).removeListener("chainChanged",this.onChainChanged),s(this,a).removeListener("disconnect",this.onDisconnect),s(this,a).removeListener("message",this.onMessage),s(this,a).removeListener("switchChain",this.onSwitchChain),s(this,a).removeListener("display_uri",this.onDisplayUri),s(this,a).removeListener("call_request_sent",this.onRequestSent))}export{x as WalletConnectV1Connector};