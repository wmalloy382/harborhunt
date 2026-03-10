import { useState, useEffect, useRef } from "react";

const LOGO = "data:image/png;base64,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";

const BROKER = {
  name: "William Malloy", initials: "WM", brokerage: "Veteran Yacht Sales",
  title: "Yacht Broker & Advisor", tagline: "Anchored in Experience. Sailing You Home.",
  phone: "(843) 633-3133", email: "wmalloy@veteranyachtsales.com",
  location: "Charleston, SC", color: "#1e40af",
};

// ── TRACKING ENGINE (in production: syncs to Supabase/Firebase in real time) ─
const SESSION = {
  clientName: "Guest Browser",
  viewLog:  [],   // { boatId, title, price, type, views, firstViewed, lastViewed, totalTime }
  searchLog:[],   // { filters, time }
  saveLog:  [],   // { boatId, title, price, action, time }
  sendLog:  [],   // { url, note, time }
};
function trackView(boat, ms) {
  const e = SESSION.viewLog.find(v => v.boatId === boat.id);
  if (e) { e.views++; e.lastViewed = new Date(); e.totalTime += ms; }
  else SESSION.viewLog.push({ boatId:boat.id, title:boat.title, price:boat.price, type:boat.type, views:1, firstViewed:new Date(), lastViewed:new Date(), totalTime:ms });
}
function trackSearch(f) { SESSION.searchLog.push({ filters:{...f}, time:new Date() }); }
function trackSave(boat, saved) { SESSION.saveLog.push({ boatId:boat.id, title:boat.title, price:boat.price, action:saved?"saved":"unsaved", time:new Date() }); }
function trackSend(url, note) { SESSION.sendLog.push({ url, note, time:new Date() }); }
function heatScore(id) {
  const v = SESSION.viewLog.find(x=>x.boatId===id);
  const s = SESSION.saveLog.filter(x=>x.boatId===id&&x.action==="saved").length;
  if (!v) return 0;
  return (v.views*10)+(s*30)+Math.min(v.totalTime/1000,60);
}

const VYS_LISTINGS = [
  { id:"v1", title:"54\' Kufner 2024 — Sea Wave",     price:695000, length:54, year:2024, type:"Sailing",     location:"Annapolis, MD",      condition:"New",  photo:"https://cdn.yachtbroker.org/images/medium/2826865_0d9abd19_0.jpg",  url:"https://veteranyachtsales.com/yacht-details-2/?id=86575&vessel=2826865" },
  { id:"v2", title:"54\' Shannon 1984 — Conmara",     price:399000, length:54, year:1984, type:"Sailing",     location:"Annapolis, MD",      condition:"Used", photo:"https://cdn.yachtbroker.org/images/medium/2843002_e681821e_37.jpg",  url:"https://veteranyachtsales.com/yacht-details-2/?id=86575&vessel=2843002" },
  { id:"v3", title:"52\' DeFever 1982 — Noelani",     price:250000, length:52, year:1982, type:"Motor Yacht", location:"Patuxent River, MD",  condition:"Used", photo:"https://cdn.yachtbroker.org/images/medium/2846231_4e1dff06_0.jpeg", url:"https://veteranyachtsales.com/yacht-details-2/?id=87736&vessel=2846231" },
  { id:"v4", title:"44\' Hylas 1990 — Atlantis",      price:99000,  length:44, year:1990, type:"Sailing",     location:"Tracys Landing, MD", condition:"Used", photo:"https://cdn.yachtbroker.org/images/medium/2823417_63deb08b_34.jpg",  url:"https://veteranyachtsales.com/yacht-details-2/?id=86564&vessel=2823417" },
  { id:"v5", title:"42\' Catalina 2023 — Age Gap",    price:409000, length:42, year:2023, type:"Sailing",     location:"Tracys Landing, MD", condition:"Used", photo:"https://cdn.yachtbroker.org/images/medium/2830604_752f080c_0.jpg",   url:"https://veteranyachtsales.com/yacht-details-2/?id=87738&vessel=2830604" },
  { id:"v6", title:"42\' Island Packet 2000 — Lastochka", price:284900, length:42, year:2000, type:"Sailing", location:"Tracys Landing, MD", condition:"Used", photo:"https://cdn.yachtbroker.org/images/medium/2836922_746c7382_1.jpg",  url:"https://veteranyachtsales.com/yacht-details-2/?id=86575&vessel=2836922" },
  { id:"v7", title:"40\' Viking 1973 — Prime Time",   price:69900,  length:40, year:1973, type:"Sport Fish",  location:"Tracys Landing, MD", condition:"Used", photo:"https://cdn.yachtbroker.org/images/medium/2828934_518e59f1_31.jpg",  url:"https://veteranyachtsales.com/yacht-details-2/?id=86564&vessel=2828934" },
  { id:"v8", title:"36\' Carver 2005 — Pura Vida",    price:95000,  length:36, year:2005, type:"Motor Yacht", location:"Charleston, SC",      condition:"Used", photo:"https://cdn.yachtbroker.org/images/medium/2847123_513e2c61_2.jpg",   url:"https://veteranyachtsales.com/yacht-details-2/?id=87738&vessel=2847123" },
  { id:"v9", title:"35\' J Boats 2003 — Patriot VII", price:110000, length:35, year:2003, type:"Sailing",     location:"Annapolis, MD",       condition:"Used", photo:"https://cdn.yachtbroker.org/images/medium/2846474_261e0cc7_76.jpg",  url:"https://veteranyachtsales.com/yacht-details-2/?id=86575&vessel=2846474" },
];

