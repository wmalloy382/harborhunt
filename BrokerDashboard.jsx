import { useState } from "react";

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const BROKER = {
  name: "William Malloy",
  brokerage: "Veteran Yacht Sales",
  email: "wmalloy@veteranyachtsales.com",
  phone: "(843) 633-3133",
  plan: "Pro",
};

const CLIENTS = [
  { id: "c1", name: "James Thornton",   email: "j.thornton@email.com",   phone: "(843) 221-0044", avatar: "JT", color: "#0369a1", lastSeen: "2 min ago",  status: "hot",    saved: 4, searches: 12, lastBoat: "54' Kufner 2024", activity: "browsing" },
  { id: "c2", name: "Sarah Mitchell",   email: "s.mitchell@email.com",   phone: "(912) 445-7823", avatar: "SM", color: "#047857", lastSeen: "18 min ago", status: "warm",   saved: 2, searches: 7,  lastBoat: "42' Catalina 2023", activity: "saved" },
  { id: "c3", name: "Robert Danes",     email: "r.danes@email.com",      phone: "(704) 332-9910", avatar: "RD", color: "#7c3aed", lastSeen: "1 hr ago",   status: "warm",   saved: 6, searches: 23, lastBoat: "52' DeFever 1982", activity: "idle" },
  { id: "c4", name: "Patricia Wells",   email: "p.wells@email.com",      phone: "(843) 778-2201", avatar: "PW", color: "#b45309", lastSeen: "3 hrs ago",  status: "cold",   saved: 1, searches: 3,  lastBoat: "36' Carver 2005", activity: "idle" },
  { id: "c5", name: "Michael Hargrove", email: "m.hargrove@email.com",   phone: "(910) 554-8823", avatar: "MH", color: "#be123c", lastSeen: "Yesterday",  status: "cold",   saved: 0, searches: 2,  lastBoat: "40' Viking 1973", activity: "idle" },
];

const ACTIVITY_FEED = [
  { id: 1,  client: "James Thornton",   avatar: "JT", color: "#0369a1", action: "saved",          detail: "54' Kufner Yachts 2024 — Sea Wave",        time: "2 min ago",   type: "save",   hot: true  },
  { id: 2,  client: "James Thornton",   avatar: "JT", color: "#0369a1", action: "viewed 3×",      detail: "54' Kufner 2024 — Sea Wave · ~4m total",   time: "3 min ago",   type: "view",   hot: true  },
  { id: 3,  client: "James Thornton",   avatar: "JT", color: "#0369a1", action: "searched",        detail: "Sailing · Under $800k · Min 50ft",         time: "6 min ago",   type: "search", hot: true  },
  { id: 4,  client: "Sarah Mitchell",   avatar: "SM", color: "#047857", action: "sent you",        detail: "yachtworld.com/boats/42-catalina",          time: "18 min ago",  type: "send",   hot: true  },
  { id: 5,  client: "James Thornton",   avatar: "JT", color: "#0369a1", action: "viewed 2×",       detail: "42' Catalina 2023 — Age Gap · ~2m total",  time: "25 min ago",  type: "view",   hot: false },
  { id: 6,  client: "James Thornton",   avatar: "JT", color: "#0369a1", action: "saved",           detail: "42' Catalina 2023 — Age Gap",              time: "27 min ago",  type: "save",   hot: false },
  { id: 7,  client: "Robert Danes",     avatar: "RD", color: "#7c3aed", action: "searched",        detail: "Motor Yacht · $200k–$300k · 50ft+",        time: "1 hr ago",    type: "search", hot: false },
  { id: 8,  client: "Robert Danes",     avatar: "RD", color: "#7c3aed", action: "viewed 4×",       detail: "52' DeFever 1982 — Noelani · ~7m total",   time: "1 hr ago",    type: "view",   hot: false },
  { id: 9,  client: "Robert Danes",     avatar: "RD", color: "#7c3aed", action: "saved",           detail: "52' DeFever 1982 — Noelani",               time: "1 hr ago",    type: "save",   hot: false },
  { id: 10, client: "Sarah Mitchell",   avatar: "SM", color: "#047857", action: "viewed 2×",       detail: "44' Hylas 1990 — Atlantis · ~3m total",    time: "2 hrs ago",   type: "view",   hot: false },
  { id: 11, client: "Sarah Mitchell",   avatar: "SM", color: "#047857", action: "saved",           detail: "44' Hylas 1990 — Atlantis",                time: "2 hrs ago",   type: "save",   hot: false },
  { id: 12, client: "Patricia Wells",   avatar: "PW", color: "#b45309", action: "searched",        detail: "Sport Fish · Under $100k",                 time: "3 hrs ago",   type: "search", hot: false },
  { id: 13, client: "Patricia Wells",   avatar: "PW", color: "#b45309", action: "viewed 1×",       detail: "36' Carver 2005 — Pura Vida · ~45s",       time: "3 hrs ago",   type: "view",   hot: false },
  { id: 14, client: "Michael Hargrove", avatar: "MH", color: "#be123c", action: "opened app",      detail: "Via business card QR code",                time: "Yesterday",   type: "open",   hot: false },
  { id: 15, client: "Robert Danes",     avatar: "RD", color: "#7c3aed", action: "searched",        detail: "Sailing · $250k–$450k · East Coast",       time: "Yesterday",   type: "search", hot: false },
];

