/* STUDIO 01 shared catalogue: used by index, collection and product pages */
const AP=["XS","S","M","L","XL","XXL"],SH=["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11"];
const C=(n,h)=>({n,h});
const products=[
{id:1,name:"The Essential Tee",category:"Men",price:38,old:48,rating:4.8,reviews:124,tag:"New in",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",sizes:AP,colors:[C("Bone","#e8e5de"),C("Black","#252522"),C("Sage","#8b9b91")],out:["XL|Black","XS|Sage","XXL|Bone","XXL|Black"]},
{id:2,name:"Relaxed Cotton Shirt",category:"Women",price:64,old:null,rating:4.9,reviews:86,tag:"New in",img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",sizes:AP.slice(0,5),colors:[C("Bone","#e8e5de"),C("Sand","#b7a58f")],out:["M|Sand","XS|Bone"]},
{id:3,name:"Everyday Overshirt",category:"Men",price:78,old:null,rating:4.7,reviews:92,tag:"",img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",sizes:AP.slice(1),colors:[C("Sage","#8b9b91"),C("Rust","#b66e50"),C("Stone","#ded8cc")],out:["S|Rust","XXL|Rust","M|Stone"]},
{id:4,name:"The Modern Trouser",category:"Women",price:92,old:115,rating:4.8,reviews:71,tag:"Sale",img:"https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=900&q=85",sizes:AP.slice(0,5),colors:[C("Black","#292a28"),C("Taupe","#c5b9a8")],out:["XS|Black","L|Taupe"]},
{id:5,name:"Relaxed Weekend Set",category:"Men",price:88,old:null,rating:4.6,reviews:58,tag:"",img:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=85",sizes:AP.slice(1),colors:[C("Oat","#d7c9b8"),C("Olive","#77776d")],out:["L|Oat","S|Olive"]},
{id:6,name:"Sculpted Everyday Top",category:"Women",price:45,old:null,rating:4.9,reviews:103,tag:"New in",img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",sizes:AP.slice(0,4),colors:[C("Black","#242522"),C("Ivory","#eeeae2")],out:["S|Ivory"]},
{id:7,name:"Canvas Carryall",category:"Accessories",price:32,old:null,rating:4.7,reviews:44,tag:"",img:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85",sizes:[],colors:[C("Tan","#b6a58d"),C("Charcoal","#34352f")],out:[]},
{id:8,name:"Minimal Leather Sneaker",category:"Accessories",price:110,old:null,rating:4.8,reviews:67,tag:"",img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",sizes:SH,colors:[C("Bone","#e8e5de"),C("Greige","#b8b3a9")],out:["UK 8|Bone","UK 11|Greige"]}
];

const CATS={
 All:{title:"All products",blurb:"Collection 01 in full: well-cut essentials in natural, neutral tones.",img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80"},
 Men:{title:"Menswear",blurb:"Everyday menswear from Collection 01, cut to be worn often.",img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1400&q=80"},
 Women:{title:"Womenswear",blurb:"Everyday womenswear from Collection 01, chosen to work with what you already own.",img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1400&q=80"},
 Accessories:{title:"Accessories",blurb:"A few considered accessories from Collection 01.",img:"https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=80"}
};
const escHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmtMoney=n=>"£"+n.toFixed(0);
/* product card used on collection and product pages */
function shopCard(p){
 const tag=p.old?'<span class="tag">-'+Math.round((1-p.price/p.old)*100)+'%</span>':p.tag==="New in"?'<span class="tag">New in</span>':"";
 return `<article class="product"><div class="photo-wrap"><a class="photo-link" href="product.html?id=${p.id}" aria-label="View ${escHTML(p.name)}"><img src="${p.img}" srcset="${imgSet(p.img)}" sizes="${IMG_SIZES}" alt="${escHTML(p.name)}" loading="lazy" decoding="async"></a>${tag}</div>
 <div class="product-meta"><div class="rating">★ ${p.rating.toFixed(1)} <span>(${p.reviews})</span></div><p class="product-name"><a href="product.html?id=${p.id}">${escHTML(p.name)}</a></p><p class="price">${fmtMoney(p.price)} ${p.old?`<del class="was">${fmtMoney(p.old)}</del>`:""}</p>
 <div class="swatches">${p.colors.map(c=>`<span class="swatch" style="background:${c.h}" title="${escHTML(c.n)}"></span>`).join("")}</div></div></article>`;
}

/* search: every word typed must match the start of a word in name, collection, colour, tag or "sale" */
function searchMatch(p,q){
 const words=[p.name,p.category,CATS[p.category].title,p.tag||"",p.old?"sale":"",...p.colors.map(c=>c.n)].join(" ").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
 const t=String(q).toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
 return t.length>0&&t.every(x=>words.some(w=>w.startsWith(x)));
}

/* responsive photos: same crop, three widths, so phones download far less */
function imgSet(u){return [400,600,900].map(w=>{const x=new URL(u),w0=+x.searchParams.get("w"),h0=x.searchParams.get("h");x.searchParams.set("w",w);if(h0)x.searchParams.set("h",Math.round(w*h0/w0));return x.href+" "+w+"w"}).join(", ")}
const IMG_SIZES="(max-width:700px) 50vw, (max-width:1100px) 33vw, 25vw";
/* if a photo cannot load, show the clean sand block instead of a broken-image icon */
document.addEventListener("error",e=>{const t=e.target;if(t&&t.tagName==="IMG")t.style.visibility="hidden"},true);