const PLATFORMS = [
  { id:"yachtworld", name:"YachtWorld",  icon:"🌊", color:"#0369a1", desc:"World\'s largest yacht marketplace", url:"https://www.yachtworld.com/boats-for-sale/" },
  { id:"boatscom",   name:"Boats.com",   icon:"🚢", color:"#047857", desc:"Thousands of power & sail listings",  url:"https://www.boats.com/boats-for-sale/" },
  { id:"boattrader", name:"BoatTrader",  icon:"🤝", color:"#b45309", desc:"120,000+ boats nationwide",           url:"https://www.boattrader.com/boats/" },
];

const TYPE_ICONS = { Sailing:"⛵", "Motor Yacht":"🛥️", "Sport Fish":"🎣" };
const fmt = p => "$" + p.toLocaleString();
function minsAgo(ms) { const m = Math.floor(ms/60000); return m < 1 ? "just now" : m < 60 ? `${m}m` : `${Math.floor(m/60)}h`; }

function filterSummary(f) {
  return [
    f.type !== "All Types" ? f.type : null,
    f.minPrice && f.maxPrice ? `${fmt(+f.minPrice)}–${fmt(+f.maxPrice)}` : f.minPrice ? `Over ${fmt(+f.minPrice)}` : f.maxPrice ? `Under ${fmt(+f.maxPrice)}` : null,
    f.minLength && f.maxLength ? `${f.minLength}–${f.maxLength}ft` : f.minLength ? `${f.minLength}ft+` : f.maxLength ? `Under ${f.maxLength}ft` : null,
    f.minYear && f.maxYear ? `${f.minYear}–${f.maxYear}` : f.minYear ? `${f.minYear}+` : f.maxYear ? `Pre-${f.maxYear}` : null,
    f.condition !== "All" ? f.condition : null,
  ].filter(Boolean);
}

// ── HEAT BADGE ───────────────────────────────────────────────────────────────
function HeatBadge({ score }) {
  if (score <= 0) return null;
  const hot = score >= 50;
  const warm = score >= 20;
  return (
    <div style={{ position:"absolute", top:10, left:10, background:hot?"#ef4444":warm?"#f97316":"#94a3b8", color:"#fff", fontSize:9, fontWeight:700, padding:"3px 8px", borderRadius:99, display:"flex", alignItems:"center", gap:4, zIndex:2 }}>
      {hot?"🔥":warm?"🌡":"👁"} {hot?"HOT":warm?"WARM":"VIEWED"}
    </div>
  );
}