// Listing heat data — views × time = broker insight
const LISTING_HEAT = [
  { id:"v1", title:"54' Kufner 2024 — Sea Wave",       views:{ JT:3, RD:1 }, timeSpent:{ JT:240, RD:30 }, savedBy:["JT","RD"] },
  { id:"v2", title:"54' Shannon 1984 — Conmara",        views:{ RD:2 },       timeSpent:{ RD:90 },          savedBy:["RD"] },
  { id:"v3", title:"52' DeFever 1982 — Noelani",        views:{ RD:4, SM:1 }, timeSpent:{ RD:420, SM:25 },  savedBy:["RD","SM"] },
  { id:"v4", title:"44' Hylas 1990 — Atlantis",         views:{ SM:2 },       timeSpent:{ SM:180 },         savedBy:["SM"] },
  { id:"v5", title:"42' Catalina 2023 — Age Gap",       views:{ JT:2 },       timeSpent:{ JT:120 },         savedBy:["JT"] },
  { id:"v6", title:"36' Carver 2005 — Pura Vida",       views:{ PW:1 },       timeSpent:{ PW:45 },          savedBy:["PW"] },
];

function totalViews(l)    { return Object.values(l.views).reduce((a,b)=>a+b,0); }
function totalTime(l)     { return Object.values(l.timeSpent).reduce((a,b)=>a+b,0); }
function heatScore(l)     { return totalViews(l)*10 + (l.savedBy.length*30) + Math.min(totalTime(l)/5,60); }
function fmtTime(s)       { return s >= 60 ? `${Math.floor(s/60)}m ${s%60}s` : `${s}s`; }

const VYS_LISTINGS = [
  { id:"v1", title:"54' Kufner 2024 — Sea Wave",     price:695000, type:"Sailing",     savedBy:["JT","RD"], views:34, inquiries:2 },
  { id:"v2", title:"54' Shannon 1984 — Conmara",     price:399000, type:"Sailing",     savedBy:["RD"],      views:21, inquiries:1 },
  { id:"v3", title:"52' DeFever 1982 — Noelani",     price:250000, type:"Motor Yacht", savedBy:["RD","SM"], views:18, inquiries:0 },
  { id:"v4", title:"44' Hylas 1990 — Atlantis",      price:99000,  type:"Sailing",     savedBy:["SM"],      views:15, inquiries:1 },
  { id:"v5", title:"42' Catalina 2023 — Age Gap",    price:409000, type:"Sailing",     savedBy:["JT"],      views:29, inquiries:3 },
  { id:"v6", title:"36' Carver 2005 — Pura Vida",    price:95000,  type:"Motor Yacht", savedBy:["PW"],      views:9,  inquiries:0 },
];

const PUSH_HISTORY = [
  { id:1, to:"James Thornton",   boat:"2024 Beneteau Oceanis 51 — $410k — Annapolis",  sent:"1 day ago",  opened:true  },
  { id:2, to:"Robert Danes",     boat:"2019 DeFever 52 — $265k — Deltaville VA",       sent:"3 days ago", opened:true  },
  { id:3, to:"Sarah Mitchell",   boat:"2023 Catalina 42 — Age Gap — $409k",            sent:"5 days ago", opened:false },
];

const fmt = p => "$" + p.toLocaleString();

