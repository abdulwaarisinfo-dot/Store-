/* STUDIO 01 bag drawer for collection and product pages. Same cart storage as the home page. */
(function(){
 const LS="studio01_cart_v1",MAXQ=10;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const money=n=>"£"+n.toFixed(0);
 function load(){try{const a=JSON.parse(localStorage.getItem(LS)||"[]");return Array.isArray(a)?a.filter(x=>x&&x.key&&x.qty>0&&isFinite(x.price)):[]}catch(e){return[]}}
 let cart=load(),lastFocus=null;
 const save=()=>{try{localStorage.setItem(LS,JSON.stringify(cart))}catch(e){}};
 const wrap=document.createElement("div");
 wrap.innerHTML='<div class="drawer-backdrop" id="bagBackdrop"></div><aside class="drawer" id="bagDrawer" role="dialog" aria-modal="true" aria-labelledby="bagTitle"><div class="drawer-head"><h2 id="bagTitle">Bag</h2><button type="button" class="close" id="bagClose" aria-label="Close bag">×</button></div><div class="drawer-content" id="bagItems"></div><div class="drawer-foot"><div class="subtotal"><span>Subtotal</span><b id="bagSub">£0</b></div><a class="checkout" id="bagCheckout" href="checkout.html">CHECKOUT</a><p class="note">Delivery and discounts are calculated at checkout. This is a demo store.</p></div></aside>';
 document.body.append(...wrap.children);
 const $=id=>document.getElementById(id),drawer=$("bagDrawer"),back=$("bagBackdrop");
 function render(){
  const n=cart.reduce((a,x)=>a+x.qty,0),sub=cart.reduce((a,x)=>a+x.qty*x.price,0);
  const c=$("bagCount");if(c)c.textContent="("+n+")";
  $("bagSub").textContent=money(sub);
  const co=$("bagCheckout");co.setAttribute("aria-disabled",n?"false":"true");co.style.opacity=n?"":".4";co.style.pointerEvents=n?"":"none";
  $("bagItems").innerHTML=n?cart.map((x,i)=>`<div class="cart-row"><img src="${esc(x.img||"")}" alt="${esc(x.name)}"><div><p>${esc(x.name)}</p><small>${[x.size,x.color].filter(Boolean).map(esc).join(" · ")}</small><div class="qty" style="margin-top:10px"><button type="button" aria-label="Decrease quantity of ${esc(x.name)}" data-q="${i}" data-d="-1">−</button><span>${x.qty}</span><button type="button" aria-label="Increase quantity of ${esc(x.name)}" data-q="${i}" data-d="1">+</button></div></div><div class="cart-price"><span>${money(x.price*x.qty)}</span><button type="button" class="remove" data-r="${i}">Remove</button></div></div>`).join(""):'<p class="empty" style="padding:48px 0;text-align:center;color:var(--muted)">Your bag is empty.</p>';
 }
 function open(){lastFocus=document.activeElement;cart=load();render();drawer.classList.add("open");back.classList.add("open");$("bagClose").focus()}
 function close(){drawer.classList.remove("open");back.classList.remove("open");if(lastFocus&&lastFocus.focus)lastFocus.focus()}
 $("bagItems").addEventListener("click",e=>{
  const q=e.target.closest("[data-q]"),r=e.target.closest("[data-r]");
  if(q){const x=cart[+q.dataset.q];x.qty=Math.max(0,Math.min(MAXQ,x.qty+(+q.dataset.d)));if(!x.qty)cart.splice(+q.dataset.q,1);save();render()}
  if(r){cart.splice(+r.dataset.r,1);save();render()}
 });
 $("bagClose").addEventListener("click",close);back.addEventListener("click",close);
 document.addEventListener("keydown",e=>{
  if(!drawer.classList.contains("open"))return;
  if(e.key==="Escape")close();
  if(e.key==="Tab"){const f=[...drawer.querySelectorAll("button,a[href]")].filter(x=>x.offsetParent&&x.getAttribute("aria-disabled")!=="true");if(!f.length)return;const a=f[0],z=f[f.length-1];
   if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
 });
 window.addEventListener("pageshow",()=>{cart=load();render()});
 window.addEventListener("storage",()=>{cart=load();render()});
 const btn=$("bagBtn");if(btn)btn.addEventListener("click",open);
 window.Bag={open,close,add(line){cart=load();const f=cart.find(x=>x.key===line.key);if(f)f.qty=Math.min(MAXQ,f.qty+line.qty);else cart.push({...line,qty:Math.min(MAXQ,line.qty)});save();render()}};
 render();
})();