// ── BOAT CARD ─────────────────────────────────────────────────────────────────
function BoatCard({ boat, saved, onSave, onTap, viewCount }) {
  const [imgOk, setImgOk] = useState(true);
  const score = heatScore(boat.id);
  return (
    <div onClick={onTap} style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.09)", marginBottom:14, position:"relative", cursor:"pointer", border:`1px solid ${score>=50?"#fca5a5":score>=20?"#fdba74":"#f1f5f9"}` }}>
      <div style={{ height:190, background:"linear-gradient(135deg,#0c1f3d,#1e40af)", position:"relative", overflow:"hidden" }}>
        {imgOk && boat.photo
          ? <img src={boat.photo} alt={boat.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={()=>setImgOk(false)} />
          : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:70 }}>{TYPE_ICONS[boat.type]||"🚢"}</div>}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#1e40af,#93c5fd)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:70, background:"linear-gradient(transparent,rgba(0,0,0,0.6))" }} />
        <HeatBadge score={score} />
        <div style={{ position:"absolute", bottom:12, left:14, color:"#fff", fontSize:18, fontWeight:700 }}>{fmt(boat.price)}</div>
        <button onClick={e=>{ e.stopPropagation(); onSave(boat.id); }} style={{ position:"absolute", top:10, right:10, width:36, height:36, borderRadius:"50%", background:saved?"#e11d48":"rgba(0,0,0,0.4)", border:"none", color:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2 }}>
          {saved?"♥":"♡"}
        </button>
        <div style={{ position:"absolute", top:10, right:54, background:boat.condition==="New"?"rgba(16,185,129,0.9)":"rgba(0,0,0,0.45)", color:"#fff", fontSize:9, padding:"3px 8px", borderRadius:99 }}>{boat.condition}</div>
        {viewCount > 1 && <div style={{ position:"absolute", bottom:12, right:14, background:"rgba(0,0,0,0.5)", color:"#fff", fontSize:10, padding:"2px 8px", borderRadius:99 }}>👁 {viewCount}x</div>}
      </div>
      <div style={{ padding:"12px 16px 14px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:5, lineHeight:1.3 }}>{boat.title}</div>
        <div style={{ display:"flex", gap:12, fontSize:11, color:"#94a3b8" }}>
          <span>📍 {boat.location}</span><span>📏 {boat.length}ft</span><span>📅 {boat.year}</span>
        </div>
      </div>
    </div>
  );
}