const STATUS_COLORS = { hot: "#ef4444", warm: "#f97316", cold: "#94a3b8" };
const STATUS_BG     = { hot: "rgba(239,68,68,0.1)", warm: "rgba(249,115,22,0.1)", cold: "rgba(148,163,184,0.1)" };
const TYPE_ICONS    = { save:"♥", search:"🔍", send:"📌", open:"👁", view:"👁" };
const TYPE_COLORS   = { save:"#e11d48", search:"#1e40af", send:"#047857", open:"#7c3aed", view:"#7c3aed" };

// ── SEND LISTING MODAL ───────────────────────────────────────────────────────
function SendModal({ client, onClose }) {
  const [msg, setMsg] = useState(`Hi ${client.name.split(" ")[0]},\n\nI found something I think you'll love — take a look when you get a chance. Happy to arrange a showing anytime.\n\n— William`);
  const [url, setUrl] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) return (
    <div onClick={onClose} style={overlay}>
      <div onClick={e=>e.stopPropagation()} style={{ ...modal, textAlign:"center", padding:"48px 32px" }}>
        <div style={{ fontSize:52, marginBottom:16 }}>📱</div>
        <div style={{ fontSize:22, fontWeight:700, marginBottom:8 }}>Sent to {client.name.split(" ")[0]}!</div>
        <div style={{ fontSize:14, color:"#64748b", marginBottom:24 }}>They'll receive a push notification on their phone right now.</div>
        <button onClick={onClose} style={btnPrimary}>Done</button>
      </div>
    </div>
  );

  return (
    <div onClick={onClose} style={overlay}>
      <div onClick={e=>e.stopPropagation()} style={modal}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24, paddingBottom:20, borderBottom:"1px solid #f1f5f9" }}>
          <div style={{ width:44, height:44, borderRadius:"50%", background:`linear-gradient(135deg, ${client.color}, ${client.color}99)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff" }}>{client.avatar}</div>
          <div>
            <div style={{ fontSize:16, fontWeight:700 }}>Push listing to {client.name}</div>
            <div style={{ fontSize:12, color:"#94a3b8" }}>They'll get a notification on their phone instantly</div>
          </div>
          <button onClick={onClose} style={{ marginLeft:"auto", background:"none", border:"none", fontSize:20, color:"#94a3b8", cursor:"pointer" }}>×</button>
        </div>

        <label style={lbl}>Listing URL</label>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.yachtworld.com/boats/..." style={{ ...inp, marginBottom:14, border:`1px solid ${url?"#1e40af":"#e2e8f0"}` }} />

        <label style={lbl}>Or choose one of your listings</label>
        <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
          {VYS_LISTINGS.slice(0,4).map(l=>(
            <div key={l.id} onClick={()=>setUrl(`https://veteranyachtsales.com/listing/${l.id}`)} style={{ padding:"10px 14px", background:url.includes(l.id)?"#dbeafe":"#f8fafc", border:`1px solid ${url.includes(l.id)?"#1e40af":"#e2e8f0"}`, borderRadius:10, cursor:"pointer", fontSize:13, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontWeight:500 }}>{l.title}</span>
              <span style={{ color:"#1e40af", fontWeight:600 }}>{fmt(l.price)}</span>
            </div>
          ))}
        </div>

        <label style={lbl}>Personal message</label>
        <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={4} style={{ width:"100%", padding:"12px 14px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:13, fontFamily:"'Georgia', serif", resize:"none", outline:"none", marginBottom:20, color:"#334155", lineHeight:1.6 }} />

        <button onClick={()=>setSent(true)} style={{ ...btnPrimary, opacity: url?1:0.5 }}>
          📱 Send Push Notification to {client.name.split(" ")[0]}
        </button>
        <div style={{ fontSize:11, color:"#94a3b8", textAlign:"center", marginTop:8 }}>Notification delivered via HarborHunt app</div>
      </div>
    </div>
  );
}

