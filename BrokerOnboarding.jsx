import { useState } from "react";

const STEPS = [
  { id: 1, label: "Plan", icon: "⚓" },
  { id: 2, label: "Profile", icon: "👤" },
  { id: 3, label: "Connect", icon: "🔗" },
  { id: 4, label: "Customize", icon: "🎨" },
  { id: 5, label: "Launch", icon: "🚀" },
];

const PLANS = [
  {
    id: "starter",
    name: "First Mate",
    price: 49,
    color: "#64748b",
    accent: "#94a3b8",
    features: ["Up to 10 active clients", "Branded search experience", "Lead notifications via email", "Basic analytics"],
    best: false,
  },
  {
    id: "pro",
    name: "Captain",
    price: 99,
    color: "#0ea5e9",
    accent: "#7dd3fc",
    features: ["Unlimited clients", "Fully branded app experience", "Real-time lead alerts (SMS + email)", "Advanced analytics dashboard", "Priority listing placement", "Custom referral link"],
    best: true,
  },
  {
    id: "fleet",
    name: "Commodore",
    price: 249,
    color: "#f59e0b",
    accent: "#fcd34d",
    features: ["Everything in Captain", "Multi-agent brokerage support", "White-label mobile app", "API integration support", "Dedicated account manager", "Featured broker badge"],
    best: false,
  },
];

const SOURCES = [
  { id: "yachtworld", name: "YachtWorld", logo: "⚓", desc: "Enter your YachtWorld member API key", connected: false },
  { id: "boatscom", name: "Boats.com", logo: "🚢", desc: "Uses same Dominion Marine key as YachtWorld", connected: false },
  { id: "boattrader", name: "BoatTrader", logo: "🤝", desc: "Enter your BoatTrader dealer credentials", connected: false },
];

