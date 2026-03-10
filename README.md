# HarborHunt — Deployment Package 

## Deploy to Vercel (Free — 5 minutes)

### Option A: Drag & Drop (Easiest)
1. Go to https://vercel.com and create a free account
2. Click "Add New Project"
3. Drag this entire `harbourhunt` folder into the upload area
4. Click Deploy
5. Your live URL will be: `harbourhunt-xxxx.vercel.app`

### Option B: Via GitHub (Best for ongoing updates)
1. Create a free account at https://github.com
2. Create a new repository called `harbourhunt`
3. Upload all files in this folder
4. Go to https://vercel.com → Import Git Repository
5. Select your repo → Deploy
6. Every time you update files on GitHub, Vercel auto-redeploys

## Project Structure
```
harbourhunt/
├── public/
│   └── index.html          ← App shell
├── src/
│   ├── index.js            ← React entry point  
│   ├── App.jsx             ← Buyer mobile app (WilliamMalloyProfile)
│   ├── BrokerDashboard.jsx ← William's broker command center
│   └── BrokerOnboarding.jsx← Broker signup flow
├── package.json            ← Dependencies
├── vercel.json             ← Routing config
└── README.md               ← This file
```

## URLs after deployment
- **Buyer app** (share with clients): `your-url.vercel.app`
- **Broker dashboard**: `your-url.vercel.app/dashboard` ← coming soon
- **Onboarding**: `your-url.vercel.app/join` ← coming soon

## Custom Domain (Optional)
1. Buy `harbourhunt.com` at Namecheap (~$12/yr)
2. In Vercel → Settings → Domains → Add `harbourhunt.com`
3. Follow DNS instructions (10 min setup)
4. Done — live at harbourhunt.com
