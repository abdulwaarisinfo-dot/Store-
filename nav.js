/* STUDIO 01: mobile menu and working search for every page except the home page (which has its own).
   Needs data.js loaded first for live suggestions; the search form still works without it. */
(function(){
 const header=document.querySelector(".header");if(!header)return;
 const css=document.createElement("style");
 css.textContent=`
 .nsearch{position:absolute;left:0;right:0;top:100%;background:var(--paper);border-bottom:1px solid var(--line);padding:20px var(--edge,var(--gutter)) 28px;z-index:6;max-height:calc(100vh - 72px);overflow:auto}
 .nsearch[hidden],.nmenu[hidden],.nmenu-b[hidden]{display:none}
 .nsearch>div{max-width:1600px;margin:0 auto}
 .nsearch input{width:100%;border:0;border-bottom:1px solid var(--ink);background:transparent;border-radius:0;outline:0;font:400 clamp(24px,3vw,36px) var(--serif);letter-spacing:-.02em;padding:8px 0 12px;color:var(--ink);-webkit-appearance:none}
 .nsearch input:focus{border-bottom-width:2px;padding-bottom:11px}
 .ns-res{margin-top:16px}
 .ns-hint{color:var(--muted);font-size:14px;margin:0}.ns-hint a{color:var(--ink)}
 .ns-row{display:grid;grid-template-columns:48px 1fr auto;gap:16px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line);text-decoration:none;color:var(--ink);font-size:15px}
 .ns-row:hover b{text-decoration:underline;text-underline-offset:3px}
 .ns-row img{width:48px;height:60px;object-fit:cover;background:var(--sand);display:block}
 .ns-row b{font-weight:400}.ns-row small{display:block;color:var(--muted);font-size:13px}
 .ns-all{display:inline-block;margin-top:16px;font-size:14px;color:var(--ink)}
 .nmenu-b{position:fixed;inset:0;background:rgba(23,23,21,.3);z-index:50}
 .nmenu{position:fixed;left:0;top:0;height:100%;width:min(360px,88%);background:var(--paper);z-index:51;padding:24px;display:flex;flex-direction:column}
 .nmenu-h{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:16px}
 .nmenu-h h2{font:400 26px var(--serif);margin:0}.nmenu-h button{border:0;background:none;font-size:26px;width:44px;height:44px;color:var(--ink)}
 .nmenu nav{display:grid;align-content:start;gap:2px;padding:18px 0;overflow:auto}
 .nmenu nav a,.nmenu nav button{border:0;background:none;text-align:left;padding:11px 0;font:400 26px var(--serif);letter-spacing:-.02em;text-decoration:none;color:var(--ink);cursor:pointer}
 .nmenu nav a[aria-current=page]{text-decoration:underline;text-underline-offset:6px}
 .nmenu nav .sm{font:400 15px var(--sans);letter-spacing:0;color:var(--muted);padding:8px 0}
 .nmenu nav hr{border:0;border-top:1px solid var(--line);margin:14px 0 8px;width:100%}`;
 document.head.appendChild(css);
 const here=location.pathname.split("/").pop()||"index.html";
 const mk=(tag,attrs,html)=>{const e=document.createElement(tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(html!=null)e.innerHTML=html;return e};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

 /* ----- search ----- */
 const right=header.querySelector(".nav-right");
 const sb=mk("button",{type:"button",class:"utility",id:"navSearchBtn","aria-expanded":"false","aria-controls":"navSearch"},"Search");
 if(right)right.insertBefore(sb,right.firstChild);
 const panel=mk("div",{class:"nsearch",id:"navSearch",hidden:""},'<div><form role="search" action="collection.html" method="get"><input type="search" name="q" id="navQ" placeholder="Search the collection" aria-label="Search products" autocomplete="off" maxlength="60"></form><div class="ns-res" id="navRes" aria-live="polite"></div></div>');
 header.appendChild(panel);
 const q=panel.querySelector("#navQ"),res=panel.querySelector("#navRes");
 const live=typeof products!=="undefined"&&typeof searchMatch==="function";
 function hint(){res.innerHTML='<p class="ns-hint">Try “tee”, “sneaker”, “sage” or “sale”, or browse <a href="collection.html?c=Men">Men</a>, <a href="collection.html?c=Women">Women</a> and <a href="collection.html?c=Accessories">Accessories</a>.</p>'}
 function suggest(){
  const v=q.value.trim();if(!v){hint();return}
  if(!live){res.innerHTML="";return}
  const list=products.filter(p=>searchMatch(p,v));
  if(!list.length){res.innerHTML='<p class="ns-hint">No pieces match “'+esc(v)+'”. Try another word, or browse <a href="collection.html?c=All">all products</a>.</p>';return}
  res.innerHTML=list.slice(0,5).map(p=>'<a class="ns-row" href="product.html?id='+p.id+'"><img src="'+p.img+'" alt=""><span><b>'+esc(p.name)+'</b><small>'+esc(CATS[p.category].title)+'</small></span><span>'+fmtMoney(p.price)+'</span></a>').join("")+
   '<a class="ns-all" href="collection.html?q='+encodeURIComponent(v)+'">See all '+list.length+(list.length===1?' result':' results')+'</a>';
 }
 function openSearch(){panel.hidden=false;sb.setAttribute("aria-expanded","true");hint();q.focus()}
 function closeSearch(){panel.hidden=true;sb.setAttribute("aria-expanded","false")}
 sb.addEventListener("click",()=>panel.hidden?openSearch():closeSearch());
 q.addEventListener("input",suggest);
 panel.querySelector("form").addEventListener("submit",e=>{if(!q.value.trim()){e.preventDefault();q.focus()}});
 document.addEventListener("click",e=>{if(!panel.hidden&&!header.contains(e.target)&&!e.target.closest(".nmenu"))closeSearch()});

 /* ----- mobile menu ----- */
 const ib=header.querySelector(".icon-btn");
 const mb=mk("button",{type:"button",class:"icon-btn","aria-label":"Open menu","aria-controls":"navMenu","aria-expanded":"false"},'<svg viewBox="0 0 24 24"><path d="M3 8h18M3 16h18"/></svg>');
 if(ib)ib.replaceWith(mb);else header.insertBefore(mb,header.querySelector(".brand"));
 const cur=(href)=>(href.split("#")[0]===here||href.split("#")[0]===here+location.search)?' aria-current="page"':"";
 const link=(h,t)=>'<a href="'+h+'"'+cur(h)+'>'+t+'</a>';
 const back=mk("div",{class:"nmenu-b",hidden:""});
 const menu=mk("aside",{class:"nmenu",id:"navMenu",role:"dialog","aria-modal":"true","aria-label":"Menu",hidden:""},
  '<div class="nmenu-h"><h2>Menu</h2><button type="button" aria-label="Close menu" id="nmClose">×</button></div><nav>'+
  link("index.html","Home")+link("collection.html?c=Men","Men")+link("collection.html?c=Women","Women")+link("collection.html?c=Accessories","Accessories")+link("collection.html?c=All","All products")+
  '<button type="button" id="nmSearch">Search</button><hr>'+
  '<a class="sm" href="info.html#about">About</a><a class="sm" href="info.html#shipping">Shipping and returns</a><a class="sm" href="info.html#contact">Contact</a></nav>');
 document.body.append(back,menu);
 let last=null;
 function openMenu(){last=document.activeElement;back.hidden=false;menu.hidden=false;mb.setAttribute("aria-expanded","true");menu.querySelector("#nmClose").focus()}
 function closeMenu(){back.hidden=true;menu.hidden=true;mb.setAttribute("aria-expanded","false");if(last&&last.focus)last.focus()}
 mb.addEventListener("click",openMenu);back.addEventListener("click",closeMenu);
 menu.querySelector("#nmClose").addEventListener("click",closeMenu);
 menu.querySelector("#nmSearch").addEventListener("click",()=>{closeMenu();openSearch()});
 document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){if(!menu.hidden)closeMenu();else if(!panel.hidden){closeSearch();sb.focus()}}
  if(e.key==="Tab"&&!menu.hidden){const f=[...menu.querySelectorAll("button,a[href]")];const a=f[0],z=f[f.length-1];
   if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
 });
})();