// ── DETAIL VIEW with time tracking ───────────────────────────────────────────
function DetailView({ boat, saved, onSave, onBack, onInquiry }) {
  const enterTime = useRef(Date.now());
  const [imgOk, setImgOk] = useState(true);
  const score = heatScore(boat.id);
  const viewData = SESSION.viewLog.find(v => v.boatId === boat.id);

  useEffect(() => {
    return () => {
      const ms = Date.now() - enterTime.current;
      trackView(boat, ms);
    };
  }, [boat]);

  return (
    <div style={{ animation:"fadeUp 0.3s ease" }}>
      <div style={{ height:260, position:"relative", overflow:"hidden", background:"linear-gradient(135deg,#0c1f3d,#1e40af)" }}>
        {imgOk && boat.photo && <img src={boat.photo} alt={boat.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={()=>setImgOk(false)} />}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(transparent 40%,rgba(0,0,0,0.7))" }} />
        <button onClick={onBack} style={{ position:"absolute", top:14, left:14, width:36, height:36, borderRadius:"50%", background:"rgba(0,0,0,0.45)", border:"none", color:"#fff", fontSize:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>
        <button onClick={()=>onSave(boat.id)} style={{ position:"absolute", top:14, right:14, width:36, height:36, borderRadius:"50%", background:saved?"#e11d48":"rgba(0,0,0,0.45)", border:"none", color:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>{saved?"♥":"♡"}</button>
        <div style={{ position:"absolute", bottom:16, left:16 }}>
          <div style={{ fontSize:20, fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:2 }}>{boat.title}</div>
          <div style={{ fontSize:26, fontWeight:700, color:"#93c5fd" }}>{fmt(boat.price)}</div>
        </div>
        {score >= 20 && (
          <div style={{ position:"absolute", top:14, left:"50%", transform:"translateX(-50%)", background:score>=50?"#ef4444":"#f97316", color:"#fff", fontSize:10, padding:"3px 12px", borderRadius:99, fontWeight:700 }}>
            {score>=50?"🔥 You keep coming back to this one!":"🌡 You\'ve viewed this a few times"}
          </div>
        )}
      </div>
      <div style={{ padding:18 }}>
        {viewData && (
          <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", gap:16, fontSize:11, color:"#64748b" }}>
            <span>👁 Viewed <strong>{viewData.views}x</strong></span>
            <span>⏱ ~{Math.round(viewData.totalTime/1000)}s total</span>
            <span>🕐 First: {viewData.firstViewed.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
          {[["📍 Location",boat.location],["⛵ Type",boat.type],["📏 Length",`${boat.length} ft`],["📅 Year",boat.year],["✨ Condition",boat.condition]].map(([k,v])=>(
            <div key={k} style={{ background:"#fff", borderRadius:10, padding:"10px 14px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize:10, color:"#94a3b8", marginBottom:3 }}>{k}</div>
              <div style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{v}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>onInquiry({ prefill:`Hi William,\n\nI\'m interested in the ${boat.title} listed at ${fmt(boat.price)}. Can we arrange a showing?`, color:"#1e40af" })} style={{ width:"100%", padding:"15px", background:"linear-gradient(135deg,#1e40af,#1e3a8a)", border:"none", borderRadius:14, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", marginBottom:10 }}>📞 Request a Showing</button>
        <a href={boat.url} target="_blank" rel="noreferrer" style={{ display:"block", width:"100%", padding:"13px", background:"#fff", border:"2px solid #1e40af", borderRadius:14, color:"#1e40af", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit", textDecoration:"none", textAlign:"center" }}>🔗 Full Listing on VYS</a>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function HarborHunt() {
  const [tab, setTab]             = useState("home");
  const [saved, setSaved]         = useState([]);
  const [selected, setSelected]   = useState(null);
  const [inquiry, setInquiry]     = useState(null);
  const [loading, setLoading]     = useState(false);
  const [searched, setSearched]   = useState(false);
  const [results, setResults]     = useState([]);
  const [pastedUrl, setPastedUrl] = useState("");
  const [urlNote, setUrlNote]     = useState("");
  const [viewCounts, setViewCounts] = useState({});
  const [, forceUpdate]           = useState(0);
  const [filters, setFilters]     = useState({ type:"All Types", minPrice:"", maxPrice:"", minLength:"", maxLength:"", minYear:"", maxYear:"", condition:"All" });

  const ff = (k,v) => setFilters(p=>({...p,[k]:v}));

  function toggleSave(id) {
    const boat = VYS_LISTINGS.find(b=>b.id===id);
    const nowSaved = !saved.includes(id);
    setSaved(s => nowSaved ? [...s,id] : s.filter(x=>x!==id));
    if (boat) trackSave(boat, nowSaved);
  }

  function openDetail(boat) {
    setSelected(boat);
    setTab("detail");
    setViewCounts(prev => ({ ...prev, [boat.id]: (prev[boat.id]||0)+1 }));
  }

  function doSearch() {
    setLoading(true);
    trackSearch(filters);
    setTimeout(()=>{
      const r = VYS_LISTINGS.filter(b=>{
        if (filters.type!=="All Types" && b.type!==filters.type) return false;
        if (filters.minPrice && b.price < +filters.minPrice) return false;
        if (filters.maxPrice && b.price > +filters.maxPrice) return false;
        if (filters.minLength && b.length < +filters.minLength) return false;
        if (filters.maxLength && b.length > +filters.maxLength) return false;
        if (filters.minYear && b.year < +filters.minYear) return false;
        if (filters.maxYear && b.year > +filters.maxYear) return false;
        if (filters.condition!=="All" && b.condition!==filters.condition) return false;
        return true;
      });
      setResults(r.sort((a,b)=>b.price-a.price));
      setSearched(true);
      setLoading(false);
      setTab("results");
    }, 900);
  }

  const detected = (url) => {
    if (url.includes("yachtworld.com")) return { label:"🌊 YachtWorld detected", color:"#0369a1" };
    if (url.includes("boats.com"))      return { label:"🚢 Boats.com detected",   color:"#047857" };
    if (url.includes("boattrader.com")) return { label:"🤝 BoatTrader detected",  color:"#b45309" };
    if (url.includes("veteranyachtsales.com")) return { label:"⚓ VYS listing",   color:"#1e40af" };
    if (url.length > 10)                return { label:"🔗 URL ready to send",    color:"#64748b" };
    return null;
  };
  const det = detected(pastedUrl);

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", background:"#e8edf2", padding:"20px 0" }}>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing:border-box; }
        input,select,textarea { font-family:inherit; }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      <div style={{ width:390, height:780, background:"#f0f4f8", borderRadius:44, overflow:"hidden", boxShadow:"0 30px 80px rgba(0,0,0,0.25), 0 0 0 10px #1a1a1a", position:"relative", display:"flex", flexDirection:"column" }}>

        {/* Status bar */}
        <div style={{ background:"#0c1f3d", padding:"12px 24px 8px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>9:41</span>
          <div style={{ width:100, height:18, background:"#000", borderRadius:12 }} />
          <span style={{ fontSize:11, color:"#fff" }}>●●●</span>
        </div>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#0c1f3d,#1e3a8a)", padding:"10px 20px 14px", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:18 }}>⚓</span>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:"#93c5fd" }}>HarborHunt</div>
                <div style={{ fontSize:9, color:"#475569", letterSpacing:"0.1em", textTransform:"uppercase" }}>by Veteran Yacht Sales</div>
              </div>
            </div>
            <div style={{ background:"#fff", borderRadius:8, padding:"6px 10px" }}>
              <img src={LOGO} alt="VYS" style={{ height:28, width:"auto", display:"block" }} />
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex:1, overflowY:"auto" }}>

          {/* HOME */}
          {tab==="home" && (
            <div style={{ animation:"fadeUp 0.35s ease" }}>
              <div style={{ background:"linear-gradient(135deg,#1e3a8a,#0c1f3d)", margin:"16px 16px 0", borderRadius:18, padding:"18px 20px", color:"#fff" }}>
                <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:14 }}>
                  <div style={{ width:50, height:50, borderRadius:"50%", background:"linear-gradient(135deg,#93c5fd,#1e40af)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:700, border:"2px solid rgba(255,255,255,0.2)" }}>WM</div>
                  <div>
                    <div style={{ fontSize:10, color:"#93c5fd", letterSpacing:"0.1em", textTransform:"uppercase" }}>Your Agent</div>
                    <div style={{ fontSize:17, fontWeight:700 }}>{BROKER.name}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", fontStyle:"italic" }}>{BROKER.tagline}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>setInquiry({ prefill:"", color:"#1e40af" })} style={{ flex:1, padding:"11px", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>📩 Message</button>
                  <a href={`tel:${BROKER.phone}`} style={{ flex:1, padding:"11px", background:"#1e40af", borderRadius:10, color:"#fff", fontSize:12, fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>📞 Call William</a>
                </div>
              </div>
              <div style={{ padding:"16px 16px 0" }}>
                <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:"#94a3b8", marginBottom:12 }}>Quick Actions</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
                  {[["🔍","Search","search"],["📌","Send a Listing","send"],["♥","Saved","saved"],["🌊","Browse Market","market"]].map(([icon,label,t])=>(
                    <button key={t} onClick={()=>setTab(t)} style={{ padding:"15px 12px", background:"#fff", border:"1px solid #f1f5f9", borderRadius:14, cursor:"pointer", fontFamily:"inherit", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:26 }}>{icon}</span>
                      <span style={{ fontSize:12, fontWeight:600, color:"#334155" }}>{label}</span>
                    </button>
                  ))}
                </div>
                <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:"#94a3b8", marginBottom:12 }}>Featured Listing</div>
                <BoatCard boat={VYS_LISTINGS[0]} saved={saved.includes(VYS_LISTINGS[0].id)} onSave={toggleSave} onTap={()=>openDetail(VYS_LISTINGS[0])} viewCount={viewCounts[VYS_LISTINGS[0].id]||0} />
              </div>
            </div>
          )}

          {/* SEARCH */}
          {tab==="search" && (
            <div style={{ padding:16, animation:"fadeUp 0.35s ease" }}>
              <div style={{ fontSize:20, fontWeight:700, marginBottom:4 }}>Find Your Vessel</div>
              <div style={{ fontSize:13, color:"#64748b", marginBottom:18 }}>Search William\'s inventory</div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div>
                  <label style={lbl}>Boat Type</label>
                  <select value={filters.type} onChange={e=>ff("type",e.target.value)} style={sel}>
                    {["All Types","Sailing","Motor Yacht","Sport Fish"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Price Range</label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <input value={filters.minPrice} onChange={e=>ff("minPrice",e.target.value)} placeholder="Min $" style={inp} />
                    <input value={filters.maxPrice} onChange={e=>ff("maxPrice",e.target.value)} placeholder="Max $" style={inp} />
                  </div>
                </div>
                <div><label style={lbl}>Year Range</label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <input value={filters.minYear} onChange={e=>ff("minYear",e.target.value)} placeholder="From year" style={inp} />
                    <input value={filters.maxYear} onChange={e=>ff("maxYear",e.target.value)} placeholder="To year" style={inp} />
                  </div>
                </div>
                <div><label style={lbl}>Length (ft)</label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                    <input value={filters.minLength} onChange={e=>ff("minLength",e.target.value)} placeholder="Min ft" style={inp} />
                    <input value={filters.maxLength} onChange={e=>ff("maxLength",e.target.value)} placeholder="Max ft" style={inp} />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Condition</label>
                  <select value={filters.condition} onChange={e=>ff("condition",e.target.value)} style={sel}>
                    {["All","New","Used"].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginTop:20 }}>
                <button onClick={()=>setFilters({ type:"All Types", minPrice:"", maxPrice:"", minLength:"", maxLength:"", minYear:"", maxYear:"", condition:"All" })} style={{ padding:"15px 14px", background:"#fff", border:"1px solid #e2e8f0", borderRadius:14, color:"#94a3b8", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>Clear</button>
                <button onClick={doSearch} disabled={loading} style={{ flex:1, padding:"15px", background:loading?"#94a3b8":"linear-gradient(135deg,#1e40af,#1e3a8a)", border:"none", borderRadius:14, color:"#fff", fontSize:15, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  {loading?<><div style={{ width:18,height:18,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin 0.7s linear infinite" }}/>Searching...</>:"⚓ Search Listings"}
                </button>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {tab==="results" && (
            <div style={{ padding:16, animation:"fadeUp 0.35s ease" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <div style={{ fontSize:20, fontWeight:700 }}>Results</div>
                <button onClick={()=>setTab("search")} style={{ fontSize:12, color:"#1e40af", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Edit Filters</button>
              </div>
              {filterSummary(filters).length>0 && (
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:14 }}>
                  {filterSummary(filters).map(p=><span key={p} style={{ fontSize:11, background:"#dbeafe", color:"#1e40af", padding:"3px 10px", borderRadius:99 }}>{p}</span>)}
                </div>
              )}
              {!searched
                ? <div style={{ textAlign:"center", padding:"60px 0" }}><div style={{ fontSize:40, marginBottom:10 }}>⚓</div><button onClick={()=>setTab("search")} style={{ background:"#1e40af", border:"none", borderRadius:12, color:"#fff", padding:"12px 24px", fontSize:14, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Start Searching</button></div>
                : results.length===0
                  ? <div style={{ textAlign:"center", padding:"40px 0" }}>
                      <div style={{ fontSize:36, marginBottom:10 }}>🔭</div>
                      <div style={{ fontSize:14, fontWeight:600, marginBottom:6 }}>No VYS matches</div>
                      <button onClick={()=>setTab("send")} style={{ background:"#1e40af", border:"none", borderRadius:12, color:"#fff", padding:"12px 24px", fontSize:13, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>📌 Ask William to Search</button>
                    </div>
                  : <>
                      <div style={{ fontSize:11, color:"#94a3b8", marginBottom:12 }}>⚓ {results.length} from Veteran Yacht Sales</div>
                      {results.map(boat=><BoatCard key={boat.id} boat={boat} saved={saved.includes(boat.id)} onSave={toggleSave} onTap={()=>openDetail(boat)} viewCount={viewCounts[boat.id]||0} />)}
                      <div style={{ background:"linear-gradient(135deg,#0c1f3d,#1e3a8a)", borderRadius:16, padding:18, marginBottom:16 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:4 }}>Want more options?</div>
                        <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginBottom:12 }}>Browse the full market, send William any listing you like.</div>
                        <button onClick={()=>setTab("market")} style={{ width:"100%", padding:"11px", background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>🌊 Browse Full Market</button>
                      </div>
                    </>
              }
            </div>
          )}

          {/* DETAIL */}
          {tab==="detail" && selected && (
            <DetailView boat={selected} saved={saved.includes(selected.id)} onSave={toggleSave} onBack={()=>setTab("results")} onInquiry={setInquiry} />
          )}

          {/* SEND */}
          {tab==="send" && (
            <div style={{ padding:16, animation:"fadeUp 0.35s ease" }}>
              <div style={{ fontSize:20, fontWeight:700, marginBottom:4 }}>📌 Send to William</div>
              <div style={{ fontSize:13, color:"#64748b", marginBottom:18 }}>Found a boat anywhere? Paste the link — William handles the rest.</div>
              <div style={{ background:"#fff", borderRadius:16, padding:18, boxShadow:"0 2px 10px rgba(0,0,0,0.07)", marginBottom:14 }}>
                <label style={lbl}>Paste Listing URL</label>
                <input type="url" value={pastedUrl} onChange={e=>setPastedUrl(e.target.value)} placeholder="https://www.yachtworld.com/boats/..." style={{ ...inp, marginBottom:8, border:`2px solid ${det?"#1e40af":"#e2e8f0"}` }} />
                {det && <div style={{ fontSize:11, fontWeight:600, color:det.color, background:"#f8fafc", padding:"7px 12px", borderRadius:8, marginBottom:12 }}>✓ {det.label}</div>}
                <label style={lbl}>Notes for William</label>
                <textarea value={urlNote} onChange={e=>setUrlNote(e.target.value)} rows={3} placeholder="e.g. Love this one — what do you think on price?" style={{ width:"100%", padding:"12px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:13, fontFamily:"inherit", resize:"none", outline:"none", marginBottom:14, color:"#334155" }} />
                <button onClick={()=>{ if(!pastedUrl) return; trackSend(pastedUrl,urlNote); setInquiry({ prefill:`Hi William,\n\nI found a listing I\'d love your opinion on:\n\n${pastedUrl}\n\n${urlNote||"Please review and advise!"}`, color:"#1e40af" }); }} style={{ width:"100%", padding:"15px", background:pastedUrl?"linear-gradient(135deg,#1e40af,#1e3a8a)":"#e2e8f0", border:"none", borderRadius:14, color:pastedUrl?"#fff":"#94a3b8", fontSize:14, fontWeight:700, cursor:pastedUrl?"pointer":"not-allowed", fontFamily:"inherit" }}>
                  {pastedUrl?"📩 Send to William":"Paste a URL above to continue"}
                </button>
              </div>
              <div style={{ background:"#fff", borderRadius:14, padding:18, boxShadow:"0 2px 10px rgba(0,0,0,0.07)" }}>
                <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", color:"#94a3b8", marginBottom:12 }}>Open a Marketplace</div>
                {PLATFORMS.map(p=>(
                  <a key={p.id} href={p.url} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:"#f8fafc", borderRadius:12, marginBottom:8, textDecoration:"none", border:"1px solid #f1f5f9" }}>
                    <span style={{ fontSize:20 }}>{p.icon}</span>
                    <div style={{ flex:1 }}><div style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{p.name}</div><div style={{ fontSize:11, color:"#94a3b8" }}>{p.desc}</div></div>
                    <span style={{ color:p.color, fontSize:14 }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* MARKET */}
          {tab==="market" && (
            <div style={{ padding:16, animation:"fadeUp 0.35s ease" }}>
              <div style={{ fontSize:20, fontWeight:700, marginBottom:4 }}>🌊 Browse Market</div>
              <div style={{ fontSize:13, color:"#64748b", marginBottom:18 }}>Browse freely · Send anything you like to William</div>
              {PLATFORMS.map(p=>(
                <div key={p.id} style={{ background:"#fff", borderRadius:16, overflow:"hidden", marginBottom:14, boxShadow:"0 2px 10px rgba(0,0,0,0.07)" }}>
                  <div style={{ height:5, background:p.color }} />
                  <div style={{ padding:"16px 18px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                      <span style={{ fontSize:28 }}>{p.icon}</span>
                      <div><div style={{ fontSize:15, fontWeight:700 }}>{p.name}</div><div style={{ fontSize:11, color:"#94a3b8" }}>{p.desc}</div></div>
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <a href={p.url} target="_blank" rel="noreferrer" style={{ flex:2, padding:"12px", background:p.color, borderRadius:12, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>Browse {p.name} ↗</a>
                      <button onClick={()=>setTab("send")} style={{ flex:1, padding:"12px", background:"#fff", border:"2px solid #1e40af", borderRadius:12, color:"#1e40af", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>📌</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SAVED */}
          {tab==="saved" && (
            <div style={{ padding:16, animation:"fadeUp 0.35s ease" }}>
              <div style={{ fontSize:20, fontWeight:700, marginBottom:4 }}>♥ Saved Boats</div>
              <div style={{ fontSize:13, color:"#64748b", marginBottom:18 }}>{saved.length} boat{saved.length!==1?"s":""} saved</div>
              {saved.length===0
                ? <div style={{ textAlign:"center", padding:"60px 0", color:"#94a3b8" }}>
                    <div style={{ fontSize:40, marginBottom:10 }}>♡</div>
                    <div style={{ fontSize:14, fontWeight:600, marginBottom:12 }}>No saved boats yet</div>
                    <button onClick={()=>setTab("search")} style={{ background:"#1e40af", border:"none", borderRadius:12, color:"#fff", padding:"12px 24px", fontSize:13, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Start Browsing</button>
                  </div>
                : VYS_LISTINGS.filter(b=>saved.includes(b.id)).map(boat=><BoatCard key={boat.id} boat={boat} saved={true} onSave={toggleSave} onTap={()=>openDetail(boat)} viewCount={viewCounts[boat.id]||0} />)
              }
            </div>
          )}

        </div>

        {/* Bottom Nav */}
        <div style={{ background:"#fff", borderTop:"1px solid #f1f5f9", padding:"8px 0 12px", display:"flex", justifyContent:"space-around", flexShrink:0, boxShadow:"0 -4px 20px rgba(0,0,0,0.06)" }}>
          {[["home","🏠","Home"],["search","🔍","Search"],["market","🌊","Market"],["send","📌","Send"],["saved","♥",`Saved${saved.length>0?" "+saved.length:""}`]].map(([id,icon,label])=>(
            <button key={id} onClick={()=>setTab(id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", padding:"4px 8px", fontFamily:"inherit", opacity:tab===id||tab==="detail"&&id==="home"?1:0.4 }}>
              <span style={{ fontSize:22 }}>{icon}</span>
              <span style={{ fontSize:10, fontWeight:tab===id?700:400, color:tab===id?"#1e40af":"#64748b" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
      {inquiry && (
        <div onClick={()=>setInquiry(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", display:"flex", alignItems:"flex-end", justifyContent:"center", zIndex:200 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#fff", borderRadius:"24px 24px 0 0", padding:"24px 20px 32px", width:"100%", maxWidth:390, animation:"slideIn 0.3s ease" }}>
            <div style={{ width:40, height:4, background:"#e2e8f0", borderRadius:99, margin:"0 auto 20px" }} />
            <div style={{ fontSize:17, fontWeight:700, marginBottom:4 }}>Message William</div>
            <div style={{ fontSize:12, color:"#94a3b8", marginBottom:18 }}>{BROKER.email} · {BROKER.phone}</div>
            {[["Name","text","Your full name"],["Email","email","your@email.com"],["Phone","tel","(555) 000-0000"]].map(([label,type,ph])=>(
              <div key={label} style={{ marginBottom:12 }}>
                <label style={lbl}>{label}</label>
                <input type={type} placeholder={ph} style={inp} />
              </div>
            ))}
            <div style={{ marginBottom:16 }}>
              <label style={lbl}>Message</label>
              <textarea rows={inquiry.prefill?5:3} defaultValue={inquiry.prefill||""} placeholder="What are you looking for?" style={{ width:"100%", padding:"12px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:13, fontFamily:"inherit", resize:"none", outline:"none", color:"#334155" }} />
            </div>
            <button onClick={()=>setInquiry(null)} style={{ width:"100%", padding:"15px", background:`linear-gradient(135deg,${inquiry.color||"#1e40af"},#1e3a8a)`, border:"none", borderRadius:14, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Send to William →</button>
          </div>
        </div>
      )}
    </div>
  );
}

const lbl = { fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94a3b8", display:"block", marginBottom:6 };
const inp = { width:"100%", padding:"12px 14px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:14, outline:"none", color:"#334155", display:"block" };
const sel = { width:"100%", padding:"12px 14px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:14, color:"#334155", background:"#fff", outline:"none" };