export default function BrokerOnboarding() {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("pro");
  const [profile, setProfile] = useState({ name: "", brokerage: "", phone: "", email: "", location: "", bio: "", tagline: "" });
  const [sources, setSources] = useState(SOURCES.map(s => ({ ...s })));
  const [apiKeys, setApiKeys] = useState({ yachtworld: "", boatscom: "", boattrader: "" });
  const [brand, setBrand] = useState({ color: "#0ea5e9", appName: "HarborHunt", welcomeMsg: "Find your perfect vessel with a trusted guide." });
  const [referralCode] = useState("BROKER-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [copied, setCopied] = useState(false);

  const pf = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const bf = (k, v) => setBrand(p => ({ ...p, [k]: v }));

  function toggleSource(id) {
    setSources(s => s.map(x => x.id === id ? { ...x, connected: !x.connected } : x));
  }

  function copyLink() {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const selectedPlan = PLANS.find(p => p.id === plan);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "'Georgia', 'Times New Roman', serif", color: "#1a1a2e" }}>
      <style>{`
        @keyframes slideIn { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pop { 0%{transform:scale(0.95)} 100%{transform:scale(1)} }
        @keyframes shimmer { 0%{opacity:0.5} 50%{opacity:1} 100%{opacity:0.5} }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <header style={{ background: "#0a1628", padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>⚓</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#7dd3fc", letterSpacing: "0.04em" }}>HarborHunt</div>
            <div style={{ fontSize: 10, color: "#475569", letterSpacing: "0.12em", textTransform: "uppercase" }}>Broker Portal</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#475569" }}>Already a member? <span style={{ color: "#0ea5e9", cursor: "pointer" }}>Sign in</span></div>
      </header>

      {/* Hero */}
      {step === 1 && (
        <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #0e2d4a 60%, #0a1628 100%)", padding: "50px 40px 60px", textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0ea5e9", marginBottom: 14 }}>Broker Onboarding</div>
          <h1 style={{ fontSize: 38, fontWeight: 300, color: "#f1f5f9", margin: "0 0 12px", lineHeight: 1.2 }}>
            Grow your brokerage with<br /><span style={{ fontStyle: "italic", fontWeight: 700, color: "#7dd3fc" }}>HarborHunt</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>Connect your clients to the perfect boat — while every inquiry routes back to you.</p>
        </div>
      )}

      {/* Stepper */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "0 40px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center" }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "18px 0", cursor: s.id <= step ? "pointer" : "default" }} onClick={() => s.id < step && setStep(s.id)}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: step > s.id ? "#0ea5e9" : step === s.id ? "#0a1628" : "#f1f5f9", border: step === s.id ? "2px solid #0ea5e9" : "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: step > s.id ? 14 : 16, color: step >= s.id ? "#fff" : "#94a3b8", marginBottom: 6, transition: "all 0.3s" }}>
                  {step > s.id ? "✓" : s.icon}
                </div>
                <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: step === s.id ? "#0a1628" : step > s.id ? "#0ea5e9" : "#94a3b8", fontWeight: step === s.id ? 700 : 400 }}>{s.label}</div>
              </div>
              {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: step > s.id ? "#0ea5e9" : "#e2e8f0", margin: "0 8px 20px", transition: "background 0.3s" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px", animation: "slideIn 0.4s ease" }}>

        {/* STEP 1 — Choose Plan */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Choose your plan</h2>
            <p style={{ color: "#64748b", marginBottom: 8, fontSize: 15 }}>Start free for 30 days. Cancel anytime.</p>
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 16px", marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>🔒</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#166534" }}>First 30 days completely free</div>
                <div style={{ fontSize: 11, color: "#15803d" }}>Your card won\'t be charged until day 31 · Auto-renews monthly · Cancel anytime before then</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 36 }}>
              {PLANS.map(p => (
                <div key={p.id} onClick={() => setPlan(p.id)} style={{ background: plan === p.id ? "#0a1628" : "#fff", border: plan === p.id ? `2px solid ${p.color}` : "2px solid #e2e8f0", borderRadius: 16, padding: 24, cursor: "pointer", position: "relative", transition: "all 0.2s", animation: plan === p.id ? "pop 0.15s ease" : "none" }}>
                  {p.best && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: p.color, color: "#fff", fontSize: 10, padding: "3px 12px", borderRadius: 99, fontWeight: 700, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>MOST POPULAR</div>}
                  <div style={{ fontSize: 14, fontWeight: 700, color: plan === p.id ? p.accent : "#64748b", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>{p.name}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: plan === p.id ? "#f1f5f9" : "#0a1628", marginBottom: 4 }}>${p.price}<span style={{ fontSize: 14, fontWeight: 400, color: plan === p.id ? "#64748b" : "#94a3b8" }}>/mo</span></div>
                  <div style={{ height: 1, background: plan === p.id ? "rgba(255,255,255,0.1)" : "#f1f5f9", margin: "14px 0" }} />
                  {p.features.map(f => (
                    <div key={f} style={{ fontSize: 12, color: plan === p.id ? "#94a3b8" : "#64748b", marginBottom: 7, display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: p.color, flexShrink: 0 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => setStep(2)} style={btnPrimary}>Start 30-Day Free Trial →</button>
              <div style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", marginTop: 10 }}>
                Then ${"{"}selectedPlan?.price{"}"}/mo · Auto-renews · Cancel anytime · Secure checkout
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Broker Profile */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Build your broker profile</h2>
            <p style={{ color: "#64748b", marginBottom: 32, fontSize: 15 }}>This is what your clients will see when they use your personalized HarborHunt link.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              {[["Your Full Name", "name", "e.g. Captain Dave Realty"], ["Brokerage Name", "brokerage", "e.g. Gulf Coast Yachts LLC"], ["Phone Number", "phone", "(555) 000-0000"], ["Email Address", "email", "dave@yourbrokerage.com"], ["Primary Market / Location", "location", "e.g. Fort Lauderdale, FL"], ["Tagline", "tagline", "e.g. Your Gulf Coast Yacht Specialist"]].map(([label, key, ph]) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input value={profile[key]} onChange={e => pf(key, e.target.value)} placeholder={ph} style={inputStyle} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Short Bio (shown on your profile page)</label>
              <textarea value={profile.bio} onChange={e => pf("bio", e.target.value)} placeholder="Tell clients a bit about yourself — your experience, specialties, and what makes you different..." rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {/* Live preview */}
            <div style={{ background: "#0a1628", borderRadius: 14, padding: 24, marginBottom: 28, border: "1px solid rgba(14,165,233,0.2)" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: 16 }}>Preview</div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#0ea5e9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {profile.name ? profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "BR"}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#7dd3fc" }}>{profile.name || "Your Name"}</div>
                  <div style={{ fontSize: 13, color: "#475569" }}>{profile.tagline || "Your tagline here"}</div>
                  <div style={{ fontSize: 12, color: "#334155", marginTop: 3 }}>{profile.location || "Location"} · {profile.brokerage || "Brokerage"}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(1)} style={btnSecondary}>← Back</button>
              <button onClick={() => setStep(3)} style={btnPrimary}>Save Profile & Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 3 — Connect Data Sources */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Connect your listing sources</h2>
            <p style={{ color: "#64748b", marginBottom: 32, fontSize: 15 }}>Add your existing API credentials. HarborHunt will pull live listings on your behalf — your clients search your inventory.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {sources.map(src => (
                <div key={src.id} style={{ background: "#fff", border: `1px solid ${apiKeys[src.id] ? "#0ea5e9" : "#e2e8f0"}`, borderRadius: 14, padding: 22, transition: "all 0.2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: apiKeys[src.id] !== undefined ? 14 : 0 }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <span style={{ fontSize: 28 }}>{src.logo}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{src.name}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8" }}>{src.desc}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {apiKeys[src.id] && <span style={{ fontSize: 11, color: "#10b981", background: "#d1fae5", padding: "3px 10px", borderRadius: 99 }}>✓ Connected</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input value={apiKeys[src.id]} onChange={e => setApiKeys(k => ({ ...k, [src.id]: e.target.value }))} placeholder={`Paste your ${src.name} API key here`} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} type="password" />
                    <button onClick={() => {}} style={{ padding: "10px 18px", background: apiKeys[src.id] ? "#0ea5e9" : "#f1f5f9", border: "none", borderRadius: 9, cursor: "pointer", color: apiKeys[src.id] ? "#fff" : "#94a3b8", fontSize: 13, fontFamily: "inherit", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {apiKeys[src.id] ? "Verify ✓" : "Test Key"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 12, padding: "14px 18px", marginBottom: 28, fontSize: 13, color: "#92400e" }}>
              💡 <strong>Don't have API keys yet?</strong> You can skip this step and add them later from your dashboard. Your profile will still go live — you just won't have live listings until connected.
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(2)} style={btnSecondary}>← Back</button>
              <button onClick={() => setStep(4)} style={btnPrimary}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 4 — Customize Brand */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Customize your client experience</h2>
            <p style={{ color: "#64748b", marginBottom: 32, fontSize: 15 }}>Personalize how HarborHunt looks and feels for your clients when they use your link.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
              <div>
                <label style={labelStyle}>App Display Name</label>
                <input value={brand.appName} onChange={e => bf("appName", e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Brand Accent Color</label>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input type="color" value={brand.color} onChange={e => bf("color", e.target.value)} style={{ width: 48, height: 42, border: "1px solid #e2e8f0", borderRadius: 8, cursor: "pointer", padding: 4, background: "#fff" }} />
                  {["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"].map(c => (
                    <div key={c} onClick={() => bf("color", c)} style={{ width: 28, height: 28, borderRadius: "50%", background: c, cursor: "pointer", border: brand.color === c ? "3px solid #0a1628" : "2px solid transparent", transition: "all 0.15s" }} />
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Welcome Message (shown to your clients)</label>
              <input value={brand.welcomeMsg} onChange={e => bf("welcomeMsg", e.target.value)} style={inputStyle} />
            </div>

            {/* Live Preview */}
            <div style={{ background: "#0a1628", borderRadius: 16, padding: 0, overflow: "hidden", marginBottom: 28, border: `2px solid ${brand.color}` }}>
              <div style={{ background: "#020f1a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${brand.color}30` }}>
                <span style={{ fontSize: 20 }}>⚓</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: brand.color, letterSpacing: "0.04em" }}>{brand.appName || "HarborHunt"}</span>
              </div>
              <div style={{ padding: "28px 24px" }}>
                <div style={{ background: `${brand.color}18`, border: `1px solid ${brand.color}40`, borderRadius: 12, padding: "14px 18px", display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: brand.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                    {profile.name ? profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "BR"}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: brand.color }}>Connected with {profile.name || "Your Name"}</div>
                    <div style={{ fontSize: 11, color: "#475569" }}>{brand.welcomeMsg}</div>
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 300, color: "#f1f5f9" }}>Find your<br /><span style={{ fontStyle: "italic", fontWeight: 700, color: brand.color }}>perfect vessel.</span></div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(3)} style={btnSecondary}>← Back</button>
              <button onClick={() => setStep(5)} style={{ ...btnPrimary, background: `linear-gradient(135deg, ${brand.color}, #0369a1)` }}>Looks great — Launch! →</button>
            </div>
          </div>
        )}

        {/* STEP 4b — Card Details (injected before launch) */}
        {step === 5 && false && null}

        {/* STEP 5 — Secure Your Spot (Card) */}
        {step === 5 && (
          <div style={{ animation: "fadeUp 0.35s ease" }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Secure your free trial</h2>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 6 }}>You won\'t be charged today. Your card is saved for after your 30-day trial ends.</p>

            {/* Trial summary banner */}
            <div style={{ background: "linear-gradient(135deg, #0c1f3d, #1e3a8a)", borderRadius: 14, padding: "16px 20px", marginBottom: 24, color: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Selected plan</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#93c5fd" }}>{selectedPlan?.name}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Today\'s charge</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#4ade80" }}>$0.00</div>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 10 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Starting day 31</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>${"{"}selectedPlan?.price{"}"}/month</div>
              </div>
            </div>

            {/* Card form */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 22, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span>💳</span> Payment Details
                <span style={{ marginLeft: "auto", fontSize: 10, color: "#94a3b8", display: "flex", gap: 6 }}>
                  <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 4 }}>VISA</span>
                  <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 4 }}>MC</span>
                  <span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 4 }}>AMEX</span>
                </span>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", display: "block", marginBottom: 6 }}>Card Number</label>
                <input placeholder="1234  5678  9012  3456" style={{ width: "100%", padding: "13px 14px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", letterSpacing: "0.1em" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", display: "block", marginBottom: 6 }}>Expiry</label>
                  <input placeholder="MM / YY" style={{ width: "100%", padding: "13px 14px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", display: "block", marginBottom: 6 }}>CVV</label>
                  <input placeholder="•••" type="password" maxLength={4} style={{ width: "100%", padding: "13px 14px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", display: "block", marginBottom: 6 }}>Name on Card</label>
                <input placeholder="William Malloy" style={{ width: "100%", padding: "13px 14px", border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              </div>
            </div>

            {/* Trust signals */}
            <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 20 }}>
              {[["🔒","Secure & encrypted"],["↩️","Cancel anytime"],["📅","Billed day 31"]].map(([icon,label])=>(
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 18, marginBottom: 3 }}>{icon}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8", lineHeight: 1.3 }}>{label}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setStep(6)} style={btnPrimary}>
              Start My Free 30 Days →
            </button>
            <div style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", marginTop: 10 }}>
              First charge of ${"{"}selectedPlan?.price{"}"}/mo on day 31 · Auto-renews monthly · Cancel before then and pay nothing
            </div>
          </div>
        )}

        {/* STEP 6 — Launch */}
        {step === 6 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🚀</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 10 }}>You're live, {profile.name?.split(" ")[0] || "Captain"}!</h2>
            <p style={{ color: "#64748b", fontSize: 16, marginBottom: 44, maxWidth: 480, margin: "0 auto 44px" }}>Your HarborHunt broker profile is active. Share your unique link with clients and every inquiry comes straight to you.</p>

            {/* Referral Link */}
            <div style={{ background: "#0a1628", borderRadius: 16, padding: 28, marginBottom: 28, border: "1px solid rgba(14,165,233,0.25)", textAlign: "left" }}>
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "#475569", marginBottom: 10 }}>Your Unique Client Link</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "12px 16px", fontSize: 14, color: "#7dd3fc", fontFamily: "monospace", wordBreak: "break-all" }}>
                  harbourhunt.app/broker/{referralCode.toLowerCase()}
                </div>
                <button onClick={copyLink} style={{ padding: "12px 20px", background: copied ? "#10b981" : "#0ea5e9", border: "none", borderRadius: 9, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit", whiteSpace: "nowrap", transition: "background 0.2s" }}>
                  {copied ? "✓ Copied!" : "Copy Link"}
                </button>
              </div>
              <div style={{ fontSize: 12, color: "#475569" }}>When a client opens this link, the app is branded to you and all inquiries route directly to {profile.email || "your email"}.</div>
            </div>

            {/* Next steps */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 36, textAlign: "left" }}>
              {[["📲", "Share your link", "Text or email it to clients, add to your email signature or social bio"], ["📊", "Watch your dashboard", "Track client activity, saved boats, and lead requests in real time"], ["🔔", "Get notified instantly", "Receive SMS + email alerts the moment a client requests a showing"]].map(([icon, title, desc]) => (
                <div key={title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 18 }}>
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>

            <button style={{ ...btnPrimary, fontSize: 16, padding: "16px 40px" }}>Go to My Broker Dashboard →</button>
          </div>
        )}
      </div>
    </div>
  );
}

const btnPrimary = {
  flex: 1, padding: "14px 28px", background: "linear-gradient(135deg, #0ea5e9, #0369a1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em"
};
const btnSecondary = {
  padding: "14px 24px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, color: "#64748b", fontSize: 15, cursor: "pointer", fontFamily: "inherit"
};
const labelStyle = {
  fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", display: "block", marginBottom: 8
};
const inputStyle = {
  width: "100%", padding: "12px 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 9, color: "#1a1a2e", fontSize: 14, outline: "none", fontFamily: "inherit", marginBottom: 0
};