// ── CLIENT DETAIL PANEL ──────────────────────────────────────────────────────
function ClientPanel({ client, onClose, onSend }) {
  const clientActivity = ACTIVITY_FEED.filter(a => a.client === client.name);
  return (
    <div style={{ position:"fixed", top:0, right:0, bottom:0, width:380, background:"#fff", boxShadow:"-4px 0 40px rgba(0,0,0,0.12)", zIndex:50, display:"flex", flexDirection:"column", animation:"slideIn 0.25s ease" }}>
      <div style={{ padding:"20px 20px 16px", borderBottom:"1px solid #f1f5f9", background:"linear-gradient(135deg, #0c1f3d, #1e3a8a)", color:"#fff" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg,${client.color},${client.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, border:"2px solid rgba(255,255,255,0.2)" }}>{client.avatar}</div>
            <div>
              <div style={{ fontSize:17, fontWeight:700 }}>{client.name}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>{client.email}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={()=>onSend(client)} style={{ flex:1, padding:"10px", background:"#1e40af", border:"none", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>📱 Send Listing</button>
          <a href={`tel:${client.phone}`} style={{ flex:1, padding:"10px", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>📞 Call</a>
          <a href={`mailto:${client.email}`} style={{ flex:1, padding:"10px", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>✉️ Email</a>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:20 }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:20 }}>
          {[["Searches", client.searches, "🔍"], ["Saved", client.saved, "♥"], ["Status", client.status.toUpperCase(), "🌡"]].map(([label,val,icon])=>(
            <div key={label} style={{ background:"#f8fafc", borderRadius:10, padding:"12px 10px", textAlign:"center" }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{icon}</div>
              <div style={{ fontSize:18, fontWeight:700, color:"#0f172a" }}>{val}</div>
              <div style={{ fontSize:10, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.08em" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Last activity */}
        <div style={{ background:"#fff8f0", border:"1px solid #fed7aa", borderRadius:10, padding:"12px 14px", marginBottom:20 }}>
          <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94a3b8", marginBottom:4 }}>Last Viewed</div>
          <div style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{client.lastBoat}</div>
          <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{client.lastSeen}</div>
        </div>

        {/* Activity */}
        <div style={{ fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94a3b8", marginBottom:12 }}>Activity History</div>
        {clientActivity.length === 0
          ? <div style={{ fontSize:13, color:"#94a3b8", textAlign:"center", padding:"20px 0" }}>No activity yet</div>
          : clientActivity.map(a=>(
            <div key={a.id} style={{ display:"flex", gap:10, marginBottom:12, alignItems:"flex-start" }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:TYPE_COLORS[a.type]+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, flexShrink:0 }}>{TYPE_ICONS[a.type]}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#0f172a" }}>{a.action}</div>
                <div style={{ fontSize:11, color:"#64748b", lineHeight:1.4 }}>{a.detail}</div>
                <div style={{ fontSize:10, color:"#94a3b8", marginTop:2 }}>{a.time}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function BrokerDashboard() {
  const [activeTab, setActiveTab]     = useState("overview");
  const [selectedClient, setSelectedClient] = useState(null);
  const [sendTarget, setSendTarget]   = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const hotCount  = CLIENTS.filter(c=>c.status==="hot").length;
  const warmCount = CLIENTS.filter(c=>c.status==="warm").length;
  const newActivity = ACTIVITY_FEED.filter(a=>a.hot).length;

  const filteredClients = filterStatus === "all" ? CLIENTS : CLIENTS.filter(c=>c.status===filterStatus);

  return (
    <div style={{ minHeight:"100vh", background:"#f0f4f8", fontFamily:"'Georgia', serif", color:"#0f172a" }}>
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing:border-box; }
        input,select,textarea { font-family:inherit; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#e2e8f0; borderRadius:99px; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div style={{ position:"fixed", top:0, left:0, bottom:0, width:220, background:"linear-gradient(180deg, #0c1f3d 0%, #0f2a52 100%)", display:"flex", flexDirection:"column", zIndex:10 }}>
        {/* Logo */}
        <div style={{ padding:"24px 20px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize:18, fontWeight:700, color:"#93c5fd", letterSpacing:"0.04em", marginBottom:2 }}>⚓ HarborHunt</div>
          <div style={{ fontSize:10, color:"#475569", letterSpacing:"0.1em", textTransform:"uppercase" }}>Broker Dashboard</div>
        </div>

        {/* Broker info */}
        <div style={{ padding:"16px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#93c5fd,#1e40af)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff" }}>WM</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"#f1f5f9" }}>{BROKER.name}</div>
              <div style={{ fontSize:10, color:"#475569" }}>{BROKER.plan} Plan</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:"12px 10px" }}>
          {[
            ["overview",  "📊", "Overview"],
            ["clients",   "👥", "Clients",  CLIENTS.length],
            ["activity",  "⚡", "Activity", newActivity],
            ["listings",  "⚓", "Listings", VYS_LISTINGS.length],
            ["push",      "📱", "Push Sent", PUSH_HISTORY.length],
          ].map(([id,icon,label,badge])=>(
            <button key={id} onClick={()=>setActiveTab(id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:activeTab===id?"rgba(147,197,253,0.12)":"transparent", border:"none", borderRadius:10, color:activeTab===id?"#93c5fd":"rgba(255,255,255,0.4)", fontSize:13, fontWeight:activeTab===id?600:400, cursor:"pointer", fontFamily:"inherit", marginBottom:2, textAlign:"left" }}>
              <span style={{ fontSize:16 }}>{icon}</span>
              <span style={{ flex:1 }}>{label}</span>
              {badge !== undefined && <span style={{ fontSize:10, background:activeTab===id?"#1e40af":"rgba(255,255,255,0.08)", color:activeTab===id?"#93c5fd":"rgba(255,255,255,0.3)", padding:"2px 7px", borderRadius:99, fontWeight:700 }}>{badge}</span>}
            </button>
          ))}
        </nav>

        {/* Upgrade nudge */}
        <div style={{ padding:"16px", margin:"0 10px 16px", background:"rgba(147,197,253,0.06)", border:"1px solid rgba(147,197,253,0.12)", borderRadius:12 }}>
          <div style={{ fontSize:11, fontWeight:600, color:"#93c5fd", marginBottom:4 }}>Pro Plan Active</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", lineHeight:1.5, marginBottom:10 }}>Push notifications · Client dashboard · Full analytics</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)" }}>Next billing: Apr 9</div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ marginLeft:220, padding:"28px 28px 28px", minHeight:"100vh" }}>

        {/* ── OVERVIEW ── */}
        {activeTab==="overview" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:26, fontWeight:700, marginBottom:4 }}>Good morning, William 👋</div>
              <div style={{ fontSize:14, color:"#64748b" }}>Here's what your clients have been up to.</div>
            </div>

            {/* KPI cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
              {[
                ["🔥", "Hot Leads",      hotCount,            "#ef4444", "rgba(239,68,68,0.08)",  "Ready to buy"],
                ["🌡", "Warm Leads",     warmCount,           "#f97316", "rgba(249,115,22,0.08)", "Actively browsing"],
                ["⚡", "New Activity",   newActivity,         "#1e40af", "rgba(30,64,175,0.08)",  "Since yesterday"],
                ["📱", "Pushes Sent",    PUSH_HISTORY.length, "#047857", "rgba(4,120,87,0.08)",   "This week"],
              ].map(([icon,label,val,color,bg,sub])=>(
                <div key={label} style={{ background:"#fff", borderRadius:16, padding:"20px 20px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:color }} />
                  <div style={{ fontSize:28, marginBottom:8 }}>{icon}</div>
                  <div style={{ fontSize:32, fontWeight:700, color, marginBottom:2 }}>{val}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#0f172a", marginBottom:2 }}>{label}</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Two columns */}
            <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:20 }}>
              {/* Recent activity */}
              <div style={{ background:"#fff", borderRadius:16, padding:"22px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                  <div style={{ fontSize:15, fontWeight:700 }}>⚡ Live Activity Feed</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:"#ef4444" }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", animation:"pulse 2s infinite" }} />
                    Live
                  </div>
                </div>
                {ACTIVITY_FEED.slice(0,6).map(a=>(
                  <div key={a.id} style={{ display:"flex", gap:12, marginBottom:14, alignItems:"flex-start", padding:"10px 12px", background:a.hot?"#fff8f0":"#fafafa", borderRadius:10, border:`1px solid ${a.hot?"#fed7aa":"#f1f5f9"}` }}>
                    <div style={{ width:34, height:34, borderRadius:"50%", background:`linear-gradient(135deg,${a.color},${a.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff", flexShrink:0 }}>{a.avatar}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, marginBottom:1 }}>
                        <strong>{a.client}</strong> <span style={{ color:TYPE_COLORS[a.type] }}>{a.action}</span>
                      </div>
                      <div style={{ fontSize:11, color:"#64748b", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{a.detail}</div>
                    </div>
                    <div style={{ fontSize:10, color:"#94a3b8", whiteSpace:"nowrap", flexShrink:0 }}>{a.time}</div>
                  </div>
                ))}
                <button onClick={()=>setActiveTab("activity")} style={{ width:"100%", padding:"10px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:10, color:"#1e40af", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", marginTop:4 }}>View all activity →</button>
              </div>

              {/* Hot clients */}
              <div style={{ background:"#fff", borderRadius:16, padding:"22px 22px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9" }}>
                <div style={{ fontSize:15, fontWeight:700, marginBottom:18 }}>🔥 Hottest Clients</div>
                {CLIENTS.slice(0,4).map(c=>(
                  <div key={c.id} onClick={()=>setSelectedClient(c)} style={{ display:"flex", gap:10, alignItems:"center", padding:"10px 12px", borderRadius:10, cursor:"pointer", marginBottom:8, border:"1px solid #f1f5f9", transition:"all 0.15s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${c.color},${c.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff", flexShrink:0 }}>{c.avatar}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{c.name}</div>
                      <div style={{ fontSize:11, color:"#94a3b8" }}>{c.lastSeen} · {c.saved} saved</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:STATUS_COLORS[c.status], background:STATUS_BG[c.status], padding:"2px 8px", borderRadius:99, textTransform:"uppercase" }}>{c.status}</span>
                      <button onClick={e=>{ e.stopPropagation(); setSendTarget(c); }} style={{ fontSize:10, background:"#1e40af", border:"none", borderRadius:6, color:"#fff", padding:"3px 8px", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>📱 Push</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CLIENTS ── */}
        {activeTab==="clients" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <div>
                <div style={{ fontSize:26, fontWeight:700, marginBottom:4 }}>👥 Clients</div>
                <div style={{ fontSize:14, color:"#64748b" }}>{CLIENTS.length} clients using your HarborHunt link</div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {["all","hot","warm","cold"].map(s=>(
                  <button key={s} onClick={()=>setFilterStatus(s)} style={{ padding:"8px 16px", background:filterStatus===s?(s==="all"?"#1e40af":STATUS_COLORS[s]):"#fff", border:`1px solid ${filterStatus===s?(s==="all"?"#1e40af":STATUS_COLORS[s]):"#e2e8f0"}`, borderRadius:99, color:filterStatus===s?"#fff":"#64748b", fontSize:12, fontWeight:filterStatus===s?700:400, cursor:"pointer", fontFamily:"inherit", textTransform:"capitalize" }}>{s}</button>
                ))}
              </div>
            </div>

            <div style={{ background:"#fff", borderRadius:16, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9", overflow:"hidden" }}>
              {/* Table header */}
              <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1.5fr 120px", padding:"12px 20px", background:"#f8fafc", borderBottom:"1px solid #f1f5f9", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94a3b8" }}>
                <span>Client</span><span>Status</span><span>Searches</span><span>Saved</span><span>Last Seen</span><span>Last Boat Viewed</span><span style={{ textAlign:"right" }}>Actions</span>
              </div>
              {filteredClients.map((c,i)=>(
                <div key={c.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr 1.5fr 120px", padding:"14px 20px", borderBottom:"1px solid #f8fafc", alignItems:"center", cursor:"pointer", transition:"background 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                  onClick={()=>setSelectedClient(c)}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${c.color},${c.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff" }}>{c.avatar}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600 }}>{c.name}</div>
                      <div style={{ fontSize:11, color:"#94a3b8" }}>{c.email}</div>
                    </div>
                  </div>
                  <span style={{ fontSize:11, fontWeight:700, color:STATUS_COLORS[c.status], background:STATUS_BG[c.status], padding:"3px 10px", borderRadius:99, textTransform:"uppercase", width:"fit-content" }}>{c.status}</span>
                  <span style={{ fontSize:14, fontWeight:600 }}>{c.searches}</span>
                  <span style={{ fontSize:14, fontWeight:600, color:"#e11d48" }}>{"♥".repeat(Math.min(c.saved,4))}{c.saved>4?"+":""} {c.saved}</span>
                  <span style={{ fontSize:12, color:"#94a3b8" }}>{c.lastSeen}</span>
                  <span style={{ fontSize:12, color:"#64748b" }}>{c.lastBoat}</span>
                  <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>setSendTarget(c)} style={{ padding:"6px 10px", background:"#1e40af", border:"none", borderRadius:8, color:"#fff", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>📱 Push</button>
                    <button onClick={()=>setSelectedClient(c)} style={{ padding:"6px 10px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:8, color:"#64748b", fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACTIVITY ── */}
        {activeTab==="activity" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:26, fontWeight:700, marginBottom:4 }}>⚡ Activity Feed</div>
              <div style={{ fontSize:14, color:"#64748b" }}>Everything your clients are doing in real time</div>
            </div>
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20, fontSize:12, color:"#ef4444", fontWeight:600 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#ef4444", animation:"pulse 2s infinite" }} />
                Live · Updates in real time
              </div>
              {ACTIVITY_FEED.map(a=>(
                <div key={a.id} style={{ display:"flex", gap:14, marginBottom:14, padding:"14px 16px", background:a.hot?"#fff8f0":"#fafafa", borderRadius:12, border:`1px solid ${a.hot?"#fed7aa":"#f1f5f9"}`, alignItems:"flex-start" }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,${a.color},${a.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff", flexShrink:0 }}>{a.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, marginBottom:3 }}>
                      <strong style={{ cursor:"pointer", color:"#1e40af" }} onClick={()=>setSelectedClient(CLIENTS.find(c=>c.name===a.client))}>{a.client}</strong>
                      {" "}<span style={{ color:TYPE_COLORS[a.type], fontWeight:600 }}>{a.action}</span>
                    </div>
                    <div style={{ fontSize:12, color:"#64748b", lineHeight:1.5 }}>{a.detail}</div>
                    <div style={{ fontSize:10, color:"#94a3b8", marginTop:4 }}>{a.time}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end" }}>
                    <span style={{ fontSize:16 }}>{TYPE_ICONS[a.type]}</span>
                    <button onClick={()=>setSendTarget(CLIENTS.find(c=>c.name===a.client))} style={{ fontSize:10, background:"#1e40af", border:"none", borderRadius:6, color:"#fff", padding:"4px 9px", cursor:"pointer", fontFamily:"inherit", fontWeight:600, whiteSpace:"nowrap" }}>📱 Push</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LISTINGS HEAT MAP ── */}
        {activeTab==="listings" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:26, fontWeight:700, marginBottom:4 }}>🔥 Listing Heat Map</div>
              <div style={{ fontSize:14, color:"#64748b" }}>Every view, save, and second spent on each listing</div>
            </div>

            {/* Legend */}
            <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
              {[["🔥","Hot — multiple views + saved","#fef2f2","#ef4444"],["🌡","Warm — viewed but not saved","#fff7ed","#f97316"],["👁","Viewed once","#f0f4f8","#94a3b8"]].map(([icon,label,bg,color])=>(
                <div key={label} style={{ display:"flex", alignItems:"center", gap:6, background:bg, border:`1px solid ${color}22`, borderRadius:99, padding:"5px 12px" }}>
                  <span style={{ fontSize:13 }}>{icon}</span>
                  <span style={{ fontSize:11, color:"#64748b" }}>{label}</span>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {LISTING_HEAT.sort((a,b)=>heatScore(b)-heatScore(a)).map(l => {
                const score = heatScore(l);
                const hot = score >= 60;
                const warm = score >= 25;
                const borderColor = hot?"#fca5a5":warm?"#fdba74":"#e2e8f0";
                const topColor = hot?"#ef4444":warm?"#f97316":"#94a3b8";
                const vys = VYS_LISTINGS.find(v=>v.id===l.id);
                return (
                  <div key={l.id} style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:`1px solid ${borderColor}` }}>
                    <div style={{ height:4, background:topColor }} />
                    <div style={{ padding:"18px 20px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                        <div>
                          <div style={{ fontSize:14, fontWeight:700, color:"#0f172a", marginBottom:3 }}>{l.title}</div>
                          <div style={{ fontSize:18, fontWeight:700, color:"#1e40af" }}>{vys ? fmt(vys.price) : ""}</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:22, fontWeight:700, color:topColor }}>{Math.round(score)}</div>
                          <div style={{ fontSize:9, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.08em" }}>Heat Score</div>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
                        {[
                          ["👁 Total Views",  totalViews(l)],
                          ["⏱ Time Spent",   fmtTime(totalTime(l))],
                          ["♥ Saved By",     l.savedBy.length],
                        ].map(([label,val])=>(
                          <div key={label} style={{ background:"#f8fafc", borderRadius:10, padding:"10px 12px", textAlign:"center" }}>
                            <div style={{ fontSize:11, color:"#94a3b8", marginBottom:3 }}>{label}</div>
                            <div style={{ fontSize:17, fontWeight:700, color:"#0f172a" }}>{val}</div>
                          </div>
                        ))}
                      </div>

                      {/* Per-client breakdown */}
                      <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94a3b8", marginBottom:10 }}>Client Breakdown</div>
                      {Object.keys(l.views).map(av => {
                        const c = CLIENTS.find(x=>x.avatar===av);
                        const views = l.views[av];
                        const time = l.timeSpent[av] || 0;
                        const isSaved = l.savedBy.includes(av);
                        return (
                          <div key={av} onClick={()=>{ if(c) setSelectedClient(c); }} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:"#f8fafc", borderRadius:10, marginBottom:6, cursor:"pointer" }}
                            onMouseEnter={e=>e.currentTarget.style.background="#f0f4f8"}
                            onMouseLeave={e=>e.currentTarget.style.background="#f8fafc"}>
                            <div style={{ width:30, height:30, borderRadius:"50%", background:c?`linear-gradient(135deg,${c.color},${c.color}88)`:"#94a3b8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff", flexShrink:0 }}>{av}</div>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:12, fontWeight:600 }}>{c?.name || av}</div>
                              <div style={{ fontSize:10, color:"#94a3b8" }}>Viewed {views}× · {fmtTime(time)} total</div>
                            </div>
                            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                              {isSaved && <span style={{ fontSize:12, color:"#e11d48" }}>♥</span>}
                              <button onClick={e=>{ e.stopPropagation(); if(c) setSendTarget(c); }} style={{ fontSize:10, background:"#1e40af", border:"none", borderRadius:6, color:"#fff", padding:"4px 9px", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>📱 Push</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── PUSH HISTORY ── */}
        {activeTab==="push" && (
          <div style={{ animation:"fadeUp 0.35s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <div>
                <div style={{ fontSize:26, fontWeight:700, marginBottom:4 }}>📱 Push Notifications Sent</div>
                <div style={{ fontSize:14, color:"#64748b" }}>Listings you've pushed to clients</div>
              </div>
              <button onClick={()=>setSendTarget(CLIENTS[0])} style={{ padding:"12px 22px", background:"linear-gradient(135deg,#1e40af,#1e3a8a)", border:"none", borderRadius:12, color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>📱 Send New Push</button>
            </div>
            <div style={{ background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9" }}>
              {PUSH_HISTORY.map(p=>(
                <div key={p.id} style={{ display:"flex", gap:14, alignItems:"center", padding:"16px 0", borderBottom:"1px solid #f8fafc" }}>
                  <div style={{ fontSize:28 }}>📱</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, marginBottom:3 }}>To: {p.to}</div>
                    <div style={{ fontSize:12, color:"#64748b" }}>{p.boat}</div>
                    <div style={{ fontSize:10, color:"#94a3b8", marginTop:4 }}>Sent {p.sent}</div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                    <span style={{ fontSize:11, fontWeight:600, color:p.opened?"#047857":"#94a3b8", background:p.opened?"rgba(4,120,87,0.1)":"#f1f5f9", padding:"3px 10px", borderRadius:99 }}>
                      {p.opened ? "✓ Opened" : "Not opened"}
                    </span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:20, padding:"16px", background:"linear-gradient(135deg,rgba(30,64,175,0.05),transparent)", borderRadius:12, border:"1px solid rgba(30,64,175,0.1)" }}>
                <div style={{ fontSize:13, fontWeight:600, color:"#1e40af", marginBottom:4 }}>💡 Pro tip</div>
                <div style={{ fontSize:12, color:"#64748b", lineHeight:1.6 }}>Push listings to clients on Tuesday–Thursday evenings for highest open rates. People browse boats most in the 7–10pm window.</div>
              </div>
            </div>
          </div>
        )}

      </div>{/* end main */}

      {/* Client side panel */}
      {selectedClient && <ClientPanel client={selectedClient} onClose={()=>setSelectedClient(null)} onSend={c=>{ setSelectedClient(null); setSendTarget(c); }} />}

      {/* Send modal */}
      {sendTarget && <SendModal client={sendTarget} onClose={()=>setSendTarget(null)} />}

    </div>
  );
}

const overlay = { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20 };
const modal   = { background:"#fff", borderRadius:20, padding:28, width:"100%", maxWidth:480, maxHeight:"90vh", overflowY:"auto", animation:"fadeUp 0.25s ease" };
const btnPrimary = { width:"100%", padding:"14px", background:"linear-gradient(135deg,#1e40af,#1e3a8a)", border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Georgia',serif" };
const lbl = { fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", color:"#94a3b8", display:"block", marginBottom:6 };
const inp = { width:"100%", padding:"12px 14px", border:"1px solid #e2e8f0", borderRadius:10, fontSize:14, outline:"none", color:"#334155", display:"block", marginBottom:0 };
